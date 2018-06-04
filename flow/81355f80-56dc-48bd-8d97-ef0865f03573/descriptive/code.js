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

/*** Hent Excel ***/
var excel = Fs.ls("\\\\10.75.65.50\\TopconKR800s\\Manatee\\OUH\\E\\*.xlsx");
//var exceltrim = excel[1].match(/^.{41}(.{1,20})/);

//*******************************************************************//
//*** Create menu for selection of specific Standard OR procedure ***//
//*******************************************************************//
try {
var w = true;
  while (w) {
      var Standard = Dialog.input("Region Syddanmark - OUH Øjenafdeling E", "Standard operationer - Excel demo", 
                                  {buttons: [{ 'value': 'Cancel', 'isCancel': true }], 
                                   'submitOnValidation': true, 'maxDialogWidth': 625,
                                   "procedure": {"type": "RADIO", 
                                                 "prompt": "Vælg operation:", 
 //                                                "selectBetween": Object.keys(files)}
                                                 "selectBetween": excel}
                                  } );
    w = false; 
  }

//var table = Excel.load('\\\\10.75.65.50\\TopconKR800s\\Manatee\\OUH\\E\\Eyleaodx.xlsx', { table: { range: 'D1:D48', sheet: 'Sheet1', header: true } });
var table = Excel.load(Standard.procedure, { table: { range: 'D1:D48', sheet: 'Sheet1', header: true } });

/*** Skabelon starter ***/

/*** Udarbejdet af   ***/
if (table[0]['Valg/tekst'] !== "N/A")
{var udarbejdetaf = clinician.name+", "+clinician.title;}
else
{udarbejdetaf = "N/A";}

/*** Indikation   ***/
var indikation = table[1]['Valg/tekst'];

/*** Trin 1   ***/
var trin1 = table[2]['Valg/tekst'];
var trin1tekst = table[3]['Valg/tekst'];

/*** ASA   ***/
var asa = table[4]['Valg/tekst'];
var asatekst = table[5]['Valg/tekst'];
      
/*** Operatør ***/
if (table[6]['Valg/tekst'] !== "N/A")
{var operatoer = clinician.name+", "+clinician.title;}
else
{operatoer = "N/A";}

/*** Operatørassistent ***/
var operatoerassistent = table[7]['Valg/tekst'];

/*** Anaestesi ***/
var anaestesi = table[8]['Valg/tekst']; 

/*** Operationsstatus ***/
var operationsstatus = table[9]['Valg/tekst'];
var operationsstatustekst = table[10]['Valg/tekst'];

/*** Diagnoser ***/
var Diagnose1 = table[11]['Valg/tekst'];
var Diagnose1add1 = table[12]['Valg/tekst'];

/*** Procedurer ***/
var ProcedureCode1 = table[13]['Valg/tekst'];
var ProcedureCode1add1 = table[14]['Valg/tekst'];
var ProcedureCode1add2 = table[15]['Valg/tekst'];
var ProcedureCode1add3 = table[16]['Valg/tekst'];
var ProcedureCode2 = table[17]['Valg/tekst'];
var ProcedureCode2add1 = table[18]['Valg/tekst'];
var ProcedureCode3 = table[19]['Valg/tekst'];
var ProcedureCode4 = table[20]['Valg/tekst'];
var ProcedureCode5 = table[21]['Valg/tekst'];
var ProcedureCode6 = table[22]['Valg/tekst'];

/*** Procedurer - set Ressource ***/
var Ressource = table[23]['Valg/tekst']; 
  
/*** Peroperativ patologi ***/
var peroperativpatologi = table[24]['Valg/tekst'];

/*** Operationsbeskrivelse ***/
var operationsbeskrivelse = table[25]['Valg/tekst'];

/*** Operationsbeskrivelse fortsat ***/
var operationsbeskrivelsefortsat = table[26]['Valg/tekst'];

/*** Operationsbeskrivelse fortsat 2 ***/
var operationsbeskrivelsefortsat2 = table[27]['Valg/tekst'];

/*** Anvendte implantater / proteser ***/
var implantater = table[28]['Valg/tekst'];

/*** Præparater til undersøgelse ***/
var praeparater = table[29]['Valg/tekst'];

/*** Præparat vægt ***/
var praeparatvaegt = table[30]['Valg/tekst'];

/*** Blodtab ***/
var blodtab = table[31]['Valg/tekst'];

/*** Konklusion og plan ***/
var konklusionogplan = table[32]['Valg/tekst'];

/*** Postoperativ plan ***/
var postoperativplan = table[33]['Valg/tekst'];

/*** Ordination af medicin ***/
var ordinationafmedicin = table[34]['Valg/tekst'];

/*** Ordinationer, øvrige ***/
var ordinationer2 = table[35]['Valg/tekst'];

/*** Information/accept ***/
var information = table[36]['Valg/tekst'];

/*** Brevskabeloner ***/
// N/A

/*** Trin 2 ... ***/
var trin2 = table[37]['Valg/tekst'];
var trin2tekst = table[38]['Valg/tekst'];

/*** Kontaktperson(er) ***/
var kontaktperson = table[39]['Valg/tekst'];
var kontaktpersontekst = table[40]['Valg/tekst'];

/*** Trin 6 ... ***/
var trin6 = table[41]['Valg/tekst'];
var trin6tekst = table[42]['Valg/tekst'];

/*** Hændelser i FMK ***/
var fmk = table[43]['Valg/tekst'];

/*** Skal sendes ***/
if (table[44]['Valg/tekst'] === "Ja")
{var skalsendes = "Ja";}
else
{skalsendes = "N/A";}

/*** Skabelon ends ****/
/*** Final settings ***/
  
/*** Create entry on dictation list ***/
var dictate = "N/A";  
  
/*** End with setting focus at predefined field ***/
var lastfield = table[46]['Valg/tekst'];

/*** Run Flow motor ***/
 try {
    Flow.run('C Sub Amb Operationsnotat', {AOd: d, AOm: m, AOy: y, AOh: h, AOi: i, AOudarbejdetaf: udarbejdetaf, AOindikation: indikation, AOtrin1: trin1, AOtrin1tekst: trin1tekst, AOasa: asa, AOasatekst: asatekst, AOoperatoer: operatoer, AOoperatoerassistent: operatoerassistent, AOanaestesi: anaestesi, AOoperationsstatus: operationsstatus, AOoperationsstatustekst: operationsstatustekst, AODiagnose1: Diagnose1, AODiagnose1add1: Diagnose1add1, AOProcedureCode1: ProcedureCode1, AOProcedureCode1add1: ProcedureCode1add1, AOProcedureCode1add2: ProcedureCode1add2, AOProcedureCode1add3: ProcedureCode1add3, AOProcedureCode2: ProcedureCode2, AOProcedureCode2add1: ProcedureCode2add1, AOProcedureCode3: ProcedureCode3, AOProcedureCode4: ProcedureCode4, AOProcedureCode5: ProcedureCode5, AOProcedureCode6: ProcedureCode6, AORessource: Ressource, AOperoperativpatologi: peroperativpatologi, AOoperationsbeskrivelse: operationsbeskrivelse, AOoperationsbeskrivelsefortsat: operationsbeskrivelsefortsat, AOoperationsbeskrivelsefortsat2: operationsbeskrivelsefortsat2, AOimplantater: implantater, AOpraeparater: praeparater, AOpraeparatvaegt: praeparatvaegt, AOblodtab: blodtab, AOkonklusionogplan: konklusionogplan, AOpostoperativplan: postoperativplan, AOordinationafmedicin: ordinationafmedicin, AOordinationer2: ordinationer2, AOinformation: information, AOtrin2: trin2, AOtrin2tekst: trin2tekst, AOkontaktperson: kontaktperson, AOkontaktpersontekst: kontaktpersontekst, AOtrin6: trin6, AOtrin6tekst: trin6tekst, AOfmk: fmk, AOskalsendes: skalsendes, AOdictate: dictate, AOlastfield: lastfield} );
  } 
  catch (e) {
    Dialog.warn('Advarsel', 'Subflow kan ikke kaldes.', { 'timeout': 5 });
  }
    } 
  catch (e) {
// catch user cancel
  }