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
var procedurename = "Diode laser";
var oculus = ["o.dx.","o.sin."];
var nj = ["Nej", "Ja"];
var lokalisation = ["primært øvre halvdel", "primært nedre halvdel", "hele cirkumferensen"];

try {
  
  var surgery = Dialog.input(
    procedurename, "Angiv valg",{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],'maxDialogWidth': 400,
      "Eye": { "type": "RADIO", "prompt": "Øje:", "selectBetween": oculus, 'validation': {'isRequired': true, 'message': "Vælg øje"}},
      "Tension": {"type": "MULTITEXT", "prompt": "Tension præoperativt:", "texts": [{"name": "tens", "suffix": 'mmHg', "validation": {"regex": '^(\\d{1,2})$'}}]}, 
      "Diodelaser": { 
          "type": "MULTITEXT",
          'prompt': 'Diodelaser:',
          'texts': [
            { 'name': 'effekter', 'suffix': 'effekter á', "validation": {"regex": '^(\\d{1,2})$'}},
            { 'name': 'styrke', 'suffix': 'mW'}]},
      "Cirkum": {"type": "MULTITEXT", "prompt": "Grader:", "texts": [{"name": "grader", "suffix": '°', "validation": {"regex": '^(\\d{1,3})$'}}]}, 
      "Where": { "type": "RADIO", "prompt": "Hvor:", "selectBetween": lokalisation, 'validation': {'isRequired': true, 'message': "Vælg hvor"}},
      "divider1": { 'type': 'DIVIDER'},
      "Proctid": { "type": "MULTITEXT", "prompt": "Proceduretidspunkt:", "texts": [{"name": "hour", "prefix": d+"/"+m+"-"+y+" kl. ", "value": h, "validation": {"regex": '^([012](\\d{1}))$'}},{"name": "minute", "prefix": ":", "value": i, "validation": {"regex": '^([0123456](\\d{1}))$'}}]},
      "Diktat": { "type": "RADIO", "prompt": "Tomt diktat:", "value": nj[1], "selectBetween": nj},
      "Besked": { "type": "TEXT", "prompt": "Evt. besked til sekretær:", "dependsOn": "Diktat=Ja"}                                                
    });
h = surgery.Proctid.hour;  
i = surgery.Proctid.minute;

/*** Skabelon starter ***/

/*** Udarbejdet af   ***/
var udarbejdetaf = "N/A";

/*** Indikation   ***/
var indikation = "Patienten møder mhp. transkleral diodelaser cyklofotokoagulation " + surgery.Eye + "<newline>Tension appl. " + surgery.Eye + ": " + surgery.Tension.tens + " mmHg.";

/*** Trin 1   ***/
var trin1 = "Udført";
var trin1tekst = "Informeres om, at behandlingen ikke har til formål at bedre synet, men derimod at sænke øjentrykket, da dette er så højt, at det ubehandlet kan føre til tiltagende skade på synsnerven eller på hornhinden samt smerter.<newline>Informeres om risici, herunder regnbuehindebetændelse, lavt øjentryk, phtisis bulbi ('skrumpeøje'), forværring af synsstyrken, subkonjunktival hæmoragi, konjunktival forbrænding og katarakt.<newline>Patienten samtykker på baggrund af den givne information.";

/*** ASA   ***/
var asa = "N/A";
var asatekst = "N/A";      
      
/*** Operatør ***/
var operatoer = clinician.name+", "+clinician.title;

/*** Operatørassistent ***/
var operatoerassistent = "N/A";

/*** Anaestesi ***/
var anaestesi = "Præoperativt dryppes med Oxybuprokain 0,4%, Tetracain 1% og Iopidine 1%.<newline>Herefter lægges peribulbær anæstesi.";

/*** Operationsstatus ***/
var operationsstatus = "N/A";
var operationsstatustekst = "N/A";

/*** Diagnoser ***/
var Diagnose1 = "N/A";
var Diagnose1add1 = "N/A";

/*** Procedurer ***/
var ProcedureCode1 = "KCHF05";
if (surgery.Eye === "o.dx."){var ProcedureCode1add1 = "TUL1";}
if (surgery.Eye === "o.sin."){var ProcedureCode1add1 = "TUL2";}
var ProcedureCode1add2 = "N/A";
var ProcedureCode1add3 = "N/A";
var ProcedureCode2 = "N/A";
var ProcedureCode2add1 = "N/A";
var ProcedureCode3 = "N/A";
var ProcedureCode4 = "N/A";
var ProcedureCode5 = "N/A";
var ProcedureCode6 = "N/A";

/*** Procedurer - set Ressource ***/
var Ressource = true;  
  
/*** Peroperativ patologi ***/
var peroperativpatologi = "N/A";

/*** Operationsbeskrivelse ***/
var operationsbeskrivelse = surgery.Diodelaser.effekter + " effekter á " + surgery.Diodelaser.styrke + " mW, 2000 ms givet i " + surgery. Where + ", ca. " + surgery.Cirkum.grader + "°, sådan at områderne omkring kl. 3 og 9 ikke er behandlet.<newline>Afslutningsvis gives som engangsdosis tbl. Pamol 1000 mg, tbl. Ibuprofen 400 mg samt tbl. Diamox 250 mg.<newline>Der appliceres endvidere Kloramfenikol og Ultracortenol øjensalve som engangsdosis, og der påsættes blinkhindrende øjenklap på det behandlede øje.";
  
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
var konklusionogplan = "Medgives tid til ambulant kontrol om ca. 1 uge.";

/*** Postoperativ plan ***/
var postoperativplan = "N/A";

/*** Ordination af medicin ***/
var ordinationafmedicin = "rp. øjendråbe Maxidex x 6 " + surgery.Eye + "<newline>rp. øjendråbe Skopolamin x 3 " + surgery.Eye + "<newline>rp. tablet Diamox 250 mg x 2 dagligt i 3 dage.<newline>rp. tablet Pamol 500 mg, 2 stk. p.n., max. x 4 dagligt<newline>rp. tablet Ibuprofen 400 mg, 1 stk. p.n., max. x 3 dagligt<newline>cont. vanlig tryksænkende øjenmedicin.";

/*** Ordinationer, øvrige ***/
var ordinationer2 = "N/A";

/*** Information/accept ***/
var information = "N/A";

/*** Brevskabeloner ***/
// N/A

/*** Trin 2 ... ***/
var trin2 = "N/A";
var trin2tekst = "N/A";
  
/*** Kontaktperson(er) ***/
var kontaktperson = "N/A";
var kontaktpersontekst = "N/A";

/*** Trin 6 ... ***/
var trin6 = "N/A";
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
var message = procedurename;
} else {
message = procedurename + " - " + surgery.Besked;
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