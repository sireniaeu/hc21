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

// Load xml

//var x = Xml.loadFrom("C:\\Users\\jonathan\\Desktop\\M-Serial3380_20170926_070558_TOPCON_KR-800S_4870425.xml");
var x = Xml.loadFrom("C:\\Users\\jonathan\\Desktop\\M-Serial3371_20170925_095018_TOPCON_KR-800S_4870425.xml");


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
  
// Generate a debug text
if (visusR !== "E"){  
var rightVisus = "Højre:      "+visusR+"   Korrektion: "+correctionRSph+" sf. "+correctionRCyl+" x "+correctionRAxis+"°\n";
} else {rightVisus = "Højre:      Ingen måling\n";}
if (visusL !== "E"){  
var leftVisus = "Venstre: "+visusL+"   Korrektion: "+correctionLSph+" sf. "+correctionLCyl+" x "+correctionLAxis+"°\n\n";
} else {leftVisus = "Venstre: Ingen måling\n\n";}
if (nsRefRSph !== "E"){  
var rightObj = "Autorefraktion:\nHøjre:      "+nsRefRSph+" sf. "+nsRefRCyl+" x "+nsRefRAxis+"°\n";
} else {nsRefRSph = "Autorefraktion:\nHøjre: Ingen måling\n";}
if (nsRefLSph !== "E"){  
var leftObj = "Venstre: "+nsRefLSph+" sf. "+nsRefLCyl+" x "+nsRefLAxis+"°";
} else {nsRefLSph = "Venstre: Ingen måling";}

Dialog.info("KR800 målinger", rightVisus + leftVisus + rightObj + leftObj);