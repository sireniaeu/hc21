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
var procedurename = "Torisk linse";
var anaest = ["Dråbeanæstesi",
                "Peribulbær anæstesi",
                "Retrobulbær anæstesi",
                "Generel anæstesi"];
  var visco = ["DisCoVisc                ",
               "Viscoat                 ",
               "I-visc              ",
               "Healon GV              ",
               "Healon 5                  "];
  var oculus = ["o.dx.","o.sin."];
  var nj = ["Nej", "Ja"];
var visc = {
  "jg": { visco1: visco[1] },
  "pr": { visco1: visco[0] },
  "nly": { visco1: visco[0] },
  "ne": { visco1: visco[2] }
};
//var viscoelas1 = visc[clinician.initials].visco1;
var viscoelas1;
if (visc[clinician.initials]) {
	viscoelas1 = visc[clinician.initials].visco1;
} else {
	viscoelas1 = visco[0];
}

try {
  
//******** Dialog to ask for scanning of barcode **//
var barcode = Dialog.input("Torisk linsetype", "Scan øverste stregkode fra æskens bagside",{buttons: [{ 'value': 'Cancel', 'isCancel': true }], 'submitOnValidation': true,
//                           'Stregkode': {"type": "TEXT", "prompt": "Stregkode: ", "validation": {"regex": '^.{5}([S][N](\\d{1})[A][T]).{7}*$'}}});
                           'Stregkode': {"type": "TEXT", "prompt": "Stregkode: ", "validation": {"regex": '^.{10}.*$'}}});

// Extract type of lens
var linsetype = barcode.Stregkode.match(/^.{1}(.{4})(.{5})/);
if (linsetype[2] === "SN6AT")
{  
var linse = barcode.Stregkode.match(/^.{5}(.{6})(\d{2})(\d{1})/);
  
  var surgery = Dialog.input(
    procedurename, "Acrysof IQ torisk " + linse[1] + " +" + linse[2] + "," + linse[3] + "D",{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
      "Eye": { "type": "RADIO", "prompt": "Øje:", "selectBetween": oculus, 'validation': {'isRequired': true, 'message': "Vælg øje"}},
      "Anaestesi": { "type": "RADIO", "prompt": "Anæstesi", "value": anaest[0], "selectBetween": anaest, "orientation": "vertical"},
      "Visco": { "type": "RADIO", "prompt": "Viscoelasticum", "value": viscoelas1, "selectBetween": visco},
      "Akse": {"type": "MULTITEXT", "prompt": "Akse:", "texts": [{"name": "grader", "suffix": '°', "validation": {"regex": '^(\\d{1,3})$'}}]}, 
      "Phenylephrin": { "type": "RADIO", "prompt": "Phenylephrin intrakameralt:", "value": nj[0], "selectBetween": nj},
      "divider1": { 'type': 'DIVIDER'},
      "Proctid": { "type": "MULTITEXT", "prompt": "Proceduretidspunkt:", "texts": [{"name": "hour", "prefix": d+"/"+m+"-"+y+" kl. ", "value": h, "validation": {"regex": '^([012](\\d{1}))$'}},{"name": "minute", "prefix": ":", "value": i, "validation": {"regex": '^([0123456](\\d{1}))$'}}]},
      "Diktat": { "type": "RADIO", "prompt": "Tomt diktat:", "value": nj[1], "selectBetween": nj},
      "Besked": { "type": "TEXT", "prompt": "Evt. besked til sekretær:", "dependsOn": "Diktat=Ja"}                                                
    });
h = surgery.Proctid.hour;  
i = surgery.Proctid.minute;
var Viscotrim = surgery.Visco.trim();

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
var anaestesi = surgery.Anaestesi;

/*** Operationsstatus ***/
var operationsstatus = "N/A";
var operationsstatustekst = "N/A";

/*** Diagnoser ***/
var Diagnose1 = "N/A";
var Diagnose1add1 = "N/A";

/*** Procedurer ***/
var ProcedureCode1 = "KCJE20";
if (surgery.Anaestesi == anaest[3])
{
  var ProcedureCode1add1 = "NAAC3";
} else {
  ProcedureCode1add1 = "N/A";
}
if (surgery.Eye === "o.dx."){var ProcedureCode1add2 = "TUL1";}
if (surgery.Eye === "o.sin."){var ProcedureCode1add2 = "TUL2";}
var ProcedureCode1add3 = "KZAA00";
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
var op = {
  "jv": { 
    text: "Korneal tunnel- og hjælpeincision. Under " + Viscotrim + " forreste capsulorrhexis. Kernen løsnes med vand og fakoemulsificeres. Resterende corticalis fjernes med sug/skyl. Bagre kapsel poleres. Under " + Viscotrim + " implanteres bagkammerlinse i kapslen. " + Viscotrim + " fjernes med sug/skyl.<newline>Cefuroxim 1 mg i kammeret og vand til normotension. Cikatricen er tæt.<newline>Dryppes med øjendr. Maxidex x 1."
      },
    "pr": { 
    text: "Limbal incision. Lidokain. " + Viscotrim + " i forreste kammer. Capsulorrhexis og hydrodissektion. Fakoemulsifikation af nucleus. Kortikalrester fjernes med sug og skyl. " + Viscotrim + " i kapselsækken. Implantation af bagkammerlinse.<newline>" + Viscotrim + " aspireres. Cefuroxim intrakameralt.<newline>Kammeret tæt ved operationens afslutning med passende tryk."
      },
    "nly": { 
    text: "Korneal tunnel- og hjælpeincision. Under " + Viscotrim + " forreste capsulorrhexis. Kernen løsnes med vand og fakoemulsificeres. Resterende corticalis fjernes med sug/skyl. Bagre kapsel poleres. Under " + Viscotrim + " implanteres bagkammerlinse i kapslen. " + Viscotrim + " fjernes med sug/skyl.<newline>Cefuroxim 1 mg i kammeret og vand til normotension. Cikatricen er tæt.<newline>Dryppes med øjendr. Maxidex x 1."
      },
    "ne": { 
    text: "Korneal incision, forreste kapsulotomi og fjernelse af nucleus vha. fako. Sug/skylning af kammeret. Indlæggelse af pseudophakos.<newline>Proceduren foregår under dække af " + Viscotrim + ".<newline>Der injiceres Cefuroxim i kammeret."
      }
};
  
var OPbeskrivelse;
if (op[clinician.initials]) {
	OPbeskrivelse = op[clinician.initials].text;
} else {
	OPbeskrivelse = "Ingen frase.";
    Dialog.warn("Advarsel", "Du er ikke registreret med din egen operationsfrase.", { timeout: 10 });  
}  
  
//var operationsbeskrivelse = "Linse: Acrysof IQ torisk, " + linse[1] + ".<newline>Styrke: +" + linse[2] + "," + linse[3] + "D.<newline>Akse: " + surgery.Akse.grader + "°.<newline><newline>" + kat[clinician.initials].text;
var operationsbeskrivelse = "Linse: Acrysof IQ torisk, " + linse[1] + ".<newline>Styrke: +" + linse[2] + "," + linse[3] + "D.<newline>Akse: " + surgery.Akse.grader + "°.<newline><newline>" + OPbeskrivelse;
 
/*** Operationsbeskrivelse fortsat ***/
if (surgery.Phenylephrin == nj[1])
{
var operationsbeskrivelsefortsat = "Der er anvendt Phenylephrin intrakameralt.";
} else {
operationsbeskrivelsefortsat = "N/A";
}

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
var konklusionogplan = "Møder til ambulant kontrol om 1-3 dage som aftalt.<newline>Ugekontrol hos optiker.<newline>Optikerkontrol 3 mdr. efter sidste øjes operation.";

/*** Postoperativ plan ***/
var postoperativplan = "N/A";

/*** Ordination af medicin ***/
var ordinationafmedicin = "rp. øjendr. Maxidex x 3 dgl. " + surgery.Eye + " i 3 uger.";

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
var message = procedurename;
} else {
message = procedurename + " - " + surgery.Besked;
}
  
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
Dialog.info("Smid æsken ud", "For at undgå forvekslinger.", {});
Fields["Notat - Preview"].click();
}
else
{ 
if (linsetype[1] === "CB00" || linsetype[1] === "H530")
{
Dialog.info("Forkert stregkode", "Du har ikke skannet en Alcon torisk IOL.", {});
Flow.run('Operationer E', {});
}
else
{  
Dialog.info("Forkert stregkode", "Scan øverste stregkode på æskens bagside", {});
Flow.run('Katarakt - torisk', {});
}
}
} catch (e) {
// *** Catch User cancel  
}
