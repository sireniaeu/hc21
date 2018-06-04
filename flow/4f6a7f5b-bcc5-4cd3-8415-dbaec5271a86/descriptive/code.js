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

/*** Detect clinician ***/
//Flow.run('Detect clinician', {} );
// Debug.showDialog("Personnel details; name = "+clinician.name+", title = "+clinician.title+", username = "+clinician.username+", initials = "+clinician.initials);

var nj = ["Nej", "Ja"];
var diktatjn = ["Ja", "Nej - jeg dikterer selv."];
var oculus = ["o.dx.", "o.sin.", "o.u."];
var konklusion = ["Afsluttes til egen øjenlæge.", "Kontrol hos operatør.", "Kontrol i ambulatoriet."];
  
  try {
    var kontrol = Dialog.input(
      "Suturfjernelse", "",{maxDialogWidth: 350, buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
      "Eye": { "type": "RADIO", "prompt": "Øje:", "selectBetween": oculus, 'validation': {'isRequired': true, 'message': "Vælg øje"}},
      "Konklusion": { "type": "RADIO", "prompt": "Konklusion:", "selectBetween": konklusion, 'validation': {'isRequired': true, 'message': "Vælg konklusion"}},
      "Kirurg": { "type": "MULTITEXT", "prompt": "Hvornår?:",  'texts': [{'name': 'time1', 'value': "4", 'prefix': 'om ca.', 'suffix': 'uger.'}], "dependsOn": "Konklusion=Kontrol hos operatør."},
      "Amb": { "type": "MULTITEXT", "prompt": "Hvornår?:",  'texts': [{'name': 'time2', 'value': "4", 'prefix': 'om ca.', 'suffix': 'uger.'}], "dependsOn": "Konklusion=Kontrol i ambulatoriet."},
      "divider1": { 'type': 'DIVIDER'},
      "Diktat": { "type": "RADIO", "prompt": "Tomt diktat:", "value": diktatjn[0], "selectBetween": diktatjn},
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

/*******************/
/*** Anamnese    ***/
/*******************/
 try {
    Fields['Notat - NavigatorTree'].select("Anamnese");
    Fields['Notat - Fritekst'].input("Møder til suturfjernelse på øjenlåg "+kontrol.Eye+" Pt. er velbefindende.");
  } catch (e) {
    Dialog.warn("Advarsel", "'Anamnese' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  }
    
/**************************/
/*** Konklusion og plan ***/
/**************************/
var konkl2;    
if (kontrol.Konklusion === konklusion[0]){konkl2 = konklusion[0];}
if (kontrol.Konklusion === konklusion[1]){konkl2 = "Kontrol hos operatør om ca. " + kontrol.Kirurg.time1 + " uger.";}  
if (kontrol.Konklusion === konklusion[2]){konkl2 = "Kontrol i ambulatoriet om ca. " + kontrol.Amb.time2 + " uger.";}  
    try {
    Fields['Notat - NavigatorTree'].select("Konklusion og plan");
    Fields['Notat - Konklusion og plan - Text'].input(konkl2);
  } catch (e) {
  Dialog.warn("Advarsel", "'Konklusion og plan' kan ikke opdateres."); }
    
/******************/
/*** Procedurer ***/
/******************/
try {
var ProcedureCode = "BNPA80";
var ProcedureCode1add;
if (kontrol.Eye === oculus[0] || kontrol.Eye === oculus[2])
{ ProcedureCodeadd = "TUL1"; }
else  
{ ProcedureCodeadd = "TUL2"; }
    Fields['Notat - NavigatorTree'].select("Procedurer");
    Fields['Notat - Find Koder - Kodetype Kopier'].select("Procedurer");
    Fields['Notat - Find Koder - Text'].input(ProcedureCode);
    Fields['Notat - Find Koder - Søg'].click();
    Fields['Notat - Find Koder - Resultat'].select(ProcedureCode);
    Fields['Notat - Find Koder - Date'].focus();
    Fields['Notat - Find Koder - Date'].inputNative(d + m + y);
    Fields['Notat - Find Koder - Time'].focus();
    Fields['Notat - Find Koder - Time'].inputNative(h + i);
    Fields['Notat - Find Koder - Tilføj'].click();
    
/*** Set 'Tillægskoder' ***/
Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ProcedureCode, 0, 0);
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
Fields['Notat - Find Koder - Text'].input(ProcedureCodeadd);  
Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select(ProcedureCodeadd);
Fields['Notat - Find Koder - Tilføj'].click();
  
if (kontrol.Eye === oculus[2])
{
ProcedureCodeadd = "TUL2";   
    Fields['Notat - NavigatorTree'].select("Procedurer");
    Fields['Notat - Find Koder - Kodetype Kopier'].select("Procedurer");
    Fields['Notat - Find Koder - Text'].input(ProcedureCode);
    Fields['Notat - Find Koder - Søg'].click();
    Fields['Notat - Find Koder - Resultat'].select(ProcedureCode);
    Fields['Notat - Find Koder - Date'].focus();
    Fields['Notat - Find Koder - Date'].inputNative(d + m + y);
    Fields['Notat - Find Koder - Time'].focus();
    Fields['Notat - Find Koder - Time'].inputNative(h + i);
    Fields['Notat - Find Koder - Tilføj'].click();
    
/*** Set 'Tillægskoder' ***/
Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ProcedureCode, 1, 0);
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
Fields['Notat - Find Koder - Text'].input(ProcedureCodeadd);  
Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select(ProcedureCodeadd);
Fields['Notat - Find Koder - Tilføj'].click();
}
    
} catch (e) {
   Dialog.warn("Advarsel", "Procedurer kan ikke opdateres");
  }
 
/*******************/
/*** Skal sendes ***/
/*******************/
 try {
    Fields['Notat - NavigatorTree'].select("Skal sendes");
    Fields['Notat - Fast værdi'].select("Nej");
  } catch (e) {
    Dialog.warn("Advarsel", "'Skal sendes' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  }
  
/*******************************/
/*** Entry on dictation list ***/
/*******************************/
if (kontrol.Diktat === diktatjn[0])
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
Fields["Digital diktering - Kommentar"].input("Suturfjernelse");
}
else
{
Fields["Digital diktering - Kommentar"].input("Suturfjernelse - " + kontrol.Besked);
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
