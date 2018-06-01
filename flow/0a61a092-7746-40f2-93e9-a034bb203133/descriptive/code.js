//**  This flow sets the values and parameters for the surgery and then calls the                   **//
//**  'C Sub Operationsnotat' subflow to update Cosmic                                              **//
//**  If the Epikrise checkbox is set this flow will call the 'Nucleaus CI 522 - Epikrise' subflow. **//
//**  It will in turn call the 'Epikrise u laegemiddel' subflow.                                    **//

StdRetry = 12;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var enhed = "OUH Øre-, Næse- og Hals Afsnit F2 ";

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
Flow.run('Check kliniker', {} ); 
/*var clinician = {name: "OUH Afd. F læge", title: "overlæge", username: "jw", initials: "JW"};*/


/*** Inputs  ***/
var procedurename = "Cochlear implant Nucleus CI 522";
var hv = ["højre", "venstre", "bilateralt"];
try {
  var surgery = Dialog.input(
    procedurename, "Angiv valg",
    {buttons: [{'value': 'Ok' },
               {'value': 'Cancel', 
                'isCancel': true }
              ],
     "Ear": {"type": "RADIO", 
             "prompt": "Øre:", 
             "selectBetween": hv, 
             'validation': {'isRequired': true, 'message': "Vælg øre"}
            },
     "Proctid": {"type": "MULTITEXT", 
                 "prompt": "Tidspunkt:", 
                 "texts": [{"name": "hour", 
                            "prefix": d+"/"+m+"-"+y+" kl. ", 
                            "value": h, 
                            "validation": {"regex": '^([012](\\d{1}))$'}},
                           {"name": "minute", 
                            "prefix": ":", 
                            "value": i, 
                            "validation": {"regex": '^([0123456](\\d{1}))$'}}]
                },
     "Epikrise": { 'type': 'CHECKBOX', 
                  'prompt': "Automatisk epikrise:",
                  'options': [{'name': 'autoepikrise'}]
                 }
    });
  
  h = surgery.Proctid.hour;  
  i = surgery.Proctid.minute;

  /*** Skabelon starter ***/
  
  /*** Indikation   ***/
  var indikation = "Indikation for " + surgery.Ear;
  if (surgery.Ear !== hv[2]) { indikation = indikation + "sidig";} 
  indikation = indikation + " CI med Nucleus elektrode.";

  /*** Trin 1   ***/
  var trin1 = "Udført";
  var trin1tekst = "Informeret og samtykker.";
  
  /*** ASA   ***/
  var asa = "N/A";
  var asatekst = "N/A";      
  
  /*** Operatør ***/
  var operatoer = clinician.name;
  if (clinician.title !== "") {
    operatoer = operatoer + ", " + clinician.title;
  }
  
  /*** Operatørassistent ***/
  var operatoerassistent = "N/A";
  
  /*** Anaestesi ***/
  var anaestesi = "Generel anæstesi";

  /*** Operationsstatus ***/
  var operationsstatus = "Planlagt";
  var operationsstatustekst = "N/A";

  /*** Diagnoser ***/
  var Diagnose1 = "DH905";
  var Diagnose1add1 = "N/A";

  /*** Procedurer ***/
  var ProcedureCode1 = "N/A";
  var ProcedureCode1add1 = "N/A";
  var ProcedureCode1add2 = "N/A";
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
  var operationsbeskrivelse = "Vanlig adgang under sterile forhold bag øre.<newline>Der bruges lokalbedøvelse, Lidokain-adrenalin 1%, 8 ml.<newline>Ukompliceret mastoidektomi. Incus opsøges Posterior tympanotomi. Der er brugt nervestimulator sv.t. nervus facialis.<newline>Chorda bevaret.<newline>Det runde vindue opsøges og frilægges. Laver paracentese og ilægger Kenalog i mellemøret.<newline>Borer fordybning bag mastoidektomien til elektronikboks, og placerer Nucleus CI 522, der fikseres med Ethilon 2-0 sv.t. periost. Indfører langsomt til fuld længde igennem det runde vindue.<newline>Muskelfascie ved det runde vindue, fikseret med cement i mastoidet.<newline>Lukker med Vicryl 3-0 i flere lag samt agraffer i huden.<newline>Der er givet Cefuroxim 1,5 g i.v. peroperativt.";

  /*** Operationsbeskrivelsefortsat ***/
  var operationsbeskrivelsefortsat = "N/A";

  /*** Operationsbeskrivelsefortsat2 ***/
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
  var konklusionogplan = "Kan udskrives i morgen efter stuegang og måling af impedans og NRT på Høreklinikken. Sygeplejerske på F2 kan ringe til høreklinikken og arrangere dette på et givent tidspunkt i morgen formiddag.<newline><newline>Agraffjernelse om ca. 10-14 dage, hvilket kan foregå hos egen læge eller i sygeplejeamb, på Afd. F.<newline>Tilkobling af høreapparat om ca. 4-5 uger på Høreklinikken, OUH.";

  /*** Postoperativ plan ***/
  var postoperativplan = "N/A";
  
  /*** Ordination af medicin ***/
  var ordinationafmedicin = "N/A";

  /*** Ordinationer, øvrige ***/
  var ordinationer2 = "N/A";

  /*** Information til ptienten om indgreb ***/
  var information = "N/A";
  
  /*** Trin 2 ... ***/
  var trin2 = "N/A";
  
  /*** Trin 2 tekst ***/
  var trin2tekst = "N/A";
  
  /*** Kontaktperson(er) ***/
  var kontaktperson = "N/A";
  var kontaktpersontekst = "N/A";
  
  /*** Trin 6 tekst ***/
  var trin6 = "N/A";
  var trin6tekst = "N/A";
  
  /*** Final settings ***/
  
  /*** Create entry on dictation list ***/
  var dictate = "N/A";  
  var message = "N/A";  
  
  /*** End with setting focus at predefined field ***/
  var lastfield = "Operationsbeskrivelse";
  
  /*** Run Flow motor ***/
  try {
    Flow.run('C Sub operationsnotat', {AOd: d, 
                                       AOm: m, 
                                       AOy: y, 
                                       AOh: h, 
                                       AOi: i, 
                                       AOindikation: indikation,                                        
                                       AOtrin1: trin1, 
                                       AOtrin1tekst: trin1tekst,
                                       EULenhed: enhed,
                                       AOasa: asa, 
                                       AOasatekst: asatekst, 
                                       AOoperatoer: operatoer, 
                                       AOoperatoerassistent: operatoerassistent, 
                                       AOanaestesi: anaestesi, 
                                       AOoperationsstatus: operationsstatus, 
                                       AOoperationsstatustekst: operationsstatustekst, 
                                       AODiagnose1: Diagnose1, 
                                       AODiagnose1add1: Diagnose1add1,
                                       AOProcedureCode1: ProcedureCode1, 
                                       AOProcedureCode1add1: ProcedureCode1add1, 
                                       AOProcedureCode1add2: ProcedureCode1add2, 
                                       AOProcedureCode1add3: ProcedureCode1add3, 
                                       AOProcedureCode2: ProcedureCode2, 
                                       AOProcedureCode2add1: ProcedureCode2add1, 
                                       AOProcedureCode3: ProcedureCode3, 
                                       AOProcedureCode4: ProcedureCode4, 
                                       AOProcedureCode5: ProcedureCode5, 
                                       AOProcedureCode6: ProcedureCode6,
                                       AORessource: Ressource, 
                                       AOperoperativpatologi: peroperativpatologi, 
                                       AOoperationsbeskrivelse: operationsbeskrivelse,
                                       AOoperationsbeskrivelsefortsat: operationsbeskrivelsefortsat,
                                       AOoperationsbeskrivelsefortsat2: operationsbeskrivelsefortsat2,
                                       AOimplantater: implantater, 
                                       AOpraeparater: praeparater,
                                       AOpraeparatvaegt: praeparatvaegt, 
                                       AOblodtab: blodtab, 
                                       AOkonklusionogplan: konklusionogplan, 
                                       AOpostoperativplan: postoperativplan, 
                                       AOordinationafmedicin: ordinationafmedicin, 
                                       AOordinationer2: ordinationer2, 
                                       AOinformation: information, 
                                       AOtrin2: trin2, 
                                       AOtrin2tekst: trin2tekst,                                        
                                       AOkontaktperson: kontaktperson, 
                                       AOkontaktpersontekst: kontaktpersontekst,
                                       AOtrin6: trin6, 
                                       AOtrin6tekst: trin6tekst,
                                       AOdictate: dictate, 
                                       AOmessage: message,
                                       AOlastfield: lastfield});
    
  } catch (e) {
    Dialog.warn('Advarsel', 'C Sub operationsnotat kan ikke kaldes.', { 'timeout': 5 });
  }
  
  /* Sæt procedurerkoder */
  
    var ProcedureCode1 = "KDFE00";
  
  var til1 = "";
  
  if (surgery.Ear === hv[0] || surgery.Ear === hv[2]){ til1 = "TUL1";}
  if (surgery.Ear === hv[1]){ til1 = "TUL2";}
   
  Flow.run('C sub Procedurer', {'ProcedureCode': "KDFE00",
                                'TillaegsCode1': til1,
                                'TillaegsCode2': '',
                                'TillaegsCode3': '',
                                'TillaegsCode4': '',
                                Pd: d, Pm: m, Py: y, Ph: h, Pi: i});
  /* Hvis bilateral opret ny procedurerkode og sæt TUL2 på den */
  if (surgery.Ear === hv[2]) { 
    Flow.run('C sub Procedurer', {'ProcedureCode': "KDFE00",
                                  'TillaegsCode1': '', 
                                  'TillaegsCode2': '',
                                  'TillaegsCode3': '',
                                  'TillaegsCode4': '',
                                  Pd: d, Pm: m, Py: y, Ph: h, Pi: i});
    Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip("KDFE00", 1, 0); /*Tilføj tillægskode med offset i fht. først tilsvarende procedurerkode */
    Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
    Fields['Notat - Find Koder - Text'].input("TUL2");
    Fields['Notat - Find Koder - Søg'].click();
    Fields['Notat - Find Koder - Resultat'].select("TUL2");
    Fields['Notat - Find Koder - Tilføj'].click();
  }
  
  if (surgery.Epikrise.length === 1) {
    var patient = Fields["Patientlinje - Fornavne"].read();
    patient = patient + " " + Fields["Patientlinje - Efternavn"].read();
    Notification.show('Signer1', 'Husk at signer notat for:', patient, { severity: 'WARN', timeout: 600 });
    
    //** Before calling the Epikrise flow the Operationsnotat is saved (not signed) **//
    Fields["Gem kladde"].click();
    //Wait.forMilliseconds(5000);
    //Fields["Menu - Journal"].click();
    //Wait.forMilliseconds(2300);
    Fields["Menu - Nyt notat"].click();
    //Wait.forMilliseconds(2300);
    //Fields["Menu - Journal"].click();
    
    try {      
      Flow.run('Nucleus CI 522 - Epikrise', {'auto': 'auto', 
                                             AOd: d,
                                             AOm: m, 
                                             AOy: y, 
                                             AOh: h, 
                                             AOi: i,
                                             AOProcedureCode1add1: ProcedureCode1add1, 
                                             AOProcedureCode1add2: ProcedureCode1add2});
    } catch (e) {
      Dialog.warn('Advarsel', 'Nucleus CI 522 - Epikrise kan ikke kaldes.', {});
    }
  }
} catch (e) {
  // *** Catch User cancel  
}
