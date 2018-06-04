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
var procedurename = "Skeleoperation - exotropi";
var oculus = ["o.dx.","o.sin."];
var anaest = ["Peribulbær anæstesi", 
              "Retrobulbær anæstesi", 
              "Generel anæstesi"];
var indik = ["eksotropi","dekompenserende eksofori"];
var nj = ["Nej", "Ja"];

try {
  var surgery = Dialog.input(
    procedurename, "Angiv valg",{maxDialogWidth: 400, buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
      "Eye": { "type": "RADIO", "prompt": "Øje:", "selectBetween": oculus, 'validation': {'isRequired': true, 'message': "Vælg øje"}},
      "Indikation": { "type": "RADIO", "prompt": "Indikation:", "selectBetween": indik, 'validation': {'isRequired': true, 'message': "Vælg indikation"}},
      "Anaestesi": { "type": "RADIO", "prompt": "Anæstesi:", "value": anaest[0], "selectBetween": anaest, "orientation": "vertical"},
      "Epikrise": { "type": "RADIO", "prompt": "Standard epikrise:", "value": nj[1], "selectBetween": nj, "dependsOn": "Anaestesi=Generel anæstesi"},                           "lateralis": {"type": "MULTITEXT", "prompt": "Operation:", 'texts': [
        {'name': 'tilbage',"prefix": "Rectus lateralis lægges", "suffix": "mm tilbage.", 'validation': {'isRequired': true, 'message': "Længde skal angives"}}]},
      "medialis": {"type": "MULTITEXT", "prompt": " ", 'texts': [
        {'name': 'forkortes', 'prefix': "Rectus medialis forkortes", 'suffix': "mm.", 'validation': {'isRequired': true, 'message': "Længde skal angives"}} ]},
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
var sidig;
if (surgery.Eye === oculus[0]) { sidig = "højresidig ";}  
if (surgery.Eye === oculus[1]) { sidig = "venstresidig ";}  
var indikation = "Planlagt skeleoperation for " + sidig + surgery.Indikation + ".";

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
var anaestesi = surgery.Anaestesi;

/*** Operationsstatus ***/
var operationsstatus = "N/A";
var operationsstatustekst = "N/A";

/*** Diagnoser ***/
var Diagnose1 = "N/A";
var Diagnose1add1 = "N/A";

/*** Procedurer ***/
var ProcedureCode1 = "KCEC10";
if (surgery.Anaestesi == anaest[2])
{
  var ProcedureCode1add1 = "NAAC3";
} else {
  ProcedureCode1add1 = "N/A";
}
if (surgery.Eye === "o.dx."){var ProcedureCode1add2 = "TUL1";}
if (surgery.Eye === "o.sin."){var ProcedureCode1add2 = "TUL2";}
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
var operationsbeskrivelse = "Musculus rectus lateralis lokaliseres. Denne lægges " + surgery.lateralis.tilbage + " mm tilbage. Sutureres til sclera med Vicryl 6-0. Conjunctiva adapteret med Vicryl 7-0.<newline>Musculus rectus medialis lokaliseres. Denne forkortes " + surgery.medialis.forkortes + " mm. Sutureres til sclera ved muskelhæftet med Vicryl 6-0. Conjunctiva adapteret med Vicryl 7-0.";
  
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
var konklusionogplan = "Kontrol ved egen øjenlæge om 1 uge.<newline>Kontrol i Skeleklinikken + " + clinician.name + " om 6 - 8 uger.";

/*** Postoperativ plan ***/
var postoperativplan = "N/A";

/*** Ordination af medicin ***/
var ordinationafmedicin = "rp. øjendr. Tobradex x 3 dgl. " + surgery.Eye + " i 3 uger.";

/*** Ordinationer, øvrige ***/
var ordinationer2 = "N/A";

/*** Information/accept ***/
var information = "Præoperativt informeres om operationens art samt risici og pt. accepterer.";

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
var dictate;
var message;
var extramessage = " ";
if (surgery.Epikrise === nj[1] && surgery.Anaestesi === anaest[2])
{
extramessage = " + foreløbig epikrise ";
}  
if (surgery.Diktat === "Ja")
{
dictate = true;
} else {
dictate = "N/A";
}
if (surgery.Besked === undefined || surgery.Besked === "")
{
message = procedurename + extramessage;
} else {
message = procedurename + extramessage + "- " + surgery.Besked;
}
  
/*** End with setting focus at predefined field ***/
var lastfield = "Operationsbeskrivelse";

/*** Preview ***/
var preview;
if (surgery.Epikrise !== nj[1] || surgery.Anaestesi !== anaest[2])
{
preview = "Ja";
} 
else
{
preview = "N/A";
} 

/*** Save draft ***/
var gemkladde = "N/A";

/*** Run Flow motor ***/
 try {
    Flow.run('C Sub Amb Operationsnotat', {AOd: d, AOm: m, AOy: y, AOh: h, AOi: i, AOudarbejdetaf: udarbejdetaf, AOindikation: indikation, AOtrin1: trin1, AOtrin1tekst: trin1tekst, AOasa: asa, AOasatekst: asatekst, AOoperatoer: operatoer, AOoperatoerassistent: operatoerassistent, AOanaestesi: anaestesi, AOoperationsstatus: operationsstatus, AOoperationsstatustekst: operationsstatustekst, AODiagnose1: Diagnose1, AODiagnose1add1: Diagnose1add1, AOProcedureCode1: ProcedureCode1, AOProcedureCode1add1: ProcedureCode1add1, AOProcedureCode1add2: ProcedureCode1add2, AOProcedureCode1add3: ProcedureCode1add3, AOProcedureCode2: ProcedureCode2, AOProcedureCode2add1: ProcedureCode2add1, AOProcedureCode3: ProcedureCode3, AOProcedureCode4: ProcedureCode4, AOProcedureCode5: ProcedureCode5, AOProcedureCode6: ProcedureCode6, AORessource: Ressource, AOperoperativpatologi: peroperativpatologi, AOoperationsbeskrivelse: operationsbeskrivelse, AOoperationsbeskrivelsefortsat: operationsbeskrivelsefortsat, AOoperationsbeskrivelsefortsat2: operationsbeskrivelsefortsat2, AOimplantater: implantater, AOpraeparater: praeparater, AOpraeparatvaegt: praeparatvaegt, AOblodtab: blodtab, AOkonklusionogplan: konklusionogplan, AOpostoperativplan: postoperativplan, AOordinationafmedicin: ordinationafmedicin, AOordinationer2: ordinationer2, AOinformation: information, AOtrin2: trin2, AOtrin2tekst: trin2tekst, AOkontaktperson: kontaktperson, AOkontaktpersontekst: kontaktpersontekst, AOtrin6: trin6, AOtrin6tekst: trin6tekst, AOfmk: fmk, AOskalsendes: skalsendes, AOdictate: dictate, AOmessage: message, AOlastfield: lastfield, AOpreview: preview, AOgemkladde: gemkladde} );
  } 
  catch (e) {
    Dialog.warn('Advarsel', 'Subflow kan ikke kaldes.', { 'timeout': 5 });
  }
if (surgery.Epikrise === nj[1] && surgery.Anaestesi === anaest[2])
{
    Dialog.info("Ret operationsnotat til - gem ikke kladde", "Tryk OK når operationsnotat er rettet til. Herefter laves epikrisen.\n\nDette vindue kan flyttes ved at trække i 'havfruens hale'.", {}); 

  try {
  Fields['Notat - NavigatorTree'].select("Konklusion og plan");
  var efterbeh1 = Fields["Notat - Fritekst"].read();
  }
  catch (e)
  {  
    Dialog.warn('Advarsel', 'Konklusion og plan kan ikke læses til Epikrisen.', { 'timeout': 5 });
  }  
  try {
  Fields['Notat - NavigatorTree'].select("Ordination af medicin");
  var efterbeh2 = Fields["Notat - Fritekst"].read();
  }
  catch (e)
  {  
    Dialog.warn('Advarsel', 'Ordination af medicin kan ikke læses til Epikrisen.', { 'timeout': 5 });
  }  
  try {
    Fields["Gem kladde"].click();
  }
  catch (e)
  {  
    Dialog.warn('Advarsel', 'Kladde kan ikke gemmes.', { 'timeout': 5 });
  }    
  Fields['Menu - Journal'].click();
  Fields['Menu - Nyt notat'].click();
  Fields["JournalCPRinput"].simulateClick();  //** Makes drop-down in Cosmic menu disappear **

/*** Epikrise Skabelon starter ***/

/*** Enhed ***/
var enhed = "N/A";

/*** Udarbejdet af ***/
var udarbejdetaf = "N/A";
//var udarbejdetaf = clinician.name+", "+clinician.title;

/*** Resumé af forløbet   ***/
var resume = "Indlagt med henblik på " + sidig + "skeleoperation for " + surgery.Indikation + ".<newline>Musculus rectus lateralis er tilbagelagt med " + surgery.lateralis.tilbage + " mm, musculus rectus medialis er forkortet med " + surgery.medialis.forkortes + " mm.<newline>Operationen har været ukompliceret, og pt. er velbefindende ved udskrivelsen.";

/*** Ikke afsluttede undersøgelser ***/
var ikkeafslundersoeg = "N/A";

/*** Efterbehandlingsplan   ***/
var efterbehandlingsplan = efterbeh1 + "<newline>" + efterbeh2;

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
var lastfield = "Resumé af forløbet";

/*** Save draft ***/
var gemkladde = "N/A";

/*** Run Flow motor ***/
 try {
    Flow.run('C Sub Epikrise uden lægemidler', {EULd: d, EULm: m, EULy: y, EULh: h, EULi: i, EULenhed: enhed, EULudarbejdetaf: udarbejdetaf, EULresume: resume, EULikkeafslundersoeg: ikkeafslundersoeg, EULefterbehandlingsplan: efterbehandlingsplan, EULfmk: fmk, EULdosisdispensering: dosisdispensering, EULdosisdispenseringtekst: dosisdispenseringtekst, EULsygemelding: sygemelding, EULgenoptraeningsplan: genoptraeningsplan, EULblodtransfusion: blodtransfusion, EULblodtransfusiontekst: blodtransfusiontekst, EULDiagnose1: Diagnose1, EULDiagnose1add1: Diagnose1add1, EULinformation: information, EULdictate: dictate, EULmessage: message, EULlastfield: lastfield, EULgemkladde: gemkladde} );
  } 
  catch (e) {
    Dialog.warn('Advarsel', 'Subflow kan ikke kaldes.', { 'timeout': 5 });
  }  
Fields['Notat - Preview'].click();  
}  
} catch (e) {
// *** Catch User cancel  
}