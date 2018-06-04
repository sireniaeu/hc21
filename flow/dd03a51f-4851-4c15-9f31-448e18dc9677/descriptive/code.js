//** EPIKRISE MedEI Flex28 **//

var StdRetry = 12;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];
  
/*** Get date and time ***/
var da = new Date();
var d = da.getDate();
if (d < 10) {d = ("0" + d);} else {d = d + "";}
var m = da.getMonth() + 1;
if (m < 10) {m = ("0" + m);} else {m = m + "";}
var y = da.getFullYear() + "";
var h = da.getHours();
if (h < 10) {h = ("0" + h);} else {h = h + "";}
var i = da.getMinutes();
if (i < 10) {i = ("0" + i);} else {i = i + "";}
  
/*** Detect clinician ***/
Flow.run('Detect clinician', {} );

/*** Inputs  ***/
var flowname = "Cochlear implant MedEI Flex 28";
var enhed = "OUH Øre-, Næse- og Hals Afsnit F2 ";
var hv = ["venstre","højre"];
  try {
    var surgery = Dialog.input(
      flowname, "Angiv valg",
      {buttons: [{ 'value': 'Ok' },
                 { 'value': 'Cancel', 
                  'isCancel': true }],
       "Ear": { "type": "RADIO", 
               "prompt": "Øre:", 
               "selectBetween": hv, 
               'validation': {'isRequired': true, 'message': "Vælg øre"}},
       "Proctid": { "type": "MULTITEXT", 
                   "prompt": "Tidspunkt:", 
                   "texts": [{"name": "hour", 
                              "prefix": d+"/"+m+"-"+y+" kl. ", 
                              "value": h, 
                              "validation": {"regex": '^([012](\\d{1}))$'}},
                             {"name": "minute", 
                              "prefix": ":", 
                              "value": i, 
                              "validation": {"regex": '^([0123456](\\d{1}))$'}}]} 
      });
    var ear = surgery.Ear;

  h = surgery.Proctid.hour;
  i = surgery.Proctid.minute;

  /************************/
  /*** Skabelon starter ***/
  /************************/
  
  
  /*** Resumé   ***/
  var resume = "Der anlægges " + ear + "sidig cochlear implant af typen Med-El med pæne NRT og impedans svar.<newline>Udskr. til agraffjernelse cirka 10-12 dage postoperativt hos e.l.<newline>Tilkobling af speech processor cirka 4-5 uger postoperativt hos høreklinikken, OUH.<newline>Epikrise sendes til høreklinikken på OUH, henvisende instans samt egen læge.";
  
  /*** Diagnoser ***/
  var Diagnose1 = "DH905";
  var Diagnose1add1 = "KDFE00";

  /*** Ikke afsluttede undersøgelser ***/
  var ikkeafslundersoeg = "N/A";
  
  /*** Efterbehandlingsplan   ***/
  var efterbehandlingsplan = "N/A";

  /*** Hændelser i FMK ***/
  var fmk = "N/A";

  /*** Dosisdispensering ***/
  var dosisdispensering = "N/A";
  var dosisdispenseringtekst = "N/A";
  
  /*** Sygemelding ***/
  var sygemelding = "N/A";

  /*** Genoptræningsplan ***/
  var genoptraeningsplan = "N/A";

  /*** Blodtransfusion givet ***/
  var blodtransfusion = "N/A";
  var blodtransfusiontekst = "N/A";
  
  /*** Information til patienten ***/
  var information = "N/A";
  
  /*** Create entry on dictation list ***/
  var dictate = "N/A";  
  var message = "N/A";  

  var gemkladde = "N/A";
  
  /*** End with setting focus at predefined field ***/
  var lastfield = "Resumé";
  
  /*** Run Flow motor ***/
 try {
   Flow.run('C Sub Epikrise uden lægemidler', {EULd: d, 
                                                EULm: m, 
                                                EULy: y, 
                                                EULh: h, 
                                                EULi: i, 
//                                                EULudarbejdetaf: udarbejdetaf, 
                                                EULresume: resume, 
                                                EULikkeafslundersoeg: ikkeafslundersoeg, 
                                                EULefterbehandlingsplan: efterbehandlingsplan, 
                                                EULfmk: fmk, 
                                                EULdosisdispensering: dosisdispensering, 
                                                EULdosisdispenseringtekst: dosisdispenseringtekst, 
                                                EULsygemelding: sygemelding, 
                                                EULgenoptraeningsplan: genoptraeningsplan, 
                                                EULblodtransfusion: blodtransfusion, 
                                                EULblodtransfusiontekst: blodtransfusiontekst, 
                                                EULDiagnose1: Diagnose1, 
                                                EULDiagnose1add1: Diagnose1add1, 
                                                EULinformation: information, 
                                                EULdictate: dictate, 
                                                EULmessage: message, 
                                                EULlastfield: lastfield, 
                                                EULenhed: enhed, 
                                                EULgemkladde: gemkladde} );
  } catch (e) {
    Dialog.warn('Advarsel', 'C Sub Epikrise uden lægemidler kan ikke kaldes.', { });
  }
} catch (e) {
  // *** Catch User cancel  
}
