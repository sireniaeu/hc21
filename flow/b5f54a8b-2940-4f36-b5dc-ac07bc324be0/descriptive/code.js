// Transferred to RSYD server
(function() {
  var tableField = Fields['lprTable'];
  var resultPanelField = Fields["lprValidateResultPanel"];
  var validateButtonField = Fields['lprValidateButton'];
  var dialogOkButtonField = Fields['dialogOkButton'];
  
  var contextInfoString = Inputs['[sirenia.eu]Manatee.In.OpenContextMenuInfo.Info'];

  var contextInfo = JSON.parse(contextInfoString);
  var rowIndex = parseInt(contextInfo.rowIndex, 10);
  var rowCount = parseInt(contextInfo.rowCount, 10);

  var successRegex = /ingen fejl fundet/;

  for (var i = rowIndex; i < rowCount; i++) {
    // Select the row
    tableField.selectIndex(i);
    // Let cosmic settle after row selection
    Wait.forMilliseconds(400);
    // The result summary includes a timestamp with second precision, so it always changes even if the result remains unchanged
    var resultTextBefore = resultPanelField.read();
	// Start the validation
	validateButtonField.click();

    var newResultText = '';
	// Poll a couple of times per second for the result summary to change
    do {
      Wait.forMilliseconds(500);
      newResultText = resultPanelField.read();
    } while(newResultText == resultTextBefore);
    
    Wait.forField(dialogOkButtonField, 20);
    // Dismiss the dialog
	dialogOkButtonField.click();
    
    if (!successRegex.test(newResultText)) {
      Notification.show('warn', 'Valideringsfejl', 'Fandt ikke-validerende række!', { severity: 'WARN', timeout: 10 });
      break;
    }
    if (i === rowCount - 1) {
      Notification.show('info', 'Alt ok', 'Rækkerne validerede!', { severity: 'INFO', timeout: 5 });
    }
  }
})();
