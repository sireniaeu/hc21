var debug = {};
(function() {
  var menuField = Fields["Menu - Behandlingsoversigt"];
  var treeviewField = Fields['Behandlingsoversigt - Treeview'];
  var lprTableField = Fields['lprTable'];

  Settings.CommandRetries = 2; // Do this to reduce the wait when trying to expand nodes in the tree that aren't there (which should still be avoided)
  Settings.CommandRetryDelays = [100];

  var contextKey = '[sirenia.eu]Manatee.In.OpenContextMenuInfo.Info';
  var contextObj = JSON.parse(Inputs[contextKey]);
  if (contextObj.rowIndex !== null) {
    lprTableField.selectIndex(parseInt(contextObj.rowIndex, 10));
  }
  
  // Disambiguer, hvis der er flere datoer i den rå højreklikskontekst:
  function getUniqueDatesInInputs() {
    var fullContext = Inputs[contextKey];
    var dateRegex = /\d\d?-\d\d?-\d{4}/g;
    var matcher;
    var uniqueDates = [Inputs['date']];
    while ((matcher = dateRegex.exec(fullContext)) !== null)  {
      if (uniqueDates.indexOf(matcher[0]) === -1) {
        uniqueDates.push(matcher[0]);
      }
    }
    uniqueDates.sort();
    return uniqueDates;
  }

  function getSpecialDate(dates) {
    if (dates.length > 1) {
      var inputResult = Dialog.input('Vælg dato', 'Hvilken dato skal bruges i opslaget?', {
        submitOnValidation: true,
        selectedDate: {
          type: 'RADIO',	
          selectBetween: dates,
          focus: true,
          validation: {
            isRequired: true
          }
        }
      });
      return inputResult.selectedDate;
    } else {
      return dates[0];
    }
  }

  function parseDate(dateString) {
    var matches = dateString.match(/(\d\d?)[^\d](\d\d?)[^\d](\d{4})/);
    if (!matches) {
      throw "Failed to parse date: " + dateString;
    }
    return {
      day: matches[1],
      month: matches[2],
      year: matches[3]
    };
  }

  var uniqueDates = getUniqueDatesInInputs();
  var selectedDate = getSpecialDate(uniqueDates);
  var dateObj = parseDate(selectedDate);

  menuField.click();

  Wait.forField(treeviewField, 10);
  Wait.forSeconds(1);

  function inspectTree() {
    return treeviewField.inspect({ reflectionDepth: 3, includeChildren: true, useFieldCache: false }); // 'begin.date.day' is three levels deep
  }

  // Depth first recursion. Returns an array of nodes that match the given regexp
  function getAllNodesRec(node, regExp) {
    var nodeMatches = [].concat.apply([], node.children.map(function(child) {
      return getAllNodesRec(child, regExp);
    }));
    if (regExp.test(node.userobject)) {
      nodeMatches.push(node);
    }
    return nodeMatches;
  }

  function saveInspect(o) {
    Fs.write('C:\\Users\\ban9er\\Desktop\\lpr\\inspect.txt', JSON.stringify(o, null, 2));  
  }

  function trim0(s) {
    return s.replace(/^0+/g, '');
  }

  // Builds a RegExp that matches the format in the userobject serialization in the treeview nodes
  function getRegExpWithDate(day, month, year) {
    return new RegExp("begin\\.date\\.day="+trim0(day)+".*begin\\.date\\.month="+trim0(month)+".*begin\\.date\\.year="+trim0(year));
  }

  function selectTreeViewKeys(keys) {
    // Select the nodes in reverse order (ending at the top)
    for (var i = keys.length - 1; i >= 0; i--) {
      try { // If it isn't found then just proceed
        treeviewField.select(keys[i], { expand: true });
      } catch (e) {}
      Wait.forMilliseconds(10);
    }
  }

  function getDateFromMatch(dateMatch) {
    if (dateMatch) {
      if (dateMatch[3] === '0' && dateMatch[2] === '0' && dateMatch[1] === '0') {
        return null;
      }
      return new Date(dateMatch[3], dateMatch[2], dateMatch[1]); // Year - Month - Day
    }
    return null;
  }

  var encounterRegex = /.*CommitmentData.*/;

  function getEncountersContainingDate(lookupDate, inspectedTree) {
    var nodes = getAllNodesRec(inspectedTree, encounterRegex);
    var encounters = nodes.map(function(node) {
      var startRegex = /begin.date.day=([0-9]+),.*begin.date.month=([0-9]+),.*begin.date.year=([0-9]+),/;
      var startDate = getDateFromMatch(node.userobject.match(startRegex));
      var endRegex = /end.date.day=([0-9]+),.*end.date.month=([0-9]+),.*end.date.year=([0-9]+),/;
      var endDate = getDateFromMatch(node.userobject.match(endRegex));
      if (startDate) {
        if (endDate) {
          endDate.setDate(endDate.getDate() + 1); // Because we truncated the time of day of the end date - go to midnight the following day
        }
        return {
          begin: startDate,
          end: endDate,
          node: node
        };
      }
    });
    return encounters.filter(function(encounter) {
      // Accept ongoing encounters that start before the given date - or closed ones that contain it
      return encounter && encounter.begin.getTime() < lookupDate.getTime() && (!encounter.end || lookupDate.getTime() < encounter.end.getTime());
    });
  }

  function showNotification(msg) {
    Notification.show('treelookup', 'Beh. oversigt', msg, { timeout: 5 });
  }

  //
  // Get to work!
  //

  function expandActivityInTree() {
    selectTreeViewKeys(['**/Alle igang*', '**/Afsluttede*']); // First expand the toplevel nodes
    Wait.forMilliseconds(50);
    var lookupDate = new Date(dateObj.year, dateObj.month, dateObj.day);
    var inspectedTree = inspectTree();
    var keys = getEncountersContainingDate(lookupDate, inspectedTree).map(function(x) { return '**/*' + x.node.display + '*'; });
    if (keys.length == 0) {
      return showNotification('Fandt ingen forløb, der matcher ' + selectedDate);
    }
    selectTreeViewKeys(keys);
    Wait.forMilliseconds(50);
    inspectedTree = inspectTree(); // Find visible 'Henvisning' nodes
    // Expand all 'Henvisning' nodes
    var requestNodeKeys = getAllNodesRec(inspectedTree, /.*RequestData.*/).map(function(x) { return '**/*' + x.display + "*"; });
    selectTreeViewKeys(requestNodeKeys);

    // Expand lists of activities
    selectTreeViewKeys(requestNodeKeys.map(function(x) { return x + '/*Registrerede*'; }));
    selectTreeViewKeys(requestNodeKeys.map(function(x) { return x + '/*Bookede*'; }));
    Wait.forMilliseconds(50);
    var dateRegExp = getRegExpWithDate(dateObj.day, dateObj.month, dateObj.year);
    // Find and expand matching activity nodes
    inspectedTree = inspectTree();
    keys = getAllNodesRec(inspectedTree, dateRegExp).map(function(x) { return '**/*' + x.display + '*'; });
    if (keys.length == 0) {
      return showNotification('Fandt ingen aktiviteter, der starter ' + selectedDate);
    }
    selectTreeViewKeys(keys);
  }

  try {
    expandActivityInTree();
  } catch (e) {
    showNotification('Der gik noget galt ' + e);
  }
})();
