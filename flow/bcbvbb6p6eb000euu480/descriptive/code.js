//Ensure that the user is logged in
var isLoggedIn = isLoggedIn();

//If logged in
if (isLoggedIn) {
  //Ensure Patient Finder is open
  ensurePatientFinderOpen();

  //Lookup Patient
  lookupPatient();
}

// Flow END


//Function
function isLoggedIn() {
  try {
    //Test if loginprompt is open
    Wait.forField(Fields["input_username"], 1);
    //We are at login prompt
    Dialog.info('Login', 'You need to be logged in. Log in and run again.', {
      'timeout': 10
    });
    return false;
  } catch (e) {
    //No login prompt
    return true;
  }
  return true;
}

//Function
function ensurePatientFinderOpen() {
  Wait.forField(Fields["btn_pt_search"], 3);
  Fields["btn_pt_search"].click();
  //Test if PatientFinder is open
  Wait.forField(Fields["input_ssn_search"], 3);
  //List is slow, so wait before return
  Wait.forMilliseconds(2000);
}

//Function
function lookupPatient() {
  //Fields["input_ssn_search"].input(Inputs["myinput"];);
  //Fields["input_ssn_search"].input(Date.now());
  Fields["input_ssn_search"].inputNative(" ");
}
