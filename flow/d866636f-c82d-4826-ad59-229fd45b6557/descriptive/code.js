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
// ||text:**/Yderligere procedureoplysninger/CambioDateTimeComponent/CambioTimeChooser/TimeFormattedSpinner/ITime;0800;sendkeys

/*** Detect clinician ***/
Flow.run('Detect clinician', {} );
// Debug.showDialog("Personnel details; name = "+clinician.name+", title = "+clinician.title+", username = "+clinician.username+", initials = "+clinician.initials);

/*** Skabelon starter ***/

/*** Udarbejdet af   ***/
var udarbejdetaf = "N/A";

/*** Indikation   ***/
var indikation = "N/A";

/*** Trin 1   ***/
var trin1 = "Udført";
var trin1tekst = "N/A";

/*** ASA   ***/
var asa = "N/A";
var asatekst = "N/A";      
      
/*** Operatør ***/
var operatoer = clinician.name+", "+clinician.title;

/*** Operatørassistent ***/
var operatoerassistent = "N/A";

/*** Anaestesi ***/
var anaestesi = "Dråbeanæstesi"; 

/*** Operationsstatus ***/
var operationsstatus = "N/A";
var operationsstatustekst = "N/A";

/*** Diagnoser ***/
var Diagnose1 = "N/A";
var Diagnose1add1 = "N/A";

/*** Procedurer ***/
var ProcedureCode1 = "KCKD05B";
var ProcedureCode1add1 ="TUL1";
var ProcedureCode1add2 ="MS01LA04";
var ProcedureCode1add3 ="N/A";
var ProcedureCode2 = "N/A";
var ProcedureCode2add1 = "N/A";
var ProcedureCode3 = "N/A";
var ProcedureCode4 = "N/A";
var ProcedureCode5 = "N/A";
var ProcedureCode6 = "N/A";

/*** Procedurer - set Ressource ***/
var Ressource = "N/A";  
  
/*** Peroperativ patologi ***/
var peroperativpatologi = "N/A";

/*** Operationsbeskrivelse ***/
var operationsbeskrivelse = "Anti-VEGF-injektion med Lucentis o.dx.<newline>Der injiceres 0,05 ml Lucentis 10 mg/ml, 3,5 mm bag limbus, ukompliceret.";

/*** Operationsbeskrivelse fortsat ***/
var operationsbeskrivelsefortsat = "N/A";

/*** Operationsbeskrivelse fortsat 2 ***/
var operationsbeskrivelsefortsat2 = "N/A";

/*** Anvendte implantater / proteser ***/
var implantater = "N/A";

/*** Præparater til undersøgelse ***/
var praeparater = "N/A";

/*** Præparat vægt ***/
var praeparatvaegt = "N/A";

/*** Blodtab ***/
var blodtab = "N/A";

/*** Konklusion og plan ***/
var konklusionogplan = "N/A";

/*** Postoperativ plan ***/
var postoperativplan = "N/A";

/*** Ordination af medicin ***/
var ordinationafmedicin = "N/A";

/*** Ordinationer, øvrige ***/
var ordinationer2 = "N/A";

/*** Information/accept ***/
var information = "N/A";

/*** Brevskabeloner ***/
// N/A

/*** Trin 2 ... ***/
var trin2 = "Udført";
var trin2tekst = "N/A";
  
/*** Kontaktperson(er) ***/
var kontaktperson = "N/A";
var kontaktpersontekst = "N/A";

/*** Trin 6 ... ***/
var trin6 = "Udført";
var trin6tekst = "N/A";

/*** Hændelser i FMK ***/
var fmk = "N/A";

/*** Skal sendes ***/
var skalsendes = true;

/*** Skabelon ends ****/
/*** Final settings ***/
  
/*** Create entry on dictation list ***/
var dictate = "N/A";  
var message = "N/A";  
  
/*** End with setting focus at predefined field ***/
var lastfield = "Operationsbeskrivelse";

/*** Preview ***/
var preview = "N/A";

/*** Save draft ***/
var gemkladde = "N/A";

/*** Run Flow motor ***/
 try {
    Flow.run('C Sub Amb Operationsnotat', {AOd: d, AOm: m, AOy: y, AOh: h, AOi: i, AOudarbejdetaf: udarbejdetaf, AOindikation: indikation, AOtrin1: trin1, AOtrin1tekst: trin1tekst, AOasa: asa, AOasatekst: asatekst, AOoperatoer: operatoer, AOoperatoerassistent: operatoerassistent, AOanaestesi: anaestesi, AOoperationsstatus: operationsstatus, AOoperationsstatustekst: operationsstatustekst, AODiagnose1: Diagnose1, AODiagnose1add1: Diagnose1add1, AOProcedureCode1: ProcedureCode1, AOProcedureCode1add1: ProcedureCode1add1, AOProcedureCode1add2: ProcedureCode1add2, AOProcedureCode1add3: ProcedureCode1add3, AOProcedureCode2: ProcedureCode2, AOProcedureCode2add1: ProcedureCode2add1, AOProcedureCode3: ProcedureCode3, AOProcedureCode4: ProcedureCode4, AOProcedureCode5: ProcedureCode5, AOProcedureCode6: ProcedureCode6, AORessource: Ressource, AOperoperativpatologi: peroperativpatologi, AOoperationsbeskrivelse: operationsbeskrivelse, AOoperationsbeskrivelsefortsat: operationsbeskrivelsefortsat, AOoperationsbeskrivelsefortsat2: operationsbeskrivelsefortsat2, AOimplantater: implantater, AOpraeparater: praeparater, AOpraeparatvaegt: praeparatvaegt, AOblodtab: blodtab, AOkonklusionogplan: konklusionogplan, AOpostoperativplan: postoperativplan, AOordinationafmedicin: ordinationafmedicin, AOordinationer2: ordinationer2, AOinformation: information, AOtrin2: trin2, AOtrin2tekst: trin2tekst, AOkontaktperson: kontaktperson, AOkontaktpersontekst: kontaktpersontekst, AOtrin6: trin6, AOtrin6tekst: trin6tekst, AOfmk: fmk, AOskalsendes: skalsendes, AOdictate: dictate, AOmessage: message, AOlastfield: lastfield, AOpreview: preview, AOgemkladde: gemkladde} );
  } 
  catch (e) {
    Dialog.warn('Advarsel', 'Subflow kan ikke kaldes.', { 'timeout': 5 });
  }