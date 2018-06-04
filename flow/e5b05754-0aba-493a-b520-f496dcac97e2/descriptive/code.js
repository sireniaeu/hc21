var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

// Handy function for catching empty fields
function catchEmpty(d, path) {
  var empty = "E";
  if (!d) return empty;
  for (var i = 0; i < path.length; i++) {
    d = d[path[i]];
    if (!d) return empty;
  }
  return d;
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
var hh = da.getHours();
var i = da.getMinutes();
var ii = da.getMinutes();
if (hh > 0) {
  if (ii < 3) {hh = hh - 1; ii = ii + 60;}
ii = ii - 3;
}
if (h < 10) {h = ("0" + h);} else {h = h + "";}
if (i < 10) {i = ("0" + i);} else {i = i + "";}
if (hh < 10) {hh = ("0" + hh);} else {hh = hh + "";}
if (ii < 10) {ii = ("0" + ii);} else {ii = ii + "";}
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
var barcode = Dialog.input("Visusmåling", "Scan stregkode fra KR800S print eller vælg 'Måling uden KR800S'",{buttons: [{ 'value': 'Måling uden KR800S', 'isCancel': true }], 'submitOnValidation': true,
                           'Stregkode': {"type": "TEXT", "prompt": "Stregkode: ", "validation": {"regex": '^([K][R][ ](\\d{6}))$'}}});

// Extract machinenumber [1] and serialnumber [2]
var serial = barcode.Stregkode.match(/^.{3}([0-9]{2})([0-9]{4})/);
  
// Load xml
//var files = Fs.ls("\\\\10.75.65.50\\TopconKR800s\\M-Serial"+serial[1]+"*.xml");
var files = Fs.ls("\\\\10.161.4.130\\kr800\\"+serial[1]+"\\M-Serial"+serial[2]+"*.xml");
  
if (files.length > 1) { Dialog.warn("For mange filer ...", "Kontakt Jesper (12787)"); }
if (files.length === 0) { Dialog.warn("Filen ikke fundet.", "Kontakt Jesper (12787)"); }  
var x = Xml.loadFrom(files[0]);
  
// Use xpath to dive into the xml structure
var visusx = x.xpath("//nsSBJ:Measure[@type='SBJ']//nsSBJ:VA");

// Ref
var nsRefR = x.xpath("//nsREF:Measure[@type='REF']/nsREF:REF/nsREF:R/nsREF:Median");
var nsRefL = x.xpath("//nsREF:Measure[@type='REF']/nsREF:REF/nsREF:L/nsREF:Median");

// -- R

var nsRefRSph = addPlus(catchEmpty(nsRefR, [0, "nsREF:Median", "nsREF:Sphere", "#text"]));
var nsRefRCyl = catchEmpty(nsRefR, [0, "nsREF:Median", "nsREF:Cylinder", "#text"]);
var nsRefRAxis = catchEmpty(nsRefR, [0, "nsREF:Median", "nsREF:Axis", "#text"]);

var nsRefLSph = addPlus(catchEmpty(nsRefL, [0, "nsREF:Median", "nsREF:Sphere", "#text"]));
var nsRefLCyl = catchEmpty(nsRefL, [0, "nsREF:Median", "nsREF:Cylinder", "#text"]);
var nsRefLAxis = catchEmpty(nsRefL, [0, "nsREF:Median", "nsREF:Axis", "#text"]);

// Visus
var visusR = catchEmpty(visusx, [0, "nsSBJ:VA", "nsSBJ:R", "#text"]);
var visusL = catchEmpty(visusx, [0, "nsSBJ:VA", "nsSBJ:L", "#text"]);

// Correction
var correctionR = x.xpath("//nsSBJ:Measure[@type='SBJ']//nsSBJ:RefractionData/nsSBJ:R");
var correctionL = x.xpath("//nsSBJ:Measure[@type='SBJ']//nsSBJ:RefractionData/nsSBJ:L");

// -- R
var correctionRSph = addPlus(catchEmpty(correctionR, [0, "nsSBJ:R", "nsSBJ:Sph", "#text"]));
var correctionRCyl = catchEmpty(correctionR, [0, "nsSBJ:R", "nsSBJ:Cyl", "#text"]);
var correctionRAxis = catchEmpty(correctionR, [0, "nsSBJ:R", "nsSBJ:Axis", "#text"]);

// -- L
var correctionLSph = addPlus(catchEmpty(correctionL, [0, "nsSBJ:L", "nsSBJ:Sph", "#text"]));
var correctionLCyl = catchEmpty(correctionL, [0, "nsSBJ:L", "nsSBJ:Cyl", "#text"]);
var correctionLAxis = catchEmpty(correctionL, [0, "nsSBJ:L","nsSBJ:Axis", "#text"]);

// Adjust for zero cylinder and axis
if (correctionRCyl === "0.00"){correctionRCyl = "0"; correctionRAxis = "0";} 
if (correctionLCyl === "0.00"){correctionLCyl = "0"; correctionLAxis = "0";} 
if (nsRefRCyl === "0.0"){nsRefRCyl = "0";}
if (nsRefLCyl === "0.0"){nsRefLCyl = "0";}  

var correctionRStr = correctionRSph+" sf. "+correctionRCyl+" x "+correctionRAxis+"°";  
var correctionLStr = correctionLSph+" sf. "+correctionLCyl+" x "+correctionLAxis+"°";  
  
} catch (e) {
    var manuel = Dialog.input(
      "Visusmåling", "",{
        "Visusdx": { "type": "TEXT", "prompt": "Visus o.dx.:", "value": "", "suffix": "Snellen (HB, 1/60 og lign. noteres i refraktionsfeltet.)", 'validation': { 'regex': '^([01][.,](\\d{1,3}))?$', 'message': 'Fx 0,8' }},
        "Refrakdx": { "type": "TEXT", "prompt": "Refraktion o.dx.:", "value": ""},                      
        "Visussin": { "type": "TEXT", "prompt": "Visus o.sin.:", "value": "", "suffix": "Snellen (HB, 1/60 og lign. noteres i refraktionsfeltet.)", 'validation': { 'regex': '^([01][.,](\\d{1,3}))?$', 'message': 'Fx 0,8' }},
        "Refraksin": { "type": "TEXT", "prompt": "Refraktion o.sin.:", "value": ""}                      
      });
if (manuel.Visusdx === "" && manuel.Refrakdx ==="")
{visusR = "E";}
if (manuel.Visusdx === "" && manuel.Refrakdx !=="")
{visusR = "";
correctionRStr = manuel.Refrakdx;}  
if (manuel.Visusdx !== "" && manuel.Refrakdx ==="")
{visusR = manuel.Visusdx;
correctionRStr = "";}  
if (manuel.Visusdx !== "" && manuel.Refrakdx !=="")
{visusR = manuel.Visusdx;
correctionRStr = manuel.Refrakdx;}  
if (manuel.Visussin === "" && manuel.Refraksin ==="")
{visusL = "E";}
if (manuel.Visussin === "" && manuel.Refraksin !=="")
{visusL = "";
correctionLStr = manuel.Refraksin;}  
if (manuel.Visussin !== "" && manuel.Refraksin ==="")
{visusL = manuel.Visussin;
correctionLStr = "";}  
if (manuel.Visussin !== "" && manuel.Refraksin !=="")
{visusL = manuel.Visussin;
correctionLStr = manuel.Refraksin;}
nsRefRSph = "+E";  
nsRefLSph = "+E";  
}  

// Generate a debug text
if (visusR !== "E"){  
var rightVisus = "Højre:      "+visusR+"   Korrektion: "+correctionRStr+"";
} else {rightVisus = "Højre:      Ingen måling";}
if (visusL !== "E"){  
var leftVisus = "\nVenstre: "+visusL+"   Korrektion: "+correctionLStr+"";
} else {leftVisus = "\nVenstre: Ingen måling";}
if (nsRefRSph !== "+E"){  
var rightObj = "\n\nAutorefraktion:\nHøjre:      "+nsRefRSph+" sf. "+nsRefRCyl+" x "+nsRefRAxis+"°";
} else {rightObj = "\n\nAutorefraktion\nHøjre:      Ingen måling";}
if (nsRefLSph !== "+E"){  
var leftObj = "\nVenstre: "+nsRefLSph+" sf. "+nsRefLCyl+" x "+nsRefLAxis+"°";
} else {leftObj = "\nVenstre: Ingen måling";}

//Dialog.info("KR800 målinger", rightVisus + leftVisus + rightObj + leftObj);

  var besogst = ["Kontrol", "Nyhenvist"];
  var tensiont =  ["Lufttension", "Icare"];
  var dilat = ["Nej", "o.u.", "o.dx.", "o.sin."];
  var draaber = ["Metaoxedrin 10% + Mydriacyl 1%", "Minims: Metaoxedrin 10% + Mydriacyl 1%", "Mydriacyl 1%", "Minims: Mydriacyl 1%", "Cyclogyl 1%"];   
  var oct = ["Nej", "o.dx.", "o.sin.", "o.u."];
  
  try {
    var visus = Dialog.input(
      "Visusmåling", rightVisus + leftVisus + rightObj + leftObj,{buttons: [{ 'value': 'Ok' },{ 'value': 'Cancel', 'isCancel': true }],
        'Besogstype': { "type": "RADIO", "prompt": "Besøgstype:", "selectBetween": besogst, 'validation': {'isRequired': true, 'message': "Vælg besøgstype"}},
        'dEgenBrille': { 
          'type': 'MULTITEXT',
          'prompt': 'Egen brille o.dx:',
          'texts': [
            { 'name': 'sph', 'suffix': 'sf.'},
            { 'name': 'cyl', 'suffix': 'x'},
            { 'name': 'axe', 'suffix': '°'}]},
        'sEgenBrille': { 
          'type': 'MULTITEXT',
          'prompt': 'Egen brille o.sin:',
          'texts': [
            { 'name': 'sph', 'suffix': 'sf.'},
            { 'name': 'cyl', 'suffix': 'x'},
            { 'name': 'axe', 'suffix': '°'}]},
//        "Tension": {"type": "MULTITEXT", "prompt": "Tension:", 'texts': [{'name': 'od', 'prefix': 'o.dx:','suffix': ' ', 'validation': { 'regex': '^(\\d{1,2})?$', 'message': 'Fx 0,8' }},{'name': 'os', 'prefix': 'o.sin:'}]}, 
        "Tension": {"type": "MULTITEXT", "prompt": "Tension:", 'texts': [{'name': 'od', 'prefix': 'o.dx:','suffix': ' '},{'name': 'os', 'prefix': 'o.sin:'}]}, 
        "TensionType": { "type": "RADIO", "prompt": " ", "value": tensiont[0], "selectBetween": tensiont},
        "Dilatation": { "type": "RADIO", "prompt": "Dilatation:", "value": dilat[1], "selectBetween": dilat},
        "diltid": { "type": "MULTITEXT", "prompt": "Tidspunkt dilatation:", "texts": [{"name": "hour", "prefix": "Kl.", "value": hh, "validation": {"regex": '^([012](\\d{1}))$'}},{"name": "minute", "prefix": ":", "value": ii, "validation": {"regex": '^([0123456](\\d{1}))$'}}]},                                   
        "Draaber": { "type": "RADIO", "prompt": "Dråber:", "value": draaber[0], "selectBetween": draaber},  
//        'divider1': { 'type': 'DIVIDER'},
        "TopconOCT": { "type": "RADIO", "prompt": "Topcon OCT:", "value": oct[0], "selectBetween": oct},
        "TopconPapilOCT": { "type": "RADIO", "prompt": "Topcon papil OCT:", "value": oct[0], "selectBetween": oct},
        "HeidelbergOCT": { "type": "RADIO", "prompt": "Heidelberg OCT:", "value": oct[0], "selectBetween": oct},
        "HeidelbergPapilOCT": { "type": "RADIO", "prompt": "Heidelberg papil OCT:", "value": oct[0], "selectBetween": oct},
        'CRT': { 'type': 'MULTITEXT','prompt': 'CRT:','texts': [
            { 'name': 'od', 'prefix': 'o.dx:', 'suffix': 'my   '},
            { 'name': 'os', 'prefix': 'o.sin:', 'suffix': 'my   '}]},
//        'divider2': { 'type': 'DIVIDER'},
        "OptosFoto": { "type": "RADIO", "prompt": "Optos foto:", "value": oct[0], "selectBetween": oct},
        "TopconFoto": { "type": "RADIO", "prompt": "Topcon foto:", "value": oct[0], "selectBetween": oct}
      });
  
/**************************/
/*** Set type of note   ***/
/**************************/
Settings.CommandRetries = 5;
try {
  var skabelontype = ["Ambulant klinisk kontakt", "Primærjournal - somatik"];
  var ExistingSkabelon = Fields["Notat - Skabelon for Read"].read();
    if (visus.Besogstype === besogst[0] && skabelontype[0] !== ExistingSkabelon)
    {
      try {
        Fields['Notat - Skabelon'].select(skabelontype[0]);
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
    Fields["Notat - Alternative skabeloner"].select(skabelontype[0]);
    Fields["Notat - Tilføj skabelon"].click();
    Fields["Cave - OK knap"].click();
    Wait.forField(Fields["Notat - Skabelon for Read"], 10);
    } catch (e) {
      Dialog.warn('Advarsel', skabelontype[0] + ' kan ikke vælges.');
    } 
    }
    } 
    if (visus.Besogstype === besogst[1] && skabelontype[1] !== ExistingSkabelon)
    {
      try {
        Fields['Notat - Skabelon'].select(skabelontype[1]);
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
    Fields["Notat - Alternative skabeloner"].select(skabelontype[1]);
    Fields["Notat - Tilføj skabelon"].click();
    Fields["Cave - OK knap"].click();
    Wait.forField(Fields["Notat - Skabelon for Read"], 10); 
    } catch (e) {
      Dialog.warn('Advarsel', skabelontype[1] + ' kan ikke vælges.');
    } 
    }
    }

  } catch (e) {
      Dialog.warn('Advarsel', 'Skabelon kan ikke vælges.', { 'timeout': 5 });
  }   
Settings.CommandRetries = StdRetry;
   
  /************************************************/
  /*** Udarbejdet af - Ambulant klinisk kontakt ***/
  /************************************************/
  //if (visus.Besogstype === besogst[0])
  //{  
  //try {
  //  Fields['Notat - NavigatorTree'].select("Udarbejdet af");
  //  Fields["Notat - Fritekst"].input(clinician.name+", "+clinician.title);
  //} catch (e) {
  //  Dialog.warn("Advarsel", "Udarbejdet af ikke fundet"); 
  //}
  //}
    
  /**** Select Objektiv Undersøgelse Øjenundersøgelse ***/  
  if (visus.Besogstype === besogst[0])
  {  
  Fields["Notat - NavigatorTree"].select("Objektiv undersøgelse");
  Fields["Notat - Fast værdi arrow"].click();
  Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
  }
 
 if (visus.Besogstype === besogst[1])
 {  
  Fields["Notat - NavigatorTree"].select("Specialespecifik objektiv undersøgelse");
  Fields["Notat - Fast værdi arrow"].click();
  Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
 }   
 
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


