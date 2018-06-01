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
var procedurename = "Epiretinal Fibrose";
  var anaest = ["Peribulbær anæstesi",
                "Retrobulbær anæstesi",
                "Generel anæstesi"];
  var oculus = ["o.dx.","o.sin."];
  var nj = ["Nej", "Ja"];
var konklusion = ["Kan afsluttes til egen øjenlæge.", "Kontrol hos operatør.", "Kontrol i ambulatoriet."];

try {
  var surgery = Dialog.input(
    procedurename, "Angiv valg",{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
      "Eye": { "type": "RADIO", "prompt": "Øje:", "selectBetween": oculus, 'validation': {'isRequired': true, 'message': "Vælg øje"}},
      "Anaestesi": { "type": "RADIO", "prompt": "Anæstesi:", "value": anaest[0], "selectBetween": anaest, "orientation": "vertical"},
      "Endolaser": { "type": "RADIO", "prompt": "Endolaser:", "value": nj[0], "selectBetween": nj},
      "Konklusion": { "type": "RADIO", "prompt": "Opfølgning efter i morgen:", "value": konklusion[0], "selectBetween": konklusion, "orientation": "vertical"},
      "Kirurg": { "type": "MULTITEXT", "prompt": "Hvornår?:",  'texts': [{'name': 'time1', 'value': "6", 'prefix': 'om ca.', 'suffix': 'uger.'}], "dependsOn": "Konklusion=Kontrol hos operatør."},
      "Amb": { "type": "MULTITEXT", "prompt": "Hvornår?:",  'texts': [{'name': 'time2', 'value': "6", 'prefix': 'om ca.', 'suffix': 'uger.'}], "dependsOn": "Konklusion=Kontrol i ambulatoriet."},
      "divider1": { 'type': 'DIVIDER'},
      "Proctid": { "type": "MULTITEXT", "prompt": "Proceduretidspunkt:", "texts": [{"name": "hour", "prefix": d+"/"+m+"-"+y+" kl. ", "value": h, "validation": {"regex": '^([012](\\d{1}))$'}},{"name": "minute", "prefix": ":", "value": i, "validation": {"regex": '^([0123456](\\d{1}))$'}}]},
      "Diktat": { "type": "RADIO", "prompt": "Tomt diktat:", "value": nj[1], "selectBetween": nj},
      "Besked": { "type": "TEXT", "prompt": "Evt. besked til sekretær:", "dependsOn": "Diktat=Ja"}                                                
    });
h = surgery.Proctid.hour;  
i = surgery.Proctid.minute;
var sidig;
if (surgery.Eye === oculus[0]) { sidig = "højresidig ";}  
if (surgery.Eye === oculus[1]) { sidig = "venstresidig ";}  

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
var Diagnose1 = "DH352A";
if (surgery.Eye === "o.dx."){var Diagnose1add1 = "TUL1";}
if (surgery.Eye === "o.sin."){var Diagnose1add1 = "TUL2";}

/*** Procedurer ***/
var ProcedureCode1 = "KCKD65";
if (surgery.Anaestesi == anaest[2])
{
  var ProcedureCode1add1 = "NAAC3";
} else {
  ProcedureCode1add1 = "N/A";
}
if (surgery.Eye === "o.dx."){var ProcedureCode1add2 = "TUL1";}
if (surgery.Eye === "o.sin."){var ProcedureCode1add2 = "TUL2";}
var ProcedureCode1add3 ="N/A";
var ProcedureCode2 = "KCKD10";
var ProcedureCode2add1 = "N/A";
var ProcedureCode3 = "KCKD70";
var ProcedureCode4 = "KCJB30";
var ProcedureCode5 = "KTCF00";
if (surgery.Endolaser == nj[1])
{
  var ProcedureCode6 = "KCKD40";
} else {
  ProcedureCode6 = "N/A";
}

/*** Procedurer - set Ressource ***/
var Ressource = true;  
  
/*** Peroperativ patologi ***/
var peroperativpatologi = "N/A";

/*** Operationsbeskrivelse ***/
var op = {
  "jv": { 
    text: "Der foretages vanlig 3-portsadgang 3,5 mm bag limbus med 25+ gauge teknik. Velplaceret vandindføring.<newline>Kort kernevitrektomi. Der farves med Kenalog, og bagre hyaloid findes afløst centralt. Herefter supplerende vitrektomi under indentering. Ingen huller eller rifter. Herefter gøres bagre kapsulotomi med vitrektor.<newline>Der farves med ILM blue, og der foretages uproblematisk peeling af epiretinal membran og ILM.<newline>Væske-/luftskifte.<newline>Atmosfærisk luft skiftes til 10% SF6 til passende tension.<newline>De sklerale porte fjernes, og sklerotomierne er tætte.<newline>Afslutningsvist 0,5 ml Marcain efterfulgt af 0,5 ml Hexamycin og 0,5 ml Dexaven subkonjunktivalt.<newline>Øjenklap."
      },
  "gm": { 
    text: "Der foretages vanlig 3-portsadgang 3,5 mm bag limbus med 25+ gauge teknik. Velplaceret vandindføring.<newline>Kort kernevitrektomi. Der farves med Kenalog, og bagre hyaloid findes afløst centralt. Herefter supplerende vitrektomi under indentering. Ingen huller eller rifter. Herefter gøres bagre kapsulotomi med vitrektor.<newline>Der farves med ILM blue, og der foretages uproblematisk peeling af epiretinal membran og ILM.<newline>Væske-/luftskifte.<newline>Atmosfærisk luft skiftes til 10% SF6 til passende tension.<newline>De sklerale porte fjernes, og sklerotomierne er tætte.<newline>Afslutningsvist 0,5 ml Marcain efterfulgt af 0,5 ml Hexamycin og 0,5 ml Dexaven subkonjunktivalt.<newline>Øjenklap."
      },
    "jw": { 
    text: "Der foretages vanlig 3-portsadgang 3,5 mm bag limbus med 25+ gauge teknik. Velplaceret vandindføring.<newline>Kort kernevitrektomi. Der farves med Kenalog, og bagre hyaloid findes afløst centralt. Herefter supplerende vitrektomi under indentering. Ingen huller eller rifter. Bagre kapsel spaltes med vitrektor.<newline>Der farves med Membrane Blue, hvorefter der foretages uproblematisk peeling af epiretinal membran og ILM.<newline>Væske-/luftskifte.<newline>Atmosfærisk luft skiftes til 10% SF6 til passende tension.<newline>De sklerale porte fjernes, og sklerotomierne er tætte.<newline>Afslutningsvist 0,5 ml Marcain efterfulgt af 0,5 ml Hexamycin og 0,5 ml Dexaven subkonjunktivalt.<newline>Øjenklap."
      },
    "nlø": { 
    text: "Der foretages vanlig 3-portsadgang 3,5 mm bag limbus med 25+ gauge teknik. Velplaceret vandindføring.<newline>Central vitrektomi. Bagre hyaloid skønnes afløst. Herefter supplerende vitrektomi under indentering. Ingen huller eller rifter. Herefter gøres bagre kapsulotomi med vitrektor.<newline>Der farves med Membrane Blue, hvorefter der foretages uproblematisk peeling af epiretinal membran og ILM.<newline>Væske-/luftskifte.<newline>Atmosfærisk luft skiftes til 10% SF6 til passende tension.<newline>De sklerale porte fjernes, og sklerotomierne er tætte.<newline>Afslutningsvist 0,5 ml Marcain efterfulgt af 0,5 ml Hexamycin og 0,5 ml Dexaven subkonjunktivalt.<newline>Øjenklap."
      },
  "ml": { 
    text: "Der foretages vanlig 3-portsadgang 3,5 mm bag limbus med 25+ gauge instrumenter.<newline>Velplaceret bagkammerlinse samt vandindføring.<newline>Kort kernevitrektomi. Herefter farves med Kenalog.<newline>Bagre hyaloid afløsnes. Der vitrektomeres i periferien under indentering. Der er ingen huller eller rifter.<newline>Med vitrektor gøres bagre kapsulotomi.<newline>Herefter farves med ILM-Blue, og der foretages uproblematisk ILM-peeling.<newline>Herefter væske-/luftskifte. Bulbus efterlades med atmosfærisk luft.<newline>De sklerale porte fjernes og er tætte.<newline>Afslutningsvist 0,5 ml Marcain efterfulgt af 0,5 ml Hexamycin og Dexaven subtenonalt.<newline>Øjenklap."
        }
};

var OPbeskrivelse;
if (op[clinician.initials]) {
	OPbeskrivelse = op[clinician.initials].text;
} else {
	OPbeskrivelse = "Ingen frase.";
    Dialog.warn("Advarsel", "Du er ikke registreret med din egen operationsfrase.", { timeout: 10 });  
}  

var operationsbeskrivelse = OPbeskrivelse;
  
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
var konkl2;    
if (surgery.Konklusion === konklusion[0]){konkl2 = konklusion[0];}
if (surgery.Konklusion === konklusion[1]){konkl2 = "Kontrol hos operatør om ca. " + surgery.Kirurg.time1 + " uger.";}  
if (surgery.Konklusion === konklusion[2]){konkl2 = "Kontrol i ambulatoriet om ca. " + surgery.Amb.time2 + " uger.";}  
  
var konklusionogplan = "Lejring: Pt. skal undgå rygleje i de næste tre døgn.<newline>Ambulant kontrol i morgen. Ugekontrol hos egen øjenlæge.<newline>" + konkl2;
  
/*** Postoperativ plan ***/
var postoperativplan = "N/A";

/*** Ordination af medicin ***/
var ordinationafmedicin = "rp. øjendr. Tobradex x 3 dgl. " + surgery.Eye + " i ca. 3 uger.";

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
