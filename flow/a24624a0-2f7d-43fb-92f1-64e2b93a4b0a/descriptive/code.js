// Handy function for adding a plus if required
function addPlus (s) {
  if (s[0]!="-") return "+" + s;
  return s;
}

// Load xml

var d = Xml.loadFrom("\\vmware-host\\Shared Folders\\Downloads\\M-Serial3371_20170925_095018_TOPCON_KR-800S_4870425.xml");

// Use xpath to dive into the xml structure
var visus = d.xpath("//nsSBJ:Measure[@type='SBJ']//nsSBJ:VA");

// Ref

var nsRefR = d.xpath("//nsREF:Measure[@type='REF']/nsREF:REF/nsREF:R/nsREF:Median");
var nsRefL = d.xpath("//nsREF:Measure[@type='REF']/nsREF:REF/nsREF:L/nsREF:Median");

// -- R
var nsRefRSph = nsRefR[0]["nsREF:Median"]["nsREF:Sphere"]["#text"];
var nsRefRCyl = nsRefR[0]["nsREF:Median"]["nsREF:Cylinder"]["#text"];
var nsRefRAxis = nsRefR[0]["nsREF:Median"]["nsREF:Axis"]["#text"];

var nsRefLSph = nsRefL[0]["nsREF:Median"]["nsREF:Sphere"]["#text"];
var nsRefLCyl = nsRefL[0]["nsREF:Median"]["nsREF:Cylinder"]["#text"];
var nsRefLAxis = nsRefL[0]["nsREF:Median"]["nsREF:Axis"]["#text"];

// Visus

var visusR = visus[0]["nsSBJ:VA"]["nsSBJ:R"]["#text"];
var visusL = visus[0]["nsSBJ:VA"]["nsSBJ:L"]["#text"];

// Correction

var correctionR = d.xpath("//nsSBJ:Measure[@type='SBJ']//nsSBJ:RefractionData/nsSBJ:R");
var correctionL = d.xpath("//nsSBJ:Measure[@type='SBJ']//nsSBJ:RefractionData/nsSBJ:L");

// -- R
var correctionRSph = correctionR[0]["nsSBJ:R"]["nsSBJ:Sph"]["#text"];
var correctionRCyl = correctionR[0]["nsSBJ:R"]["nsSBJ:Cyl"]["#text"];
var correctionRAxis = correctionR[0]["nsSBJ:R"]["nsSBJ:Axis"]["#text"];

// -- L
var correctionLSph = correctionL[0]["nsSBJ:L"]["nsSBJ:Sph"]["#text"];
var correctionLCyl = correctionL[0]["nsSBJ:L"]["nsSBJ:Cyl"]["#text"];
var correctionLAxis = correctionL[0]["nsSBJ:L"]["nsSBJ:Axis"]["#text"];

// Generate a debug text
var rightVisus = "Højre: Visus: "+visusR+" Korrektion: "+addPlus(correctionRSph)+" sf. "+addPlus(correctionRCyl)+" x "+correctionRAxis+"°\n";
var leftVisus = "Venstre: Visus: "+visusL+" Korrektion: "+addPlus(correctionLSph)+" sf. "+addPlus(correctionLCyl)+" x "+correctionLAxis+"°\n";
var rightObj = "Højre: Obj: "+addPlus(nsRefRSph)+" sf. "+addPlus(nsRefRCyl)+" x "+nsRefRAxis+"°\n";
var leftObj = "Venstre: Obj: "+addPlus(nsRefLSph)+" sf. "+addPlus(nsRefLCyl)+" x "+nsRefLAxis+"°\n";

Debug.showDialog(rightVisus + leftVisus + rightObj + leftObj);