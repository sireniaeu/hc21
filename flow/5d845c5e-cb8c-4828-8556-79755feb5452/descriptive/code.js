// This flow supports selecting a patient in cosmic from anywhere you might find a CPR number (could be a spread sheet)
(function() {
  var cprField = Fields['Patientlinje - CPR']; 
  var clearCprField = Fields['Ryd CPR']; 
  var searchButtonField = Fields["PatientSøg"];
  
  var cpr = Inputs['cpr'];

  Wait.forField(cprField, 60);
  clearCprField.click();
  if (cpr !== "-") {
    cprField.input(cpr);
    searchButtonField.click();
  }
})();
