var StdRetry = 15;
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

/*** Skabelon starter ***/

/*** Enhed ***/
var enhed = "N/A";

/*** Udarbejdet af ***/
var udarbejdetaf = "N/A";
//var udarbejdetaf = clinician.name+", "+clinician.title;

/*** Resumé af forløbet   ***/
var resume = "N/A";

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
var Diagnose1 = "N/A";
var Diagnose1add1 = "N/A";
  
/*** Information til patienten ***/
var information = "N/A";


/*** Skabelon ends ****/
/*** Final settings ***/
  
/*** Create entry on dictation list ***/
var dictate = "N/A";  
var message = "N/A";  
  
/*** End with setting focus at predefined field ***/
var lastfield = "N/A";

/*** Save draft ***/
var gemkladde = "N/A";

/*** Run Flow motor ***/
 try {
    Flow.run('C Sub Epikrise uden lægemidler', {EULd: d, EULm: m, EULy: y, EULh: h, EULi: i, EULenhed: enhed, EULudarbejdetaf: udarbejdetaf, EULresume: resume, EULikkeafslundersoeg: ikkeafslundersoeg, EULefterbehandlingsplan: efterbehandlingsplan, EULfmk: fmk, EULdosisdispensering: dosisdispensering, EULdosisdispenseringtekst: dosisdispenseringtekst, EULsygemelding: sygemelding, EULgenoptraeningsplan: genoptraeningsplan, EULblodtransfusion: blodtransfusion, EULblodtransfusiontekst: blodtransfusiontekst, EULDiagnose1: Diagnose1, EULDiagnose1add1: Diagnose1add1, EULinformation: information, EULdictate: dictate, EULmessage: message, EULlastfield: lastfield, EULgemkladde: gemkladde} );
  } 
  catch (e) {
    Dialog.warn('Advarsel', 'Subflow kan ikke kaldes.', { 'timeout': 5 });
  }
