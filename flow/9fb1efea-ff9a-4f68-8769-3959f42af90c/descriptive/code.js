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

  var tensiont =  ["Appl.", "Icare"];
  var oculus = ["o. dx.", "o. sin."];
//  var oct = ["Nej", "o.dx.", "o.sin.", "o.u."];
  var spaltelampe = ["Intet til minimalt kornealt ødem", "Let til moderat kornealt ødem"];
  var konklusion = ["Kontrol hos egen øjenlæge om 1 uge.\nFortsætter i øjenafdelingen som planlagt.", "Afsluttes til kontrol hos egen øjenlæge om 1 uge.", "Torisk linse implanteret.\nKontrol i øjenambulatoriet om 1 uge."];
  
  try {
    var katkontrol = Dialog.input(
      "Katarakt kontrol", "Til brug efter ukompliceret operation.\nHvis der er tale om en operation med komplikationer og ekstraordinære\npostoperative tiltag, så lav et diktat i stedet for.",{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
        "Eye": { "type": "RADIO", "prompt": "Øje:", "selectBetween": oculus, 'validation': {'isRequired': true, 'message': "Vælg øje"}},
        "Visus": { "type": "TEXT", "prompt": "Visus:", "suffix": "Snellen (HB, 1/60 og lign. noteres i refraktionsfeltet.)", 'validation': { 'regex': '^([01][.,](\\d{1,3}))?$', 'message': 'Fx 0,8' }},
        "Refrak": { "type": "TEXT", "prompt": "Refraktion:", 'validation': {'isRequired': true, 'message': "Angiv refraktion"}},                      
        "Tension": {"type": "MULTITEXT", "prompt": "Tension:", "texts": [{"name": "tens", "suffix": 'mmHg', "validation": {"regex": '^(\\d{1,2})$'}}]}, 
        "TensionType": { "type": "RADIO", "prompt": " ", "value": tensiont[0], "selectBetween": tensiont},
        "Spaltelampe": { "type": "RADIO", "prompt": "Spaltelampe:", "value": spaltelampe[0], "selectBetween": spaltelampe},
        "Konklusion": { "type": "RADIO", "prompt": "Konklusion:", "selectBetween": konklusion, 'validation': {'isRequired': true, 'message': "Vælg konklusion"}}
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
 try {
    Fields['Notat - NavigatorTree'].select("Anamnese");
    Fields['Notat - Fritekst'].input("Kontrol efter ukompliceret kataraktoperation "+katkontrol.Eye+" Få eller ingen gener. Velbefindende.");
  } catch (e) {
    Dialog.warn("Advarsel", "'Anamnese' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  }

  /**** Select Objektiv Undersøgelse Øjenundersøgelse ***/  
  Fields["Notat - NavigatorTree"].select("Objektiv undersøgelse");
  Fields["Notat - Fast værdi arrow"].click();
  Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
  
  //** Select Behandlingsplan included in order for the template to expand "Objectiv undersøgelse"
  Fields["Notat - NavigatorTree"].select("Behandlingsplan");
  
  Fields["Notat - NavigatorTree"].select("Visus "+katkontrol.Eye);
  try {
  if (katkontrol.Visus !== undefined && katkontrol.Visus !== "") {Fields["Notat - Numerisk værdi"].input(katkontrol.Visus);}
  Fields["Notat - Fritekst"].input(katkontrol.Refrak);
  } catch (e) {
    Dialog.warn("Advarsel", "Fritekst i Visus o. dx./o. sin. ikke fundet"); }
 
    /***Tension***/ 
  Fields["Notat - NavigatorTree"].select("Tension "+katkontrol.Eye);
  try {
  Fields["Notat - Numerisk værdi"].input(katkontrol.Tension.tens);
  Fields["Notat - Fritekst"].input(katkontrol.TensionType);
  } catch (e) {
   Dialog.warn("Advarsel", "Tension ikke fundet"); }  

   /***Spaltelampe***/ 
try { 
    Fields["Notat - NavigatorTree"].select("Spaltelampe");
    if (katkontrol.Spaltelampe === spaltelampe[0]){
    Fields['Notat - Fritekst'].input(katkontrol.Eye + ": Tilladelig postoperativ reaktion med intet til minimalt kornealt ødem. Pseudophakos skønnes på plads.");
    }
    if (katkontrol.Spaltelampe === spaltelampe[1]){
    Fields['Notat - Fritekst'].input(katkontrol.Eye + ": Tilladelig postoperativ reaktion med let til moderat kornealt ødem og folder i MD. Pseudophakos skønnes på plads.");
    }
  } catch (e) {
   Dialog.warn("Advarsel", "Spaltelampe ikke fundet"); }  
    
/**************************/
/*** Konklusion og plan ***/
/**************************/
  var konkl2;
  try {
    Fields['Notat - NavigatorTree'].select("Konklusion og plan");
    if (katkontrol.Konklusion === konklusion[0]){konkl2 = "Kontrol hos egen øjenlæge om 1 uge.<newline>Fortsætter i øjenafdelingen som planlagt.";}
    if (katkontrol.Konklusion === konklusion[1]){konkl2 = "Afsluttes til kontrol hos egen øjenlæge om 1 uge.";}
    if (katkontrol.Konklusion === konklusion[2]){konkl2 = "Torisk linse implanteret.<newline>Kontrol i øjenambulatoriet om 1 uge.";}
    Fields['Notat - Konklusion og plan - Text'].input("Efterbehandling: Maxidex x 3 " + katkontrol.Eye + " i 3 uger.<newline><newline>"+konkl2);
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
