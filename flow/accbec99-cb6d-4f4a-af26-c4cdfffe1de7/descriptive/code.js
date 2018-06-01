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
//Flow.run('Detect clinician', {} );
// Debug.showDialog("Personnel details; name = "+clinician.name+", title = "+clinician.title+", username = "+clinician.username+", initials = "+clinician.initials);

var nj = ["Nej", "Ja"];
var diktatjn = ["Ja", "Nej - jeg dikterer selv."];
  var visittype =  ["1. Assistance på H",
                    "Assistance på H",
                    "1. ambulante besøg i E-amb.",
                    "Ambulant besøg i E-amb."];
  
  try {
    var ROP = Dialog.input(
      "Screening for ROP", "",{maxDialogWidth: 350, buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
        "Visit": { "type": "RADIO", "prompt": "Besøgstype:", "selectBetween": visittype, 'validation': {'isRequired': true, 'message': "Vælg besøgstype"}},
        "Birth": { "type": "MULTITEXT", "prompt": "Fødsel:", "texts": [{"name": "week", "prefix": 'Uge:'}, {"name": "weight", "prefix": 'Vægt:', "suffix": 'gram'}], "dependsOn": "Visit=1. Assistance på H"},
        "Weeknow": { "type": "MULTITEXT", "prompt": "Uge nu:", "texts": [{"name": "now"}]},
        "Lastvisit": { "type": "RADIO", "prompt": "Afsluttes:", "selectBetween": nj, "value": nj[0], 'validation': {'isRequired': true, 'message': "Sidste besøg?"}},  
        "Booking": {"type": "MULTITEXT", "prompt": "Næste kontrol:", "texts": [{"name": "date", "suffix": "uge(r)"}], "dependsOn": "Lastvisit=Nej"},
      "divider1": { 'type': 'DIVIDER'},
      "Diktat": { "type": "RADIO", "prompt": "Tomt diktat:", "value": diktatjn[0], "selectBetween": diktatjn},
      "Besked": { "type": "TEXT", "prompt": "Evt. besked til sekretær:", "dependsOn": "Diktat=Ja"}             
                             });
    
 /**************************/
 /*** Set type of note   ***/
 /**************************/
Settings.CommandRetries = 5;
var skabelontype;
if (ROP.Visit === visittype[0] || ROP.Visit === visittype[1])
  {
  skabelontype = "Assistance";
  }
  else
  {
  skabelontype = "Ambulant klinisk kontakt";
  }  
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
var anamnese1;
if (ROP.Visit === visittype[0])
  {
  anamnese1 = "Henvist mhp. rutinemæssigt ROP-tilsyn.<newline>Er født i uge " + ROP.Birth.week + " med en fødselsvægt på " + ROP.Birth.weight + " gram.";
  }  
if (ROP.Visit === visittype[1])
  {
  anamnese1 = "ROP-tilsyn afd. H.";  
  }  
if (ROP.Visit === visittype[2] || ROP.Visit === visittype[3])
  {
  anamnese1 = "Ambulant ROP-undersøgelse.";  
  }  
    
  try {
    Fields['Notat - NavigatorTree'].select("Anamnese");
    Fields['Notat - Fritekst'].input(anamnese1 + "<newline>Er aktuelt i uge " + ROP.Weeknow.now + ".");
  } catch (e) {
    Dialog.warn("Advarsel", "'Anamnese' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  }

  /**** Select Objektiv Undersøgelse Øjenundersøgelse ***/  
  Fields["Notat - NavigatorTree"].select("Objektiv undersøgelse");
  Fields["Notat - Fast værdi arrow"].click();
  Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
  
  //** Select Anamnese in order for the template to expand "Objectiv undersøgelse"
  Fields["Notat - NavigatorTree"].select("Anamnese");

/***Pupiller***/ 
try { 
    Fields["Notat - NavigatorTree"].select("Pupiller");
    Fields['Notat - Fritekst'].input("Veldilaterede.");
  } catch (e) {
   Dialog.warn("Advarsel", "Pupiller ikke fundet"); }  
  
/***Spaltelampe***/ 
try { 
    Fields["Notat - NavigatorTree"].select("Spaltelampe");
    Fields['Notat - Fritekst'].input("Klare medier.");
  } catch (e) {
   Dialog.warn("Advarsel", "Spaltelampe ikke fundet"); }  
  
/***Oftalmoskopi***/ 
var retina;
try { 
    Fields["Notat - NavigatorTree"].select("Oftalmoskopi");
if (ROP.Lastvisit === "Ja")
{
retina = "velvaskulariserede";
}
  else
{
retina = "umodne";
}  
Fields['Notat - Fritekst'].input("o.u. med Richardsons linse:  Klart indblik til alderssvarende synsnerver og pæne, slanke kar, der kan følges ud perifert. Der ses " + retina + " nethinder. Ingen ROP-forandringer. ");
} catch (e) {
   Dialog.warn("Advarsel", "Oftalmoskopi ikke fundet"); }  
    
/**************************/
/*** Konklusion og plan ***/
/**************************/
  var konkl;
  try {
    Fields['Notat - NavigatorTree'].select("Konklusion og plan");
    if (ROP.Lastvisit === nj[0]){konkl = "Alderssvarende øjenundersøgelse. Ingen ROP-forandringer.<newline>Skal bookes igen i tilsynsmodul 3 om ca. " + ROP.Booking.date + " uge(r).";}
    else
    {
    konkl = "Afsluttes. Anbefaler kontrol ved praktiserende øjenlæge omkring 3 års alderen, da for tidligt fødte børn har større tendens til skelen eller brillebehov.";
    }
    Fields['Notat - Konklusion og plan - Text'].input(konkl);
  } catch (e) {
  Dialog.warn("Advarsel", "'Konklusion og plan' kan ikke opdateres."); }

/*******************/
/*** Diagnoser   ***/
/*******************/
if (skabelontype === "Ambulant klinisk kontakt" && ROP.Visit === visittype[2])
{
var Diagnose1 = "DZ038"; 
var Diagnose1add1 = "DH351"; 
try {  
Fields['Notat - NavigatorTree'].select("Diagnoser");
Fields['Notat - Find Koder - Kodetype'].select("Diagnoser");
Fields['Notat - Find Koder - Text'].input(Diagnose1);
Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select(Diagnose1);
Fields['Notat - Find Koder - Tilføj'].click();

/*** Set 'Tillægskoder' ***/
Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(Diagnose1, 0, 0);
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
Fields['Notat - Find Koder - Text'].input(Diagnose1add1);  
Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select(Diagnose1add1);
Fields['Notat - Find Koder - Tilføj'].click();
}
catch (e) {
   Dialog.warn("Advarsel", "Diagnoser kan ikke opdateres");
  }
}
    
/******************/
/*** Procedurer ***/
/******************/
if (skabelontype === "Ambulant klinisk kontakt")
{  
var ProcedureCode = "ZZ7049";
try {
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
} 
    
/*******************/
/*** Skal sendes ***/
/*******************/
if (skabelontype === "Ambulant klinisk kontakt")
{ 
    try {
    Fields['Notat - NavigatorTree'].select("Skal sendes");
    Fields['Notat - Fast værdi'].select("Ja");
  } catch (e) {
    Dialog.warn("Advarsel", "'Skal sendes' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  }
}   

/*******************************/
/*** Entry on dictation list ***/
/*******************************/
if (ROP.Diktat === diktatjn[0])
{    
Settings.CommandRetries = 20;   
 try {
Fields["Menu - Journal"].click();
Fields["Menu - Digital diktering"].click();
// ** Ver 1. ****
//Fields["Digital diktering - Opret nyt diktat"].click();
//Fields["Digital diktering - record start"].click();
//Wait.forSeconds(1);
//Fields["Digital diktering - record stop"].click();
// ** Ver 1. end ****
// ** Ver 2. ****
Fields["Digital diktering - Opret nyt diktat fra fil"].click();
Fields["Notat - File name2"].input("L:\\AfdE\\Fælles\\Genveje - ej slet JV\\Manatee\\Lyd.wav");
//Fields["Notat - File name2"].input("%userprofile%/AppData/Local/Manatee/Lyd.wav");
Wait.forSeconds(1);
Fields["Digital diktering - vedhæft diktat"].click();
Wait.forField(Fields["Digital diktering - Kommentar"], 30);
//** Ver 2. end ****  
if (ROP.Besked === undefined || ROP.Besked === "")
{
Fields["Digital diktering - Kommentar"].input("ROP");
}
else
{
Fields["Digital diktering - Kommentar"].input("ROP - " + ROP.Besked);
}
if (ROP.Visit === visittype[0] || ROP.Visit === visittype[1])
{     
Fields["Digital diktering - Kategori"].select("Assistance");
}
if (ROP.Visit === visittype[2] || ROP.Visit === visittype[3])
{     
Fields["Digital diktering - Kategori"].select("Ambulant notat");
}
//Fields["Digital diktering - prioritet1"].click();
Fields["Digital diktering - Gem og afslut"].click();
Fields["JournalCPRinput"].simulateClick();  //** Makes drop-down in Cosmic menu disappear **
  } catch (e) {
    Dialog.warn("Advarsel", "'Diktat til sekretær med besked' kan ikke oprettes.", { 'timeout': 5 }); 
  }
Settings.CommandRetries = StdRetry;
}
    
/*********************/
/*** Slut nøgleord ***/
/*********************/
 Fields['Notat - NavigatorTree'].select("Konklusion og plan");
    
/***********************/
/*** Preview         ***/
/***********************/
Fields['Notat - Preview'].click();
    
  } catch (e) {
// *** Catch User cancel  
}
