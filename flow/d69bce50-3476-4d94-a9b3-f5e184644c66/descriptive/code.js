var StdRetry = 12;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

//var auto = 'a';
var flowname = 'Nucleus CI 522 - Epikrise';
var enhed = "OUH Øre-, Næse- og Hals Afsnit F2 ";
var hv = ["højre", "venstre", "bilateralt"];

if (auto === 'auto') {
  var d = AOd;
  var m = AOm;
  var y = AOy;
  var h = AOh;
  var i = AOi;
  
  if (AOProcedureCode1add2 === "TUL2") {
    var ear = hv[2]; 
  } else {
    if (AOProcedureCode1add1 === "TUL1"){
      var ear = hv[0];
    } else {
      var ear = hv[1]; 
    }
  }
  
} else {
  //** Flow called directly, not from Nucleau CI522 **//
  
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
    if (surgery.Ear !== hv[2]) {
      ear = ear + "sidig"; }
  } catch (e) {
    throw 1;
  }
}

/*** Detect clinician ***/
Flow.run('Check kliniker', {} ); 
/*var clinician = {name: "OUH Afd. F læge", title: "overlæge", username: "jw", initials: "JW"};*/

/*** Skabelon starter ***/

/*** Udarbejdet af ***/
var udarbejdetaf = clinician.name;
if (clinician.title !== "") {
  udarbejdetaf = udarbejdetaf +", "+clinician.title;
}

/*** Resumé af forløbet   ***/

//var resume = "Indlagt mhp. " + ear + " Cochlear Implant operation med Nucleus-elektrode.<newline>Udføres ukompliceret med pæne malinger peroperativt.<newline>Udskrives til agraffjernelse efter ca. 10-14 dage. Enten hos egen læge eller sygeplejerske i ambulatoriet, afd. F.<newline>Tilkobling af høreapparat efter 4-5 uger på Høreklinikken, OUH.<newline>Epikrisen skal sendes til Høreklinikken OUH, egen læge samt henvisende afdeling/læge.";

var resume = "Der anlægges " + ear + " cochlear implant med pæne NRT og impedans svar.<newline>Udskr. til agraffjernelse cirka 10-12 dage postoperativt hos e.l.<newline>Tilkobling af speech processor cirka 4-5 uger postoperativt hos høreklinikken, OUH.<newline>Epikrise sendes til høreklinikken på OUH, henvisende instans samt egen læge.";

//var resume = "Ukompliceret anlæggelse af NucleusCI 522-elektrode med pæne impedans- og NRT-målinger.<newline>Efter ca. 10-14 dage fjernelse af agraffer hos enten hos egen læge eller ved sygeplejerske i F-ambulatoriet.<newline>Om 4-5 uger tilkobling af høreapparat på Høreklinikken, OUH.";

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

/*** Diagnoser ***/
var Diagnose1 = "DH905";
var Diagnose1add1 = "N/A";
  
/*** Information til patienten ***/
var information = "N/A";


/*** Skabelon ends ****/
/*** Final settings ***/
  
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
                                                EULudarbejdetaf: udarbejdetaf, 
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

