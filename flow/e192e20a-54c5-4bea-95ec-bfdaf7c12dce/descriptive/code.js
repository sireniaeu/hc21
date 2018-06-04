var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

// Handy function for reading Nidek XML
function getValueObject(xpathExpr) {
  var tokens = xpathExpr.split('/');
  var rawResult = doc.xpath(xpathExpr);
  return tokens.length > 0 && rawResult && rawResult[0] ? rawResult[0][tokens[tokens.length - 1]]: null;
}

// Handy function to check for non-existing Nidek XML-tags (no measurement from Nidek)
function pickValue(valueObject, path) {
  var empty = 'E';
  if (!valueObject) {
    return empty;
  }
  var result = valueObject;
  for (var i = 0; i < path.length; i++) {
    result = result[path[i]];
    if (!result) return empty;
  }
  return result;
}

// Handy function for adding a plus if required
function addPlus (s) {
  if (s[0]!="-") return "+" + s;
  return s;
}

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

Flow.run('Detect clinician', {} );
// Debug.showDialog("Personnel details; name = "+clinician.name+", title = "+clinician.title+", username = "+clinician.username+", initials = "+clinician.initials);
var titleabbr;
if (clinician.title === "Sygeplejerske") {titleabbr = "sgpl.";}
if (clinician.title === "Social- og Sundhedsassistent") {titleabbr = "ssa";}
if (clinician.title === "Fotograf") {titleabbr = "fot.";}
if (clinician.title === "Optiker") {titleabbr = "opt.";}
if (clinician.title === "Overlæge") {titleabbr = "ovl.";}

//******** Dialog to ask for scanning of barcode **//
try {
var barcode = Dialog.input("Katarakt forundersøgelse", "Scan stregkode fra evt. brillemåling eller vælg 'Ingen brille'",{buttons: [{ 'value': 'Ingen brille', 'isCancel': true }], 'submitOnValidation': true,                          'Stregkode': {"type": "TEXT", "prompt": "Stregkode: ", "validation": {"regex": '^([E][Z][ ](\\d{6}))$'}}});

//** Extract machinenumber [1] and serialnumber [2]
var serial = barcode.Stregkode.match(/^.{3}([0-9]{2})([0-9]{4})/);

}
catch (e) {
//** Ingen brille
}

//** Look for Nidek examination
try {
var cprread = Fields['Patientlinje - CPR'].read();  
var cprmatch = cprread.match(/^([0-9]{6}).{1}(.{4})/);  
var cpr = cprmatch[1] + cprmatch[2];

// Load xml
var files = Fs.ls("\\\\10.75.65.50\\ar\\RKT_"+cpr+"_"+y+m+d+"*.xml");
  
if (files.length > 1) { Dialog.warn("For mange filer ...", "Kontakt Jesper (12787)"); }
if (files.length === 0) { Dialog.warn("Filen ikke fundet.", "Kontakt Jesper (12787)"); }  
if (files.length === 1)
{

var doc = Xml.loadFrom(files);
var combinedResult = {
  left: {
    arMedian: getValueObject('/Data/L/AR/ARMedian'),
    kmMedian: getValueObject('/Data/L/KM/KMMedian'),
    ntAverage: getValueObject('/Data/L/NT/NTAverage')
  },
  right: {
    arMedian: getValueObject('/Data/R/AR/ARMedian'),
    kmMedian: getValueObject('/Data/R/KM/KMMedian'),
    ntAverage: getValueObject('/Data/R/NT/NTAverage')
  }
};
}  
   
// -- R
var NidekARefRSph = addPlus(pickValue(combinedResult.right.arMedian, ['Sphere']));
var NidekARefRCyl = pickValue(combinedResult.right.arMedian, ['Cylinder']);
var NidekARefRAxis = pickValue(combinedResult.right.arMedian, ['Axis']);
var NidekARefRK1 = pickValue(combinedResult.right.kmMedian, ['R1', 'Radius']);  
var NidekARefRK1Axis = pickValue(combinedResult.right.kmMedian, ['R1', 'Axis']);  
var NidekARefRK2 = pickValue(combinedResult.right.kmMedian, ['R2', 'Radius']);  
var NidekARefRK2Axis = pickValue(combinedResult.right.kmMedian, ['R2', 'Axis']);  

// -- L
var NidekARefLSph = addPlus(pickValue(combinedResult.left.arMedian, ['Sphere']));
var NidekARefLCyl = pickValue(combinedResult.left.arMedian, ['Cylinder']);
var NidekARefLAxis = pickValue(combinedResult.left.arMedian, ['Axis']);
var NidekARefLK1 = pickValue(combinedResult.left.kmMedian, ['R1', 'Radius']);  
var NidekARefLK1Axis = pickValue(combinedResult.left.kmMedian, ['R1', 'Axis']);  
var NidekARefLK2 = pickValue(combinedResult.left.kmMedian, ['R2', 'Radius']);  
var NidekARefLK2Axis = pickValue(combinedResult.left.kmMedian, ['R2', 'Axis']);  
  
var NidekARefRStr = NidekARefRSph+" sf. "+NidekARefRCyl+" x "+NidekARefRAxis+"°";  
var NidekARefLStr = NidekARefLSph+" sf. "+NidekARefLCyl+" x "+NidekARefLAxis+"°";  
var NidekARefRStrLong = NidekARefRSph+" sf. "+NidekARefRCyl+" x "+NidekARefRAxis+"°\nK1: "+NidekARefRK1+" mm "+NidekARefRK1Axis+"°\nK2: "+NidekARefRK2+" mm "+NidekARefRK2Axis+"°";  
var NidekARefLStrLong = NidekARefLSph+" sf. "+NidekARefLCyl+" x "+NidekARefLAxis+"°\nK1: "+NidekARefLK1+" mm "+NidekARefLK1Axis+"°\nK2: "+NidekARefLK2+" mm "+NidekARefLK2Axis+"°";  
  
} catch (e) {
var NidekARefRStr = "";  
var NidekARefLStr = "";  
var NidekARefRStrLong = "";  
var NidekARefLStrLong = "";  
Dialog.info('Ingen Nidek måling', 'Tryk Ok');
}

if (NidekARefRSph !== "+E")
{  
var rightObj = "\n\nAutorefraktion o.dx:\n"+NidekARefRStrLong;
} else {
rightObj = "\n\nAutorefraktion o.dx: Ingen måling";
NidekARefRStr = "";
}
if (NidekARefLSph !== "+E")
{  
var leftObj = "\n\nAutorefraktion o.sin:\n"+NidekARefLStrLong;
} else {
leftObj = "\n\nAutorefraktion o.sin: Ingen måling";
NidekARefLStr = "";
}

    var visus = Dialog.input(
      "Visusmåling - kataraktforundersøgelse", rightObj+leftObj,{
        "Visusdx": { "type": "TEXT", "prompt": "Visus o.dx.:", "value": "", "suffix": "Snellen (HB, 1/60 og lign. noteres i refraktionsfeltet.)", 'validation': { 'regex': '^([01][.,](\\d{1,3}))?$', 'message': 'Fx 0,8' }},
        "Refrakdx": { "type": "TEXT", "prompt": "Optimal korrektion o.dx.:", "value": NidekARefRStr},                      
        "Visussin": { "type": "TEXT", "prompt": "Visus o.sin.:", "value": "", "suffix": "Snellen (HB, 1/60 og lign. noteres i refraktionsfeltet.)", 'validation': { 'regex': '^([01][.,](\\d{1,3}))?$', 'message': 'Fx 0,8' }},
        "Refraksin": { "type": "TEXT", "prompt": "Optimal korrektion o.sin.:", "value": NidekARefLStr}                      
      });

// Generate a debug text
var rightVisus = "Visus o.dx.:  "+visus.Visusdx+"   Korrektion: "+visus.Refrakdx+"";
var leftVisus = "\nVisus o.sin.:  "+visus.Visussin+"   Korrektion: "+visus.Refraksin+"";

var tensiont =  ["Appl","Icare","Lufttension"];
var allergier =  ["Ingen kendte","Ikke adspurgt","Registreret i Cave-modulet.","Adspurgt - Ingen ændringer i forhold til det registrerede i Cave-modulet."];
var endotel = ["Ingen","Let endoteldystrofi","Moderat til svær endoteldystrofi"];
var pupil = ["Normal","Synnekier","Middeldilateret"];
var linse = ["Incipient katarakt","Immatur katarakt","Matur katarakt","Pseudophak"];
var oftalmoskopi = ["Ingen","Let","Moderat","Svær"];

  try {
    var katFU1 = Dialog.input(
      "Kataraktforundersøgelse 1/3", rightVisus + leftVisus,{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
        "Allergier1": { "type": "RADIO", "prompt": "Allergi - Vælg:", "selectBetween": allergier, "orientation": "vertical"},
        "Allergier2": { "type": "TEXT", "prompt": "Allergi - Fritekst:", "value": ""},
        "Anamnese": { "type": "TEXT", "prompt": "Anamnese:", "value": "Tidligere øjenrask, godt syn på begge øjne. Nu gradvist aftagende syn. Ingen metamorfopsier."},
        "Organsystemer": { "type": "TEXT", "prompt": "Øvrige organsystemer:", "value": "Ingen klager."}
      });
    var katFU2 = Dialog.input(
      "Kataraktforundersøgelse 2/3", rightVisus + leftVisus,{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
        "ESLM": { "type": "TEXT", "prompt": "E.S.L.M:", "value": "I.a."},
        "Corneadx": { "type": "SELECT", "prompt": "Cornea o.dx.:", "selectBetween": endotel},
        "Corneasin": { "type": "SELECT", "prompt": "Cornea o.dx.:", "selectBetween": endotel},
        "Pupildx": { "type": "SELECT", "prompt": "Pupil o.dx.:", "selectBetween": pupil},
        "Pupilsin": { "type": "SELECT", "prompt": "Pupil o.sin.:", "selectBetween": pupil},
        "Lensdx": { "type": "SELECT", "prompt": "Lens o.dx.:", "selectBetween": linse},
        "Lenssin": { "type": "SELECT", "prompt": "Lens o.sin.:", "selectBetween": linse},
        "Tension": {"type": "MULTITEXT", "prompt": "Tension:", 'texts': [{'name': 'od', 'prefix': 'o.dx:','suffix': ' '},{'name': 'os', 'prefix': 'o.sin:'}]}, 
        "TensionType": { "type": "RADIO", "prompt": " ", "value": tensiont[0], "selectBetween": tensiont},
        "Oftalmoskopidx": { "type": "SELECT", "prompt": "Oft. o.dx. (maculadegenration):", "selectBetween": oftalmoskopi},
        "Oftalmoskopisin": { "type": "SELECT", "prompt": "Oft. o.sin. (maculadegenration):", "selectBetween": oftalmoskopi}
//        "Spaltelampe": { "type": "TEXT", "prompt": "Spaltelampe:", "value": "o.dx.: \no.sin.: "},
      });
    var katFU3 = Dialog.input(
      "Kataraktforundersøgelse 3/3", rightVisus + leftVisus + rightObj + leftObj,{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
      "Konklusion": { "type": "TEXT", "prompt": "Konklusion:", "value": "Patienten tilbydes kataraktoperation.\nEr informeret om operationens art og risici, herunder blødning, manglende linseimplantation, betændelse, hævelse af nethinden, nethindeløsning og udvikling af efterstær.\nPå ovennævnte grundlag accepterer patienten operation."}
      });
  
/**************************/
/*** Set type of note   ***/
/**************************/
  Settings.CommandRetries = 5;
  var skabelontype = "Primærjournal - somatik";
  try {
    var ExistingSkabelon = Fields["Notat - Skabelon for Read"].read();
    if (skabelontype !== ExistingSkabelon)
    {     
     try {
      Fields['Notat - Skabelon'].select(skabelontype);
      Settings.CommandRetries = StdRetry;
      if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Assistance" && ExistingSkabelon !== "Plejedata") 
      {
      Fields["Notat - Skift skabelon"].click();
      }
      Wait.forField(Fields["Notat - Skabelon for Read"], 10);  
        } catch (e) {
             try {
                 Fields['Notat - Skabelon'].select("Tilføj flere alternativer...");
                 Settings.CommandRetries = StdRetry;
                 if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Assistance" && ExistingSkabelon !== "Plejedata") 
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
    
 /**** Select Objektiv Undersøgelse Øjenundersøgelse ***/  

  Fields["Notat - NavigatorTree"].select("Specialespecifik objektiv undersøgelse");
  Fields["Notat - Fast værdi arrow"].click();
  Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
 
 //** Select 'Anamnese' in order for the template to expand "Objectiv undersøgelse"
 Fields['Notat - NavigatorTree'].select("Anamnese");
  
  Fields["Notat - NavigatorTree"].select("Visus o. dx.");
  try {
  if (visusR !== "E")
  {
  if (visusR !== "")
  {
  Fields["Notat - Numerisk værdi"].input(visusR);
  }
  if (correctionR !== "")
  {
  Fields["Notat - Fritekst"].input(correctionRStr);
  }
  }
  } catch (e) {
    Dialog.warn("Advarsel", "Fritekst i Visus o. dx. ikke fundet"); }
  
  Fields["Notat - NavigatorTree"].select("Visus o. sin.");
  try {
  if (visusL !== "E")
  {
  if (visusL !== "")
  {
  Fields["Notat - Numerisk værdi"].input(visusL);
  }
  if (correctionL !== "")
  {
  Fields["Notat - Fritekst"].input(correctionLStr);
  }
  }  
   } catch (e) {
    Dialog.warn("Advarsel", "Fritekst i Visus o. sin. ikke fundet"); }
  
Fields['Notat - NavigatorTree'].select("Autorefraktion o. dx.");
 try {
  if (nsRefRSph !== "+E")
  {
  Fields["Notat - Fritekst"].input(nsRefRSph+" sf. "+nsRefRCyl+" x "+nsRefRAxis+"°<newline>");
  }
 } catch (e) {
   Dialog.warn("Advarsel", "Fritekst i Autorefraktion o. dx. ikke fundet"); }

 Fields['Notat - NavigatorTree'].select("Autorefraktion o. sin.");
try {
  if (nsRefLSph !== "+E")
  {
  Fields["Notat - Fritekst"].input(nsRefLSph+" sf. "+nsRefLCyl+" x "+nsRefLAxis+"°<newline>");
  }
    } catch (e) {
   Dialog.warn("Advarsel", "Fritekst i Autorefraktion o. sin. ikke fundet"); }

/*** Egen brille ***/  
 if (visus.dEgenBrille.sph !== undefined)
 {  
if (visus.dEgenBrille.cyl === undefined){visus.dEgenBrille.cyl = "0";}
if (visus.dEgenBrille.axe === undefined){visus.dEgenBrille.axe = "0";}
Fields['Notat - NavigatorTree'].select("Egen brille o. dx.");
 try {
  Fields["Notat - Fritekst"].input(visus.dEgenBrille.sph+" sf. "+visus.dEgenBrille.cyl+" x "+visus.dEgenBrille.axe+"°");
 } catch (e) {
   Dialog.warn("Advarsel", "Fritekst i Egen brille o. dx. ikke fundet"); }
 }
    
 if (visus.sEgenBrille.sph !== undefined)
 {  
if (visus.sEgenBrille.cyl === undefined){visus.sEgenBrille.cyl = "0";}
if (visus.sEgenBrille.axe === undefined){visus.sEgenBrille.axe = "0";}
Fields['Notat - NavigatorTree'].select("Egen brille o. sin.");
try {
 Fields["Notat - Fritekst"].input(visus.sEgenBrille.sph+" sf. "+visus.sEgenBrille.cyl+" x "+visus.sEgenBrille.axe+"°");
  } catch (e) {
   Dialog.warn("Advarsel", "Fritekst i Egen brille o. sin. ikke fundet"); }
 } 
    
/***Pupiller***/ 
if (visus.Dilatation !== dilat[0])
{
Fields['Notat - NavigatorTree'].select("Pupiller");
 try {
//    Fields["Notat - Fritekst"].input("Dilateres med " + visus.Draaber + " " + visus.Dilatation + " /" + clinician.initials + " (kl. " + visus.diltid.hour + ":" + visus.diltid.minute + ")");
    Fields["Notat - Fritekst"].input("Dilateres med " + visus.Draaber + " " + visus.Dilatation + " /" + clinician.name+", " + titleabbr + " (kl. " + visus.diltid.hour + ":" + visus.diltid.minute + ")");
   } catch (e) {
  Dialog.warn("Advarsel", "Fritekst i Pupiller ikke fundet"); }
}
  
 /***Tension***/ 
  if (visus.Tension.od !== undefined)
  {  
  Fields["Notat - NavigatorTree"].select("Tension o. dx.");
  try {
  Fields["Notat - Numerisk værdi"].input(visus.Tension.od);
  Fields["Notat - Fritekst"].input(visus.TensionType);
  } catch (e) {
   Dialog.warn("Advarsel", "Tension o. dx. ikke fundet"); }
  }
    
  if (visus.Tension.os !== undefined)
  {  
    Fields["Notat - NavigatorTree"].select("Tension o. sin.");
  try {
  Fields["Notat - Numerisk værdi"].input(visus.Tension.os);
  Fields["Notat - Fritekst"].input(visus.TensionType);
  } catch (e) {
   Dialog.warn("Advarsel", "Tension o. sin. ikke fundet"); }
  }
    
  /***Foveal OCT***/ 
  if (visus.CRT.od !== undefined)
  {  
  Fields["Notat - NavigatorTree"].select("Foveal OCT o. dx.");
  try {
  Fields["Notat - Numerisk værdi"].input(visus.CRT.od);
  } catch (e) {
   Dialog.warn("Advarsel", "Foveal OCT o. dx. ikke fundet"); }
  }
    
  if (visus.CRT.os !== undefined)
  {  
    Fields["Notat - NavigatorTree"].select("Foveal OCT o. sin.");
  try {
  Fields["Notat - Numerisk værdi"].input(visus.CRT.os);
  } catch (e) {
   Dialog.warn("Advarsel", "Foveal OCT o. sin. ikke fundet"); }
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
var funduskode0;
var funduskode1;
var funduskode2;
if (visus.TopconOCT === oct[0]) {oct1=""; octkode0 ="0";}    
if (visus.TopconOCT === oct[1]) {oct1="<newline>Topcon OCT o.dx."; octkode1 ="1";}    
if (visus.TopconOCT === oct[2]) {oct1="<newline>Topcon OCT o.sin."; octkode1 ="1";}    
if (visus.TopconOCT === oct[3]) {oct1="<newline>Topcon OCT o.u."; octkode2 ="2";}    
if (visus.TopconPapilOCT === oct[0]) {oct2=""; octkode0 ="0";}    
if (visus.TopconPapilOCT === oct[1]) {oct2="<newline>Topcon Papil OCT o.dx."; octkode1 ="1";}    
if (visus.TopconPapilOCT === oct[2]) {oct2="<newline>Topcon Papil OCT o.sin."; octkode1 ="1";}    
if (visus.TopconPapilOCT === oct[3]) {oct2="<newline>Topcon Papil OCT o.u."; octkode2 ="2";}    
if (visus.HeidelbergOCT === oct[0]) {oct3=""; octkode0 ="0";}    
if (visus.HeidelbergOCT === oct[1]) {oct3="<newline>Heidelberg OCT o.dx."; octkode1 ="1";}    
if (visus.HeidelbergOCT === oct[2]) {oct3="<newline>Heidelberg OCT o.sin."; octkode1 ="1";}    
if (visus.HeidelbergOCT === oct[3]) {oct3="<newline>Heidelberg OCT o.u."; octkode2 ="2";}    
if (visus.HeidelbergPapilOCT === oct[0]) {oct4=""; octkode0 ="0";}    
if (visus.HeidelbergPapilOCT === oct[1]) {oct4="<newline>Heidelberg Papil OCT o.dx."; octkode1 ="1";}    
if (visus.HeidelbergPapilOCT === oct[2]) {oct4="<newline>Heidelberg Papil OCT o.sin."; octkode1 ="1";}    
if (visus.HeidelbergPapilOCT === oct[3]) {oct4="<newline>Heidelberg Papil OCT o.u."; octkode2 ="2";}    
if (visus.OptosFoto === oct[0]) {fundus1=""; funduskode0 ="0";}    
if (visus.OptosFoto === oct[1]) {fundus1="<newline>Optos foto o.dx."; funduskode1 ="1";}    
if (visus.OptosFoto === oct[2]) {fundus1="<newline>Optos foto o.sin."; funduskode1 ="1";}    
if (visus.OptosFoto === oct[3]) {fundus1="<newline>Optos foto o.u."; funduskode2 ="2";}    
if (visus.TopconFoto === oct[0]) {fundus2=""; funduskode0 ="0";}    
if (visus.TopconFoto === oct[1]) {fundus2="<newline>Topcon foto o.dx."; funduskode1 ="1";}    
if (visus.TopconFoto === oct[2]) {fundus2="<newline>Topcon foto o.sin."; funduskode1 ="1";}    
if (visus.TopconFoto === oct[3]) {fundus2="<newline>Topcon foto o.u."; funduskode2 ="2";}    
var foto = oct1+oct2+oct3+oct4+fundus1+fundus2;
if (foto !== "")
  {  
  Fields['Notat - NavigatorTree'].select("Foto");
  try {
//  Fields["Notat - Fritekst"].input(foto + " /" + clinician.initials + " (kl. " + h + ":" + i + ")");
  Fields["Notat - Fritekst"].input(foto + " /" + clinician.name + ", " + titleabbr + " (kl. " + h + ":" + i + ")");
  } catch (e) {
   Dialog.warn("Advarsel", "Foto ikke fundet"); }
  }
    
/******************/
/*** Procedurer ***/
/******************/
var ProcedureCode;
try {
if (visus.Besogstype === besogst[0]) {ProcedureCode = "ZZ7049";} else {ProcedureCode = "ZZ0150A";}
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
  
if (octkode2 === "2" || octkode1 === "1") {    
    ProcedureCode = "ZZ7035";
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
if (octkode2 === "2") {Fields['Notat - Find Koder - Tilføj'].click();}
}
if (octkode2 === "2" || octkode1 === "1" || funduskode2 === "2" || funduskode1 === "1") {    
    ProcedureCode = "ZZ7010";
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
if (octkode2 === "2" || funduskode2 === "2") {Fields['Notat - Find Koder - Tilføj'].click();}
}
} catch (e) {
   Dialog.warn("Advarsel", "Procedurer kan ikke opdateres");
  }
  
  /*******************************/
  /*** Set Information/ accept ***/
  /*******************************/
  try {
    Fields['Notat - NavigatorTree'].select("Information");
    Fields["Notat - Fritekst"].input("CPR-nummer er kontrolleret.<newline>Patienten er informeret om undersøgelsen.");
  } catch (e) {
    Dialog.warn("Advarsel", "Fritekst i Information/accept ikke fundet"); 
  }

  /************************************************/
  /*** Udarbejdet af - 'Primærjournal - somatik ***/
  /************************************************/
  //if (visus.Besogstype === besogst[1])
  //{  
  //try {
  //  Fields['Notat - NavigatorTree'].select("Udarbejdet af");
  //  Fields["Notat - Fritekst"].input(clinician.name+", "+clinician.title);
  //} catch (e) {
  //  Dialog.warn("Advarsel", "Udarbejdet af ikke fundet"); 
  //}
  //}
    
    
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
Fields['Notat - NavigatorTree'].select("Pupiller");

/***********************/
/*** Preview         ***/
/***********************/
Fields['Notat - Preview'].click();
    
} catch (e) {
// *** Catch User cancel  
}


