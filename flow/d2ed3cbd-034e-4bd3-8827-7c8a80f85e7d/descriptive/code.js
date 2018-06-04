//*****************************************//
//*** Input of types of standard visits ***//
//*****************************************//

var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var procedures = {
  "Fotoundersøgelse                                    " : {flowname: "Fotoundersøgelse"},
  "Katarakt kontrol 1.-3. dag.                         " : {flowname: "Katarakt kontrol"},
  "Kontrol efter SMILE el. LASIK                       " : {flowname: "SMILELasik kontrol"},
  "Visusmåling                                         " : {flowname: "Visusmåling"},
  "Screening for ROP                                   " : {flowname: "ROP-screening"}
};

//*************************************************************//
//*** Create menu for selection of specific standard visits ***//
//*************************************************************//
try {  
  var w = true;
  while (w) {
      var Standard = Dialog.input("Region Syddanmark - OUH Øjenafdeling E", "Standard notater", 
                                  {maxDialogWidth: 400, buttons: [{ 'value': 'Cancel', 'isCancel': true }], 
                                   'submitOnValidation': true,
                                   "procedure": {"type": "RADIO", 
                                                 "prompt": "Vælg notattype", 
                                                 "selectBetween": Object.keys(procedures)}
                                  } );
    w = false; 
  }

//***************************************************//
//*** Call subflow for the specific type of visit ***//
//***************************************************//
try {
  Flow.run(procedures[Standard.procedure].flowname, {});
     } catch (e) {
    Dialog.warn("Advarsel", "Det er ikke muligt at kalde flow.", { 'timeout': 5 });
  }

} catch (e) {
// *** Catch User cancel  ***/
}
