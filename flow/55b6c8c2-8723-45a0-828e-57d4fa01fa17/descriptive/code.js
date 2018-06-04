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
var procedurename = "Cochlear implant MedEI Flex 28";
var hv = ["venstre","højre"];
try {
  var surgery = Dialog.input(
    procedurename, "Angiv valg",{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
      "Ear": { "type": "RADIO", "prompt": "Øre:", "selectBetween": hv, 'validation': {'isRequired': true, 'message': "Vælg øre"}},
      "Proctid": { "type": "MULTITEXT", "prompt": "Tidspunkt:", "texts": [{"name": "hour", "prefix": d+"/"+m+"-"+y+" kl. ", "value": h, "validation": {"regex": '^([012](\\d{1}))$'}},{"name": "minute", "prefix": ":", "value": i, "validation": {"regex": '^([0123456](\\d{1}))$'}}]}                                   
    });
  h = surgery.Proctid.hour;
  i = surgery.Proctid.minute;

  /************************/
  /*** Skabelon starter ***/
  /************************/
  
  /*** Kontaktårsag   ***/
  var kontaktaarsag = "N/A";
  
  /*** Resumé   ***/
  var resume = "N/A";

  /*** Konklusion og plan ***/
  var konklusionogplan = "Skal målt NRT og impedans i morgen på høreklinikken inden pt. går helt hjem. Kan formentlig udskrives i morgen tidlig efter dette. Skal have fjernet agraffer om 10-14 dage hos egen læge eller hos sygeplejerske i F-amb. Tilkobling af høreapparat om 4-5 uger på Høreklinikken, OUH.";
  
  /*** Udarbejdet af   ***/
  var udarbejdetaf = clinician.name+", "+clinician.title;

  /*** Socialmedicin   ***/
  var socialmedicin = "N/A";
  
  /*** Information til patienten ***/
  var infopatient = "N/A";
  
  /*** Hændelser i FMK ***/
  var fmk = "N/A";
  
  /*** Medicinstatus ***/
  var medicinstatus = "N/A";
  
  /*** Ikke afsluttede undersøgelser ***/
  var ikkeunders = "N/A";
  
  /*** Diagnoser ***/
  var Diagnose1 = "DH905";
  var Diagnose1add1 = "KDFE00";
  
  /*** Allergi/intolerance ***/
  var allergi = "N/A";

  
  /*** End with setting focus at predefined field ***/
  var lastfield = "Resumé af forløbet";
  
  /*** Run Flow motor ***/
  try {
    Flow.run('C Sub Amb - Test', {AOd: d, AOm: m, AOy: y, AOh: h, AOi: i, AOudarbejdetaf: udarbejdetaf, AOindikation: indikation, AOtrin1: trin1, AOtrin1tekst: trin1tekst, AOasa: asa, AOasatekst: asatekst, AOoperatoer: operatoer, AOoperatoerassistent: operatoerassistent, AOanaestesi: anaestesi, AOoperationsstatus: operationsstatus, AOoperationsstatustekst: operationsstatustekst, AODiagnose1: Diagnose1, AODiagnose1add1: Diagnose1add1, AOProcedureCode1: ProcedureCode1, AOProcedureCode1add1: ProcedureCode1add1, AOProcedureCode1add2: ProcedureCode1add2, AOProcedureCode1add3: ProcedureCode1add3, AOProcedureCode2: ProcedureCode2, AOProcedureCode2add1: ProcedureCode2add1, AOProcedureCode3: ProcedureCode3, AOProcedureCode4: ProcedureCode4, AOProcedureCode5: ProcedureCode5, AOProcedureCode6: ProcedureCode6, AORessource: Ressource, AOperoperativpatologi: peroperativpatologi, AOoperationsbeskrivelse: operationsbeskrivelse, AOoperationsbeskrivelsefortsat: operationsbeskrivelsefortsat, AOoperationsbeskrivelsefortsat2: operationsbeskrivelsefortsat2, AOimplantater: implantater, AOpraeparater: praeparater, AOpraeparatvaegt: praeparatvaegt, AOblodtab: blodtab, AOkonklusionogplan: konklusionogplan, AOpostoperativplan: postoperativplan, AOordinationafmedicin: ordinationafmedicin, AOordinationer2: ordinationer2, AOinformation: information, AOtrin2: trin2, AOtrin2tekst: trin2tekst, AOkontaktperson: kontaktperson, AOkontaktpersontekst: kontaktpersontekst, AOtrin6: trin6, AOtrin6tekst: trin6tekst, AOfmk: fmk, AOskalsendes: skalsendes, AOdictate: dictate, AOmessage: message, AOlastfield: lastfield} );
  }
  catch (e) {
    Dialog.warn('Advarsel', 'Subflow kan ikke kaldes.', { 'timeout': 5 });
  }
} catch (e) {
  // *** Catch User cancel  
}
