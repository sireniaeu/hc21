// Disambiguer, hvis der er flere datoer i den rå højreklikskontekst:
function getUniqueDatesInInputs() {
  var fullContext = Inputs['[sirenia.eu]Manatee.In.OpenContextMenuInfo.Info'];
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

function setDateForField(field) {
  // Clear the field first by focusing and sending a backspace - this circumvents problems with validation errors while date is being typed
  field.focus();
  //Wait.forMilliseconds(50);
  field.inputNative('<backspace>');
  // Then set the new date
  field.inputNative(selectedDate);
}

var uniqueDates = getUniqueDatesInInputs();
var selectedDate = getSpecialDate(uniqueDates);

// 1: naviger til registreringsoversigt
Fields["Menu - Reg. oversigt"].click();

var fromField = Fields["Reg oversigt - Fra dato"];
var toField = Fields["Reg oversigt - Til dato"];

// 2: placer dato i fra- og til-felterne
Wait.forField(fromField, 5);
Wait.forMilliseconds(200); // Wait for the from field to be ready to receive focus
setDateForField(fromField);
setDateForField(toField);
Wait.forMilliseconds(200);

// 3: tryk på opdater
var updateButton = Fields["Reg oversigt - Opdater"];
updateButton.focus();
updateButton.click();
