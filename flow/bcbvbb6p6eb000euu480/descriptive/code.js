//Ensure that the user is logged in


//Ensure Patient Finder is open
ensurePatientFinderOpen();

//Lookup Patient
lookupPatient();


//Function
function ensurePatientFinderOpen() {
  try {

    //Test if PatientFinder is open
    Wait.forField(Fields["input_ssn_search"], 1);
  } catch (e) {
    Wait.forField(Fields["btn_pt_search"], 20);
    Fields["btn_pt_search"].click();
    //Test if PatientFinder is open
    Wait.forField(Fields["input_ssn_search"], 3);
  }
}
