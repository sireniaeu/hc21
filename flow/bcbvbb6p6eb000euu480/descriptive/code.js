// =================
// === Main flow ===
// =================

//Args
var user = "admin";
var pass = "pass";


//Bring to front
Window.maximize();
Window.focus();

//If logged in
if (ensureAutomaticLoggedIn()) {
  //Ensure Patient Finder is open
  ensurePatientFinderOpen();
  //Lookup Patient from querystring 
  lookupPatient(Inputs["SSNID"]);
}

//Done

// =================
// === Functions ===
// =================

//Function
function ensureAutomaticLoggedIn() {
  if (Fields["input_username"].exists()) {
    //We are at login prompt
    Fields["input_username"].input(user);
	Fields["input_password"].input(pass);
    Fields["btn_login"].click();
  }
  //We are not at login prompt
}

//Function
function isLoggedIn() {
  if (Fields["input_username"].exists()) {
    try {
      //We are at login prompt
      Dialog.info('Login', 'You need to be logged in. Log in and run again.', {
        'timeout': 10
      });
      return false;
    } catch (e) {
      //Timeout on dialog
      return false;
    }
  }
  //We are not at login prompt
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
function lookupPatient(arg) {
  //Fields["input_ssn_search"].input(Date.now());
  Fields["input_ssn_search"].inputNative(arg);
}
