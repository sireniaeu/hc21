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

var nj = ["Nej", "Ja"];
var optype =  ["SMILE", "Femto-LASIK"];
var visittype = ["1. dagskontrol",  "Ugekontrol"];
var oculus = ["o.u.", "o.dx.", "o.sin."];
var tensiont = ["Appl.",  "Icare"];
  
try {
    var kontrol = Dialog.input(
      "Kontrol efter refraktiv kirurgi", "",{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
      "Surgery": { "type": "RADIO", "prompt": "Operation:", "selectBetween": optype, 'value': optype[0]},
      "Eye": { "type": "RADIO", "prompt": "Øje:", "selectBetween": oculus, 'value': oculus[0]},
      "Visit": { "type": "RADIO", "prompt": "Kontrol:", "selectBetween": visittype, 'validation': {'isRequired': true, 'message': "Vælg konklusion"}},
      "Visusdx": { "type": "TEXT", "prompt": "Visus o.dx.:", "suffix": "Snellen (HB, 1/60 og lign. noteres i refraktionsfeltet.)", 'validation': { 'regex': '^([01][.,](\\d{1,3}))?$', 'message': 'Fx 0,8' }},
      "Refrakdx": { "type": "TEXT", "prompt": "Refraktion o.dx.:"},                      
      "Visussin": { "type": "TEXT", "prompt": "Visus o.sin.:", "suffix": "Snellen (HB, 1/60 og lign. noteres i refraktionsfeltet.)", 'validation': { 'regex': '^([01][.,](\\d{1,3}))?$', 'message': 'Fx 0,8' }},
      "Refraksin": { "type": "TEXT", "prompt": "Refraktion o.sin.:"},
      "Tension": {"type": "MULTITEXT", "prompt": "Tension:", 'texts': [{'name': 'od', 'prefix': 'o.dx:','suffix': ' '},{'name': 'os', 'prefix': 'o.sin:'}], "dependsOn": "Visit=Ugekontrol"}, 
      "TensionType": { "type": "RADIO", "prompt": " ", "value": tensiont[0], "selectBetween": tensiont, "dependsOn": "Visit=Ugekontrol"},
      "divider1": { 'type': 'DIVIDER'},
      "Diktat": { "type": "RADIO", "prompt": "Tomt diktat:", "value": nj[1], "selectBetween": nj},
      "Besked": { "type": "TEXT", "prompt": "Evt. besked til sekretær:", "dependsOn": "Diktat=Ja"}                                           
      });
    
  /**************************/
  /*** Set type of note   ***/
  /**************************/
  Settings.CommandRetries = 5;
  var skabelontype = "Ambulant klinisk kontakt";
  try {
    var ExistingSkabelon = Fields["Notat - Skabelon for Read"].read();
    if (skabelontype !== ExistingSkabelon)
    {     
     try {
      Fields['Notat - Skabelon'].select(skabelontype);
      Settings.CommandRetries = StdRetry;
      if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Assistance" && ExistingSkabelon !== "Plejedata" && ExistingSkabelon !== "Peroperativ plejekontakt" && ExistingSkabelon !== "Peroperativ plejekontakt - assisterende sygeplejerske" && ExistingSkabelon !== "Peroperativ plejekontakt - usteril hjælper") 
      {
      Fields["Notat - Skift skabelon"].click();
      }
      Wait.forField(Fields["Notat - Skabelon for Read"], 10);  
        } catch (e) {
             try {
                 Fields['Notat - Skabelon'].select("Tilføj flere alternativer...");
                 Settings.CommandRetries = StdRetry;
                 if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Assistance" && ExistingSkabelon !== "Plejedata" && ExistingSkabelon !== "Peroperativ plejekontakt" && ExistingSkabelon !== "Peroperativ plejekontakt - assisterende sygeplejerske" && ExistingSkabelon !== "Peroperativ plejekontakt - usteril hjælper") 
                 {
                 Fields["Notat - Skift skabelon"].click();
                 }
                 Fields["Notat - Alternative skabeloner"].select(skabelontype);
                 Fields["Notat - Tilføj skabelon"].click();
                 Fields["Cave - OK knap"].click();
                 Wait.forField(Fields["Notat - Skabelon for Read"], 10);
                 } catch (e) {
                 Dialog.warn('Advarsel', skabelontype + ' kan ikke vælges.');
                             } 
                    }
    }
       } catch (e) {
         Dialog.warn('Advarsel', 'Skabelon kan ikke vælges.', { 'timeout': 5 });
                   }
   Settings.CommandRetries = StdRetry;
  
/***************************/
/*** Udarbejdet af       ***/
/***************************/
//  try {
//    Fields['Notat - NavigatorTree'].select("Udarbejdet af");
//    Fields["Notat - Fritekst"].input(clinician.name+", "+clinician.title+";");
//  } catch (e) {
//    Dialog.warn("Advarsel", "Udarbejdet af ikke fundet"); 
// }

/*******************/
/*** Anamnese    ***/
/*******************/
var anamnese;
var sidetekst;
if (kontrol.Eye === "o.u.") {sidetekst = "dobbeltsidig";}  
if (kontrol.Eye === "o.dx.") {sidetekst = "højresidig";}  
if (kontrol.Eye === "o.sin.") {sidetekst = "venstresidig";}  
if (kontrol.Surgery === optype[0] && kontrol.Visit === visittype[0])
{anamnese = "Pt. møder til førstedagskontrol efter " + sidetekst + " SMILE-operation.<newline>Pt. har ro i øjnene.";}
if (kontrol.Surgery === optype[0] && kontrol.Visit === visittype[1])
{anamnese = "Pt. møder til ugekontrol efter " + sidetekst + " SMILE-operation.<newline>Pt. fortæller, at der er ro i øjnene, og at ugen er gået fint.";}
if (kontrol.Surgery === optype[1] && kontrol.Visit === visittype[0])
{anamnese = "Pt. møder til førstedagskontrol efter " + sidetekst + " Femto-LASIK operation.<newline>Pt. har ro i øjnene.";}
if (kontrol.Surgery === optype[1] && kontrol.Visit === visittype[1])
{anamnese = "Pt. møder til ugekontrol efter " + sidetekst + " Femto-LASIK operation.<newline>Pt. fortæller, at der er ro i øjnene, og at ugen er gået fint.";}
 
try {
    Fields['Notat - NavigatorTree'].select("Anamnese");
    Fields['Notat - Fritekst'].input(anamnese);
  } catch (e) {
    Dialog.warn("Advarsel", "'Anamnese' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  }

  /**** Select Objektiv Undersøgelse Øjenundersøgelse ***/  
  Fields["Notat - NavigatorTree"].select("Objektiv undersøgelse");
  Fields["Notat - Fast værdi arrow"].click();
  Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
  
//** Select Anamnese in order for the template to expand "Objektiv undersøgelse"
  Fields["Notat - NavigatorTree"].select("Anamnese");
  
/*** Visus o.dx. ***/
 if (kontrol.Eye === oculus[0] || kontrol.Eye === oculus[1])
 { 
  Fields["Notat - NavigatorTree"].select("Visus o. dx.");
  try {
  if (kontrol.Visusdx !== undefined && kontrol.Visusdx !== "") {Fields["Notat - Numerisk værdi"].input(kontrol.Visusdx);}
  if (kontrol.Refrakdx !== undefined && kontrol.Refrakdx !== "") {Fields["Notat - Fritekst"].input(kontrol.Refrakdx);}
  } catch (e) {
    Dialog.warn("Advarsel", "Visus o. dx. ikke opdateret"); }
 }
  
/*** Visus o.sin. ***/ 
 if (kontrol.Eye === oculus[0] || kontrol.Eye === oculus[2])
 { 
  Fields["Notat - NavigatorTree"].select("Visus o. sin.");
  try {
  if (kontrol.Visussin !== undefined && kontrol.Visussin !== "") {Fields["Notat - Numerisk værdi"].input(kontrol.Visussin);}
  if (kontrol.Refraksin !== undefined && kontrol.Refraksin !== "") {Fields["Notat - Fritekst"].input(kontrol.Refraksin);}
  } catch (e) {
    Dialog.warn("Advarsel", "Visus o. sin. ikke opdateret"); }
 }
  
/*** Tension ved ugekontrol ***/   
if (kontrol.Visit === visittype[1] || kontrol.Visit === visittype[3])
{ 
/*** Tension o.dx. ***/ 
 if (kontrol.Eye === oculus[0] || kontrol.Eye === oculus[1])
 { 
  Fields["Notat - NavigatorTree"].select("Tension o. dx.");
  try {
  if (kontrol.Tension.od !== undefined && kontrol.Tension.od !== "")
  {
  Fields["Notat - Numerisk værdi"].input(kontrol.Tension.od);
  Fields["Notat - Fritekst"].input(kontrol.TensionType);
  }
  } catch (e) {
   Dialog.warn("Advarsel", "Tension o.dx. ikke fundet"); }  
 }
  
/*** Tension o.sin. ***/ 
 if (kontrol.Eye === oculus[0] || kontrol.Eye === oculus[2])
 {
  Fields["Notat - NavigatorTree"].select("Tension o. sin.");
  try {
  if (kontrol.Tension.os !== undefined && kontrol.Tension.os !== "")
  {
  Fields["Notat - Numerisk værdi"].input(kontrol.Tension.os);
  Fields["Notat - Fritekst"].input(kontrol.TensionType);
  }
  } catch (e) {
   Dialog.warn("Advarsel", "Tension o.sin. ikke fundet"); }  
  } 
}
   
/***Spaltelampe***/ 
var spaltelampe;
var tekst1;
if (kontrol.Surgery === optype[0] && kontrol.Visit === visittype[0])
{
tekst1 = ": Bulbus reaktionsløs, cornea klar. Fint tilliggende insicionssnit. Intet signifikant debris. Der er ingen reaktion under låg, og overfladen er blank og klar.";
if (kontrol.Eye !== "o.u.")
{
spaltelampe = kontrol.Eye + tekst1;
}
else
{
spaltelampe = "o.dx." + tekst1 + "<newline>o.sin." + tekst1; 
}
}
if (kontrol.Surgery === optype[0] && kontrol.Visit === visittype[1])
{
tekst1 = ": Bulbus reaktionsløs, cornea klar. Fint tilliggende insicionssnit. Intet signifikant debris, og der ses ikke tendens til tørhed.";
if (kontrol.Eye !== "o.u.")
{
spaltelampe = kontrol.Eye + tekst1;
}
else
{
spaltelampe = "o.dx." + tekst1 + "<newline>o.sin." + tekst1; 
}
}
if (kontrol.Surgery === optype[1] && kontrol.Visit === visittype[0])
{
tekst1 = ": Bulbus reaktionsløs, cornea klar. Fint tilliggende LASIK-flap. Intet signifikant debris. Der er ingen reaktion under flap, og overfladen er blank og klar.";
if (kontrol.Eye !== "o.u.")
{
spaltelampe = kontrol.Eye + tekst1;
}
else
{
spaltelampe = "o.dx." + tekst1 + "<newline>o.sin." + tekst1; 
}
}
if (kontrol.Surgery === optype[1] && kontrol.Visit === visittype[1])
{
tekst1 = ": Bulbus reaktionsløs, cornea klar. Fint tilliggende LASIK-flap. Intet signifikant debris, og der ses ikke tendens til tørhed.";
if (kontrol.Eye !== "o.u.")
{
spaltelampe = kontrol.Eye + tekst1;
}
else
{
spaltelampe = "o.dx." + tekst1 + "<newline>o.sin." + tekst1; 
}
}
  
try { 
    Fields["Notat - NavigatorTree"].select("Spaltelampe");
    Fields['Notat - Fritekst'].input(spaltelampe);
  } catch (e) {
   Dialog.warn("Advarsel", "Spaltelampe ikke fundet"); }  
    
/**************************/
/*** Konklusion og plan ***/
/**************************/
var konklusion;
if (kontrol.Visit === visittype[0] || kontrol.Visit === visittype[2])
{konklusion = "Ugekontrol her i ambulatoriet.";}
if (kontrol.Visit === visittype[1] || kontrol.Visit === visittype[3])
{konklusion = "6 ugers kontrol hos egen øjenlæge.<newline>12 ugers kontrol her i ambulatoriet.";}

try { 
    Fields["Notat - NavigatorTree"].select("Konklusion og plan");
    Fields['Notat - Fritekst'].input("Pæne postoperative forhold.<newline>Pt. følger sit dryppeskema.<newline>" + konklusion);
  } catch (e) {
  Dialog.warn("Advarsel", "'Konklusion og plan' kan ikke opdateres."); }
    
/******************/
/*** Procedurer ***/
/******************/
try {
var ProcedureCode = "ZZ7049";
    Fields['Notat - NavigatorTree'].select("Procedurer");
    Fields['Notat - Find Koder - Kodetype Kopier'].select("Procedurer");
    Fields['Notat - Find Koder - Text'].input(ProcedureCode);
    Fields['Notat - Find Koder - Søg'].click();
    Fields['Notat - Find Koder - Resultat'].select(ProcedureCode);
    Fields['Notat - Find Koder - Date'].focus();
    Fields['Notat - Find Koder - Date'].inputNative(d + m + y);
//    Fields["Notat - Kalender knap"].click();
//    Wait.forField(Fields["Notat - Kalender måned"],4);
//    Fields['OK button'].click();
    Fields['Notat - Find Koder - Time'].focus();
    Fields['Notat - Find Koder - Time'].inputNative(h + i);
    Fields['Notat - Find Koder - Tilføj'].click();
} catch (e) {
   Dialog.warn("Advarsel", "Procedurer kan ikke opdateres");
  }
 
/*******************/
/*** Skal sendes ***/
/*******************/
 try {
    Fields['Notat - NavigatorTree'].select("Skal sendes");
    Fields['Notat - Fast værdi'].select("Ja");
  } catch (e) {
    Dialog.warn("Advarsel", "'Skal sendes' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  }  
  
/*******************************/
/*** Entry on dictation list ***/
/*******************************/
if (kontrol.Diktat === nj[1])
{    
Settings.CommandRetries = 20;   
 try {
Fields["Menu - Journal"].click();
Fields["Menu - Digital diktering"].click();
Fields["Digital diktering - Opret nyt diktat fra fil"].click();
Fields["Notat - File name2"].input("L:\\AfdE\\Fælles\\Genveje - ej slet JV\\Manatee\\Lyd.wav");
//Fields["Notat - File name2"].input("%userprofile%/AppData/Local/Manatee/Lyd.wav");
Wait.forSeconds(1);
Fields["Digital diktering - vedhæft diktat"].click();
Wait.forField(Fields["Digital diktering - Kommentar"], 30);
if (kontrol.Besked === undefined || kontrol.Besked === "")
{
Fields["Digital diktering - Kommentar"].input("EXC kontrol");
}
else
{
Fields["Digital diktering - Kommentar"].input("EXC kontrol - " + kontrol.Besked);
}
Fields["Digital diktering - Kategori"].select("Ambulant notat");
//Fields["Digital diktering - prioritet1"].click();
Fields["Digital diktering - Gem og afslut"].click();
Fields["JournalCPRinput"].simulateClick();  //** Makes drop-down in Cosmic menu disappear **
  } catch (e) {
    Dialog.warn("Advarsel", "'Diktat til sekretær med besked' kan ikke oprettes.", { 'timeout': 5 }); 
  }
Settings.CommandRetries = StdRetry;
}
  
  /*****************************/
  /*** Slut nøgleord         ***/
  /*****************************/
 Fields['Notat - NavigatorTree'].select("Konklusion og plan");
 
/***********************/
/*** Preview         ***/
/***********************/
Fields['Notat - Preview'].click();
  
  } catch (e) {
// *** Catch User cancel  
}
