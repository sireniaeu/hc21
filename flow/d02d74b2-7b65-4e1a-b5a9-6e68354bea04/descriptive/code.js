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

/*** Inputs  ***/
var procedurename = "Femto-LASIK";
var nj = ["Nej", "Ja"];

try {
  var surgery = Dialog.input(
    procedurename, "Angiv valg",{maxDialogHeight: 600, buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
       "dFlapdiameter": {
         "type": "MULTITEXT", 
         "prompt": "Flapdiameter o.dx:",
         'texts': [
         {'name': 'dfd', 'suffix': "mm", 'value': "8,0", 'validation': {'isRequired': true, 'message': "Flapdiameter skal angives"} }]},
      
        "dFlaptykkelse": {
         "type": "MULTITEXT", 
         "prompt": "Flaptykkelse o.dx:",
         'texts': [
         {'name': 'dft', 'suffix': "my", 'value': "120", 'validation': {'isRequired': true, 'message': "Flaptykkelse skal angives"} }]},
        
         "dKorrektion": {
         "type": "MULTITEXT", 
         "prompt": "Korrektion o.dx:",
         'texts': [
           {'name': 'dk0', 'suffix': "sf."},
           {'name': 'dk1', 'suffix': "x"},
           {'name': 'dk2', 'suffix': "°"}
         ]},
        
        "dOptisk": {
         "type": "MULTITEXT", 
         "prompt": "Optisk zone o.dx:",
         'texts': [
         {'name': 'doz', 'suffix': "mm", 'value': "6,25", 'validation': {'isRequired': true, 'message': "Optisk zone skal angives"} }]}, 
 
        "dAblation": {
         "type": "MULTITEXT", 
         "prompt": "Ablationsdybde o.dx:",
          'texts': [
         {'name': 'dab', 'suffix': "my"}]}, 
      
      'divider1': { 'type': 'DIVIDER'},
      
       "sFlapdiameter": {
         "type": "MULTITEXT", 
         "prompt": "Flapdiameter o.sin:",
         'texts': [
         {'name': 'sfd', 'suffix': "mm", 'value': "8,0", 'validation': {'isRequired': true, 'message': "Flapdiameter skal angives"} }]},
       
        "sFlaptykkelse": {
         "type": "MULTITEXT", 
         "prompt": "Flaptykkelse o.sin:",
         'texts': [
         {'name': 'sft', 'suffix': "my", 'value': "120", 'validation': {'isRequired': true, 'message': "Flaptykkelse skal angives"} }]},
        
         "sKorrektion": {
         "type": "MULTITEXT", 
         "prompt": "Korrektion o.sin:",
         'texts': [
           {'name': 'sk0', 'suffix': "sf."},
           {'name': 'sk1', 'suffix': 'x'},
           {'name': 'sk2', 'suffix': "°"}
         ]},
        
        "sOptisk": {
         "type": "MULTITEXT", 
         "prompt": "Optisk zone o.sin:",
         'texts': [
         {'name': 'soz', 'suffix': "mm", 'value': "6,25", 'validation': {'isRequired': true, 'message': "Optisk zone skal angives"} }]}, 
 
        "sAblation": {
         "type": "MULTITEXT", 
         "prompt": "Ablationsdybde o.sin:",
         'texts': [
         {'name': 'sab', 'suffix': "my"}]},
                                 
     'divider2': { 'type': 'DIVIDER'},                               
      "Proctid": { "type": "MULTITEXT", "prompt": "Proceduretidspunkt:", "texts": [{"name": "hour", "prefix": d+"/"+m+"-"+y+" kl. ", "value": h, "validation": {"regex": '^([012](\\d{1}))$'}},{"name": "minute", "prefix": ":", "value": i, "validation": {"regex": '^([0123456](\\d{1}))$'}}]},
      "Diktat": { "type": "RADIO", "prompt": "Tomt diktat:", "value": nj[1], "selectBetween": nj},
      "Besked": { "type": "TEXT", "prompt": "Evt. besked til sekretær:", "dependsOn": "Diktat=Ja"}                                                
    });
h = surgery.Proctid.hour;  
i = surgery.Proctid.minute;
if (surgery.dKorrektion.dk1 === "" || surgery.dKorrektion.dk1 === undefined){surgery.dKorrektion.dk1 = "0";}
if (surgery.dKorrektion.dk2 === "" || surgery.dKorrektion.dk2 === undefined){surgery.dKorrektion.dk2 = "0";}
if (surgery.sKorrektion.sk1 === "" || surgery.sKorrektion.sk1 === undefined){surgery.sKorrektion.sk1 = "0";}
if (surgery.sKorrektion.sk2 === "" || surgery.sKorrektion.sk2 === undefined){surgery.sKorrektion.sk2 = "0";}

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
var ProcedureCode1 = "KCGD20B";
if (surgery.dKorrektion.dk0 !== undefined){var ProcedureCode1add1 = "TUL1";}
else {ProcedureCode1add1 = "TUL2";}
var ProcedureCode1add2 = "N/A";
var ProcedureCode1add3 ="N/A";
if (surgery.dKorrektion.dk0 !== undefined && surgery.sKorrektion.sk0 !== undefined){var ProcedureCode2 = "KCGD20B";}
else {ProcedureCode2 = "N/A";}
if (surgery.dKorrektion.dk0 !== undefined && surgery.sKorrektion.sk0 !== undefined){var ProcedureCode2add1 = "TUL2";}
else {ProcedureCode2add1 = "N/A";}
var ProcedureCode3 = "N/A";
var ProcedureCode4 = "N/A";
var ProcedureCode5 = "N/A";
var ProcedureCode6 = "N/A";

/*** Procedurer - set Ressource ***/
var Ressource = true;  
  
/*** Peroperativ patologi ***/
var peroperativpatologi = "N/A";

/*** Operationsbeskrivelse ***/
  var t1 = "<newline><newline>Patienten fikserer på fiksationslyset under Visumax og vakuum etableres.<newline>Laseren aktiveres i Flapmodus.<newline>";
  var t2 = "Under MEL-80 excimerlaseren løftes flappen med flapløfter.<newline>Patienten fikserer på fiksationslyset og laseren aktiveres.<newline>";
  var t3 = "Flappen lægges tilbage og der skylles under flappen med isoton saltvand. Flappen udglattes med spyd og observeres under laserspaltelampen efter 3 minutter.<newline>Øjet dryppes med ocgt. Oftaquix x 1 og ocgt. Voltaren x 1.<newline><newline><newline>";
  
  var opbesk = "";
  if (surgery.dKorrektion.dk0 !== undefined) {
    opbesk = 
      "Femto-LASIK o.dx." + 
      t1 + 
      "Flapdiameter: " + surgery.dFlapdiameter.dfd + " mm" +
      "<newline>Flaptykkelse: " + surgery.dFlaptykkelse.dft + " μm" + 
      "<newline>Flaphængsel: Kl. 12<newline><newline>" + 
      t2 + 
      "<newline>Korrektion: " + surgery.dKorrektion.dk0 + " sf. " + surgery.dKorrektion.dk1 + " x " + surgery.dKorrektion.dk2 + "°" +
      "<newline>Optisk zone: " + surgery.dOptisk.doz + " mm" +
      "<newline>Ablationsdybde: " + surgery.dAblation.dab + " μm" +
      "<newline>Algoritme: Smart<newline><newline>" +
      t3;
  }
  if (surgery.sKorrektion.sk0 !== undefined) {
    opbesk = opbesk +
      "Femto-LASIK o.sin." + 
      t1 + 
      "Flapdiameter: " + surgery.sFlapdiameter.sfd + " mm" +
      "<newline>Flaptykkelse: " + surgery.sFlaptykkelse.sft + " μm" + 
      "<newline>Flaphængsel: Kl. 12<newline><newline>" + 
      t2 + 
      "<newline>Korrektion: " + surgery.sKorrektion.sk0 + " sf. " + surgery.sKorrektion.sk1 + " x " + surgery.sKorrektion.sk2 + "°" +
      "<newline>Optisk zone: " + surgery.sOptisk.soz + " mm" +
      "<newline>Ablationsdybde: " + surgery.sAblation.sab + " μm" +
      "<newline>Algoritme: Smart<newline><newline>" +
      t3;
  }
if (surgery.dKorrektion.dk0 !== undefined && surgery.sKorrektion.sk0 !== undefined){
  opbesk = opbesk + "Flapperne observeres igen efter 30 min. i spaltelampen.<newline>Flapperne er på plads uden folder eller signifikant debris.";
}
else {
  opbesk = opbesk + "Flappen observeres igen efter 30 min. i spaltelampen.<newline>Flappen er på plads uden folder eller signifikant debris.";
}
var operationsbeskrivelse = opbesk;
  
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
var konklusionogplan = "Kontrol i øjenambulatoriet i morgen.<newline><newline>Plan for 1.dags kontrollen:<newline><newline>Visusbestemmelse og inspektion i spaltelampen.<newline><newline>Fortsætter øjendråber efter skema.<newline>Kontrol i øjenambulatoriet 1 uge postoperativt<newline>Kontrol hos egen læge 6 uger postoperativt.<newline>Kontrol i øjenambulatoriet 12 uger postoperativt.<newline><newline>Kopi af notat til egen øjenlæge.";

/*** Postoperativ plan ***/
var postoperativplan = "N/A";

/*** Ordination af medicin ***/
var ordinationafmedicin = "Påbegynder øjendråber efter skema.";

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
if (surgery.Diktat === "Ja")
{
var dictate = true;
} else {
dictate = "N/A";
}
if (surgery.Besked === undefined || surgery.Besked === "")
{
var message = "Manatee - " + procedurename;
} else {
message = "Manatee - " + procedurename + " - " + surgery.Besked;
}
  
/*** End with setting focus at predefined field ***/
var lastfield = "Operationsbeskrivelse";

/*** Preview ***/
var preview = "Ja";

/*** Save draft ***/
var gemkladde = "N/A";

/*** Run Flow motor ***/
 try {
    Flow.run('C Sub Amb Operationsnotat', {AOd: d, AOm: m, AOy: y, AOh: h, AOi: i, AOudarbejdetaf: udarbejdetaf, AOindikation: indikation, AOtrin1: trin1, AOtrin1tekst: trin1tekst, AOasa: asa, AOasatekst: asatekst, AOoperatoer: operatoer, AOoperatoerassistent: operatoerassistent, AOanaestesi: anaestesi, AOoperationsstatus: operationsstatus, AOoperationsstatustekst: operationsstatustekst, AODiagnose1: Diagnose1, AODiagnose1add1: Diagnose1add1, AOProcedureCode1: ProcedureCode1, AOProcedureCode1add1: ProcedureCode1add1, AOProcedureCode1add2: ProcedureCode1add2, AOProcedureCode1add3: ProcedureCode1add3, AOProcedureCode2: ProcedureCode2, AOProcedureCode2add1: ProcedureCode2add1, AOProcedureCode3: ProcedureCode3, AOProcedureCode4: ProcedureCode4, AOProcedureCode5: ProcedureCode5, AOProcedureCode6: ProcedureCode6, AORessource: Ressource, AOperoperativpatologi: peroperativpatologi, AOoperationsbeskrivelse: operationsbeskrivelse, AOoperationsbeskrivelsefortsat: operationsbeskrivelsefortsat, AOoperationsbeskrivelsefortsat2: operationsbeskrivelsefortsat2, AOimplantater: implantater, AOpraeparater: praeparater, AOpraeparatvaegt: praeparatvaegt, AOblodtab: blodtab, AOkonklusionogplan: konklusionogplan, AOpostoperativplan: postoperativplan, AOordinationafmedicin: ordinationafmedicin, AOordinationer2: ordinationer2, AOinformation: information, AOtrin2: trin2, AOtrin2tekst: trin2tekst, AOkontaktperson: kontaktperson, AOkontaktpersontekst: kontaktpersontekst, AOtrin6: trin6, AOtrin6tekst: trin6tekst, AOfmk: fmk, AOskalsendes: skalsendes, AOdictate: dictate, AOmessage: message, AOlastfield: lastfield, AOpreview: preview, AOgemkladde: gemkladde} );
  } 
  catch (e) {
    Dialog.warn('Advarsel', 'Subflow kan ikke kaldes.', { 'timeout': 5 });
  }
} catch (e) {
// *** Catch User cancel  
}