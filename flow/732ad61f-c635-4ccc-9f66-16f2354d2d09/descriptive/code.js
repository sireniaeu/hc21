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
var titleabbr;
if (clinician.title === "Sygeplejerske") {titleabbr = "sgpl.";}
if (clinician.title === "Social- og Sundhedsassistent") {titleabbr = "ssa";}
if (clinician.title === "Fotograf") {titleabbr = "fot.";}
if (clinician.title === "Optiker") {titleabbr = "opt.";}
if (clinician.title === "Overlæge") {titleabbr = "ovl.";}
if (clinician.title === "Reservelæge") {titleabbr = "res.læge";}
if (clinician.title === "1. Reservelæge") {titleabbr = "1.res.læge";}
if (clinician.title === "Afdelingslæge") {titleabbr = "afd.læge";}

  var primaerjournal = 0;
  var oct = ["Nej", "o.dx.", "o.sin.", "o.u."];
  var flu = ["Nej", "o.dx.", "o.sin."];
  
  try {
    var fotous = Dialog.input(
      "Fotoundersøgelse", "Angiv valg", {maxDialogHeight: 600, buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
        "TopconOCT": { "type": "RADIO", "prompt": "Topcon OCT:", "value": oct[0], "selectBetween": oct},
        "TopconPapilOCT": { "type": "RADIO", "prompt": "Topcon papil OCT:", "value": oct[0], "selectBetween": oct},
        "HeidelbergOCT": { "type": "RADIO", "prompt": "Heidelberg OCT:", "value": oct[0], "selectBetween": oct},
        "HeidelbergPapilOCT": { "type": "RADIO", "prompt": "Heidelberg papil OCT:", "value": oct[0], "selectBetween": oct},
        'CRT': { 'type': 'MULTITEXT','prompt': 'CRT:','texts': [
            { 'name': 'CRTd', 'prefix': 'O.dx', 'suffix': 'my   '},
            { 'name': 'CRTs', 'prefix': 'O.sin', 'suffix': 'my   '}]},
        'MHbase': { 'type': 'MULTITEXT','prompt': 'Makulært hul - base:','texts': [
            { 'name': 'MHbased', 'prefix': 'O.dx', 'suffix': 'my   '},
            { 'name': 'MHbases', 'prefix': 'O.sin', 'suffix': 'my   '}]},
        'MHmin': { 'type': 'MULTITEXT','prompt': 'Makulært hul - min.:','texts': [
            { 'name': 'MHmind', 'prefix': 'O.dx', 'suffix': 'my   '},
            { 'name': 'MHmins', 'prefix': 'O.sin', 'suffix': 'my   '}]},
        'divider1': { 'type': 'DIVIDER'},
        "OptosFoto": { "type": "RADIO", "prompt": "Optos foto:", "value": oct[0], "selectBetween": oct},
        "TopconFoto": { "type": "RADIO", "prompt": "Topcon foto:", "value": oct[0], "selectBetween": oct},
        "TopconMosaik": { "type": "RADIO", "prompt": "Topcon mosaik:", "value": oct[0], "selectBetween": oct},
        "TopconPapil": { "type": "RADIO", "prompt": "Topcon papilfoto:", "value": oct[0], "selectBetween": oct},
        "Spaltefoto": { "type": "RADIO", "prompt": "Spaltelampefoto:", "value": oct[0], "selectBetween": oct},
        'divider2': { 'type': 'DIVIDER'},
        "Topconflu": { "type": "RADIO", "prompt": "Topcon flu.", "value": flu[0], "selectBetween": flu},
        "Optosflu": { "type": "RADIO", "prompt": "Optos flu.:", "value": flu[0], "selectBetween": flu},
        "Heidelbergfluicg": { "type": "RADIO", "prompt": "Heidelberg flu. + ICG:", "value": flu[0], "selectBetween": flu},
        "Heidelbergflu": { "type": "RADIO", "prompt": "Heidelberg flu.:", "value": flu[0], "selectBetween": flu}
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
              //** Empty af hensyn til overtaget notat. Mulig svaghed i Fields["Notat - Skabelon for Read"].read(); ved overtaget notat
               if (ExistingSkabelon === "Primærjournal - somatik")
                {
                primaerjournal = 1;
                }
              } 
        }
    }
  } catch (e) {
    Dialog.warn('Advarsel', 'Skabelon kan ikke vælges.', { 'timeout': 5 });
  }

 Settings.CommandRetries = StdRetry;
      
  /*************************************************/
  /*** Udarbejdet af - ambulant klinisk kontakt  ***/
  /*************************************************/
// if (primaerjournal !== 1)
// {
//  try {
//    Fields['Notat - NavigatorTree'].select("Udarbejdet af");
//    var ExistingUdarbejdet = Fields["Notat - Fritekst"].read();
//    var ExistingUdarbejdettrim = ExistingUdarbejdet.trim();
//    if (ExistingUdarbejdet.indexOf(clinician.name) >= 0) {
      // Clinician was found in string
//    }else{
//   if (ExistingUdarbejdettrim !== ""){var spacer = "; ";} else {spacer = "";}  
//    Fields["Notat - Fritekst"].input(ExistingUdarbejdet+spacer+clinician.name+", "+clinician.title);
//}
//  } catch (e) {
//    Dialog.warn("Advarsel", "Udarbejdet af ikke fundet"); 
//  }
// }
   
  if (primaerjournal !== 1)
 {
  /**** Select Objektiv Undersøgelse Øjenundersøgelse ***/  
  Fields["Notat - NavigatorTree"].select("Objektiv undersøgelse");
  Fields["Notat - Fast værdi arrow"].click();
  Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
 }
   if (primaerjournal === 1)
 {
  /**** Select Objektiv Undersøgelse Øjenundersøgelse ***/  
  Fields["Notat - NavigatorTree"].select("Specialespecifik objektiv undersøgelse");
  Fields["Notat - Fast værdi arrow"].click();
  Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
 }   
 
 //** Select 'Anamnese' in order for the template to expand "Objectiv undersøgelse"
 Fields['Notat - NavigatorTree'].select("Anamnese");
    
  /***Foveal OCT***/ 
  if (fotous.CRT.CRTd !== undefined)
  {  
  Fields["Notat - NavigatorTree"].select("Foveal OCT o. dx.");
  try {
  Fields["Notat - Numerisk værdi"].input(fotous.CRT.CRTd);
  } catch (e) {
   Dialog.warn("Advarsel", "Foveal OCT o. dx. ikke fundet"); }
  }
    
  if (fotous.CRT.CRTs !== undefined)
  {  
    Fields["Notat - NavigatorTree"].select("Foveal OCT o. sin.");
  try {
  Fields["Notat - Numerisk værdi"].input(fotous.CRT.CRTs);
  } catch (e) {
   Dialog.warn("Advarsel", "Foveal OCT o. sin. ikke fundet"); }
  }

  /***Macula hul***/ 
  if (fotous.MHbase.MHbased !== undefined)
  {  
  Fields["Notat - NavigatorTree"].select("Maculahul o. dx. - base diameter");
  try {
  Fields["Notat - Numerisk værdi"].input(fotous.MHbase.MHbased);
  } catch (e) {
   Dialog.warn("Advarsel", "Maculahul o. dx. - base diameter ikke fundet"); }
  }
    
  if (fotous.MHbase.MHbases !== undefined)
  {  
  Fields["Notat - NavigatorTree"].select("Maculahul o. sin. - base diameter");
  try {
  Fields["Notat - Numerisk værdi"].input(fotous.MHbase.MHbases);
  } catch (e) {
   Dialog.warn("Advarsel", "Maculahul o. sin. - base diameter ikke fundet"); }
  }

  if (fotous.MHmin.MHmind !== undefined)
  {  
  Fields["Notat - NavigatorTree"].select("Maculahul o. dx. - minimum diameter");
  try {
  Fields["Notat - Numerisk værdi"].input(fotous.MHmin.MHmind);
  } catch (e) {
   Dialog.warn("Advarsel", "Maculahul o. dx. - minimum diameter ikke fundet"); }
  }
    
  if (fotous.MHmin.MHmins !== undefined)
  {  
  Fields["Notat - NavigatorTree"].select("Maculahul o. sin. - minimum diameter");
  try {
  Fields["Notat - Numerisk værdi"].input(fotous.MHmin.MHmins);
  } catch (e) {
   Dialog.warn("Advarsel", "Maculahul o. sin. - minimum diameter ikke fundet"); }
  }
    
/***Foto***/ 
var oct1;
var oct2;    
var oct3;    
var oct4;    
var octkode0;
var octkode1;
var octkode2;
var fundus1;
var fundus2;
var fundus3;
var fundus4;
var funduskode0;
var funduskode1;
var funduskode2;
var flu1;
var flu2;
var flu3;
var flu4;
var flukode0;
var flukode1;
var spaltfoto;
var spaltkode;
if (fotous.TopconOCT === oct[0]) {oct1=""; octkode0 ="0";}    
if (fotous.TopconOCT === oct[1]) {oct1="<newline>Topcon OCT o.dx."; octkode1 ="1";}    
if (fotous.TopconOCT === oct[2]) {oct1="<newline>Topcon OCT o.sin."; octkode1 ="1";}    
if (fotous.TopconOCT === oct[3]) {oct1="<newline>Topcon OCT o.u."; octkode2 ="2";}    
if (fotous.TopconPapilOCT === oct[0]) {oct2=""; octkode0 ="0";}    
if (fotous.TopconPapilOCT === oct[1]) {oct2="<newline>Topcon Papil OCT o.dx."; octkode1 ="1";}    
if (fotous.TopconPapilOCT === oct[2]) {oct2="<newline>Topcon Papil OCT o.sin."; octkode1 ="1";}    
if (fotous.TopconPapilOCT === oct[3]) {oct2="<newline>Topcon Papil OCT o.u."; octkode2 ="2";}    
if (fotous.HeidelbergOCT === oct[0]) {oct3=""; octkode0 ="0";}    
if (fotous.HeidelbergOCT === oct[1]) {oct3="<newline>Heidelberg OCT o.dx."; octkode1 ="1";}    
if (fotous.HeidelbergOCT === oct[2]) {oct3="<newline>Heidelberg OCT o.sin."; octkode1 ="1";}    
if (fotous.HeidelbergOCT === oct[3]) {oct3="<newline>Heidelberg OCT o.u."; octkode2 ="2";}    
if (fotous.HeidelbergPapilOCT === oct[0]) {oct4=""; octkode0 ="0";}    
if (fotous.HeidelbergPapilOCT === oct[1]) {oct4="<newline>Heidelberg Papil OCT o.dx."; octkode1 ="1";}    
if (fotous.HeidelbergPapilOCT === oct[2]) {oct4="<newline>Heidelberg Papil OCT o.sin."; octkode1 ="1";}    
if (fotous.HeidelbergPapilOCT === oct[3]) {oct4="<newline>Heidelberg Papil OCT o.u."; octkode2 ="2";}    
if (fotous.OptosFoto === oct[0]) {fundus1=""; funduskode0 ="0";}    
if (fotous.OptosFoto === oct[1]) {fundus1="<newline>Optos foto o.dx."; funduskode1 ="1";}    
if (fotous.OptosFoto === oct[2]) {fundus1="<newline>Optos foto o.sin."; funduskode1 ="1";}    
if (fotous.OptosFoto === oct[3]) {fundus1="<newline>Optos foto o.u."; funduskode2 ="2";}    
if (fotous.TopconFoto === oct[0]) {fundus2=""; funduskode0 ="0";}    
if (fotous.TopconFoto === oct[1]) {fundus2="<newline>Topcon foto o.dx."; funduskode1 ="1";}    
if (fotous.TopconFoto === oct[2]) {fundus2="<newline>Topcon foto o.sin."; funduskode1 ="1";}    
if (fotous.TopconFoto === oct[3]) {fundus2="<newline>Topcon foto o.u."; funduskode2 ="2";}    
if (fotous.TopconMosaik === oct[0]) {fundus3=""; funduskode0 ="0";}    
if (fotous.TopconMosaik === oct[1]) {fundus3="<newline>Topcon mosaik o.dx."; funduskode1 ="1";}    
if (fotous.TopconMosaik === oct[2]) {fundus3="<newline>Topcon mosaik o.sin."; funduskode1 ="1";}    
if (fotous.TopconMosaik === oct[3]) {fundus3="<newline>Topcon mosaik o.u."; funduskode2 ="2";}    
if (fotous.TopconPapil === oct[0]) {fundus4=""; funduskode0 ="0";}    
if (fotous.TopconPapil === oct[1]) {fundus4="<newline>Topcon papilfoto o.dx."; funduskode1 ="1";}    
if (fotous.TopconPapil === oct[2]) {fundus4="<newline>Topcon papilfoto o.sin."; funduskode1 ="1";}    
if (fotous.TopconPapil === oct[3]) {fundus4="<newline>Topcon papilfoto o.u."; funduskode2 ="2";}    
if (fotous.Topconflu === flu[0]) {flu1=""; flukode0 ="0";}    
if (fotous.Topconflu === flu[1]) {flu1="<newline>Topcon flu. o.dx."; flukode1 ="1";}    
if (fotous.Topconflu === flu[2]) {flu1="<newline>Topcon flu. o.sin."; flukode1 ="2";}    
if (fotous.Optosflu === flu[0]) {flu2=""; flukode0 ="0";}    
if (fotous.Optosflu === flu[1]) {flu2="<newline>Optos flu. o.dx."; flukode1 ="1";}    
if (fotous.Optosflu === flu[2]) {flu2="<newline>Optos flu. o.sin."; flukode1 ="2";}    
if (fotous.Heidelbergfluicg === flu[0]) {flu3=""; flukode0 ="0";}    
if (fotous.Heidelbergfluicg === flu[1]) {flu3="<newline>Heidelberg flu. + ICG o.dx."; flukode1 ="3";}    
if (fotous.Heidelbergfluicg === flu[2]) {flu3="<newline>Heidelberg flu. + ICG o.sin."; flukode1 ="4";}    
if (fotous.Heidelbergflu === flu[0]) {flu4=""; flukode0 ="0";}    
if (fotous.Heidelbergflu === flu[1]) {flu4="<newline>Heidelberg flu. o.dx."; flukode1 ="1";}    
if (fotous.Heidelbergflu === flu[2]) {flu4="<newline>Heidelberg flu. o.sin."; flukode1 ="2";}    
if (fotous.Spaltefoto === oct[0]) {spaltfoto=""; spaltkode ="0";}    
if (fotous.Spaltefoto === oct[1]) {spaltfoto="<newline>Spaltelampefoto foto o.dx."; spaltkode ="1";}    
if (fotous.Spaltefoto === oct[2]) {spaltfoto="<newline>Spaltelampefoto foto o.sin."; spaltkode ="1";}    
if (fotous.Spaltefoto === oct[3]) {spaltfoto="<newline>Spaltelampefoto foto o.u."; spaltkode ="2";}    
var foto = oct1+oct2+oct3+oct4+fundus1+fundus2+fundus3+fundus4+flu1+flu2+flu3+flu4+spaltfoto;
if (foto !== "")
  {  
  try {
  Fields['Notat - NavigatorTree'].select("Foto");
  var ExistingFoto = Fields["Notat - Fritekst"].read();
//  Fields["Notat - Fritekst"].input(ExistingFoto+foto+" /" + clinician.initials + " (kl. " + h + ":" + i + ")");
  Fields["Notat - Fritekst"].input(ExistingFoto+foto+" /" + clinician.name + ", " + titleabbr + " (kl. " + h + ":" + i + ")");
  } catch (e) {
   Dialog.warn("Advarsel", "Foto ikke fundet"); }
  }
    
/******************/
/*** Procedurer ***/
/******************/
Fields['Notat - NavigatorTree'].select("Procedurer");
Wait.forField(Fields['Notat - Find Koder - Kodetype Kopier'], 10);    
var ProcedureCode;
try {
if (octkode2 === "2" || octkode1 === "1") {    
    ProcedureCode = "ZZ7035";
    Fields['Notat - NavigatorTree'].select("Procedurer");
    Fields['Notat - Find Koder - Kodetype Kopier'].select(".*Procedurer.*");
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
if (octkode2 === "2") {Fields['Notat - Find Koder - Tilføj'].click();}
}
if (octkode2 === "2" || octkode1 === "1" || funduskode2 === "2" || funduskode1 === "1") {    
    ProcedureCode = "ZZ7010";
    Fields['Notat - NavigatorTree'].select("Procedurer");
    Fields['Notat - Find Koder - Kodetype Kopier'].select(".*Procedurer.*");
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
if (octkode2 === "2" || funduskode2 === "2") {Fields['Notat - Find Koder - Tilføj'].click();}
}
if (spaltkode === "1" || spaltkode === "2") {    
    ProcedureCode = "ZZ7015";
    Fields['Notat - NavigatorTree'].select("Procedurer");
    Fields['Notat - Find Koder - Kodetype Kopier'].select(".*Procedurer.*");
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
if (spaltkode === "2") {Fields['Notat - Find Koder - Tilføj'].click();}
}
var tul = ["TUL1", "TUL2"];
if (flukode1 === "1" || flukode1 === "2" || flukode1 === "3" || flukode1 === "4") {    
    ProcedureCode = "UCXF1";
    if (flukode1 === "1" || flukode1 === "3"){tul = tul[0];}    
    if (flukode1 === "2" || flukode1 === "4"){tul = tul[1];}    
    Fields['Notat - NavigatorTree'].select("Procedurer");
    Fields['Notat - Find Koder - Kodetype Kopier'].select(".*Procedurer.*");
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
    Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ProcedureCode, 0, 0);
    Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
    Fields['Notat - Find Koder - Text'].input(tul);  
    Fields['Notat - Find Koder - Søg'].click();
    Fields['Notat - Find Koder - Resultat'].select(tul);
    Fields['Notat - Find Koder - Tilføj'].click();
}
if (flukode1 === "3" || flukode1 === "4") {    
    ProcedureCode = "UCXF2";
    Fields['Notat - NavigatorTree'].select("Procedurer");
    Fields['Notat - Find Koder - Kodetype Kopier'].select(".*Procedurer.*");
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
    Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ProcedureCode, 0, 0);
    Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
    Fields['Notat - Find Koder - Text'].input(tul);  
    Fields['Notat - Find Koder - Søg'].click();
    Fields['Notat - Find Koder - Resultat'].select(tul);
    Fields['Notat - Find Koder - Tilføj'].click();
}
} catch (e) {
   Dialog.warn("Advarsel", "Procedurer kan ikke opdateres");
  }

  /*************************************************/
  /*** Udarbejdet af - primærjournal - somatik   ***/
  /*************************************************/
 //if (primaerjournal === 1)
 //{
 // try {
 //   Fields['Notat - NavigatorTree'].select("Udarbejdet af");
 //   var ExistingUdarbejdet = Fields["Notat - Fritekst"].read();
 //   var ExistingUdarbejdettrim = ExistingUdarbejdet.trim();
 //   if (ExistingUdarbejdet.indexOf(clinician.name) >= 0) {
      // Clinician was found in string
 //   }else{
 //  if (ExistingUdarbejdettrim !== ""){var spacer = "; ";} else {spacer = "";}  
 //   Fields["Notat - Fritekst"].input(ExistingUdarbejdet+spacer+clinician.name+", "+clinician.title);
//}
//  } catch (e) {
//    Dialog.warn("Advarsel", "Udarbejdet af ikke fundet"); 
//  }
// }
    
/*******************/
/*** Skal sendes ***/
/*******************/
 try {
   Fields['Notat - NavigatorTree'].select("Skal sendes");
   var ExistingSendes = Fields["Notat - Fast værdi TextArea"].read();
   if (ExistingSendes !== "Ja")
   {
   Fields['Notat - Fast værdi'].select("Nej");
   } 
  } catch (e) {
    Dialog.warn("Advarsel", "'Skal sendes' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  }    
  /*****************************/
  /*** Slut nøgleord         ***/
  /*****************************/
 Fields['Notat - NavigatorTree'].select("Foto");

/*****************************/
/*** Udført på besøgsliste ***/
/*****************************/

/***********************/
/*** Preview         ***/
/***********************/
Fields['Notat - Preview'].click();    
    
  } catch (e) {
// *** Catch User cancel ***//  
}