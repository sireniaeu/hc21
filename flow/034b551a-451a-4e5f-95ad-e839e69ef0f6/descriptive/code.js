//*******************************************//
//*** Input of Standard OR procedure type ***//
//*******************************************//

var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var procedures = {
  "Diode laser                                         " : {flowname: "Diode laser"},
  "Eylea o. dx.                                        " : {flowname: "Eylea o.dx."},
  "Eylea o. sin.                                       " : {flowname: "Eylea o.sin."},
  "Femto-LASIK                                         " : {flowname: "Femto-LASIK"},
  "Katarakt - Standard                                 " : {flowname: "Katarakt - standard"},
  "Katarakt - Torisk                                   " : {flowname: "Katarakt - torisk"},
  "Lucentis o. dx.                                     " : {flowname: "Lucentis o.dx."},
  "Lucentis o. sin.                                    " : {flowname: "Lucentis o.sin."},
  "Oliefjernelse                                       " : {flowname: "Oliefjernelse"},
  "Ozurdex                                             " : {flowname: "Ozurdex"},
  "Ptose                                               " : {flowname: "Ptose"},
  "Skeleoperation - Esotropi                           " : {flowname: "Skele - eso"},
  "Skeleoperation - Exotropi                           " : {flowname: "Skele - exo"},
  "SMILE                                               " : {flowname: "SMILE"},
  "Suturfjernelse                                      " : {flowname: "Suturfjernelse"},
  "Vitrektomi - Epiretinal fibrose                     " : {flowname: "Epiretinal fibrose"},
  "Vitrektomi - Makulært hul                           " : {flowname: "Makulært hul"}
};

//*******************************************************************//
//*** Create menu for selection of specific Standard OR procedure ***//
//*******************************************************************//
try {  
  getInput();

//***********************************************//
//*** Call subflow for the specific procedure ***//
//***********************************************//
try {
  Flow.run(procedures[Standard.procedure].flowname, {});
     } catch (e) {
    Dialog.warn("Advarsel", "Det er ikke muligt at kalde flow.", { 'timeout': 5 });
  }

} catch (e) {
// *** Catch User cancel  ***/
  //Noop
  //Blame Canada
}

function getInput() {
    var w = true;
    while (w) {
        var Standard = Dialog.input("Region Syddanmark - OUH Øjenafdeling E", "Standard operationer", {
        buttons: [{ 'value': 'Cancel', 'isCancel': true }],
            'submitOnValidation': true,
            "procedure": {
            "type": "RADIO",
                "prompt": "Vælg operation",
                "selectBetween": Object.keys(procedures)
            }
        });
        w = false;
    }
}
