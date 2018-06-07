//Ensure that the user is logged in
ensureLoggedIn();

//Ensure Patient Finder is open
ensurePatientFinderOpen();

//Lookup Patient
lookupPatient();

//Function
function ensureLoggedIn() {
    try {
    //Test if login
    Wait.forField(Fields["input_ssn_search"], 1);
  } catch (e) {
    Wait.forField(Fields["btn_pt_search"], 20);
    Fields["btn_pt_search"].click();
    //Test if PatientFinder is open
    Wait.forField(Fields["input_ssn_search"], 3);
  }
}

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

//Function
function lookupPatient() {
  Fields["input_ssn_search"].input("121212-1212");
  Fields["input_ssn_search"].inputNative(" ");
}
