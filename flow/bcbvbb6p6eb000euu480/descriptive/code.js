//Ensure that the user is logged in
ensureLoggedIn();

//Ensure Patient Finder is open
ensurePatientFinderOpen();

//Lookup Patient
lookupPatient();

//Function
function ensureLoggedIn() {
  try {
    //Test if loginprompt is open
    Wait.forField(Fields["input_username"], 1);
    //We are at login prompt
    Dialog.info('Login', 'You need to be logged in. Log in and run again.', {
      'timeout': 10
    });
  } catch (e) {
    //No login prompt
    //Noop
  }
}

//Function
function ensurePatientFinderOpen() {
/*  try {
    //Test if PatientFinder is open
    Wait.forField(Fields["input_ssn_search"], 1);
    //Ensure focus
    Fields["btn_patientfinder_tab"].click();
  } catch (e) {*/
    Wait.forField(Fields["btn_pt_search"], 3);
    Fields["btn_pt_search"].click();
    //Test if PatientFinder is open
    Wait.forField(Fields["input_ssn_search"], 3);
 // }
}

//Function
function lookupPatient() {
  //Fields["input_ssn_search"].input("121212-1212");
  Fields["input_ssn_search"].input(Date.now());
  Fields["input_ssn_search"].inputNative(" ");
}
