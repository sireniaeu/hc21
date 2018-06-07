//Ensure that the user is logged in


//Ensure Patient Finder is open
ensurePatientFinderOpen();



function ensurePatientFinderOpen(){

try{
  //Test if PatientFinder is open
  Wait.forField(Fields["input_ssn_search"], 1);
} catch (e)
  {
    //Wait.forField(Fields["btn_pt_search"], 20);
//Fields["btn_pt_search"].click();
    
  }
}
//Wait.forMilliseconds(3000);
Fields["input_ssn_search"].input("121212-1212");
Fields["input_ssn_search"].inputNative(" ");