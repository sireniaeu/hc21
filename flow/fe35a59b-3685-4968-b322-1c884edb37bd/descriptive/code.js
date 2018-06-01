//*** Input section of Eye note flow ***//

Settings.CommandRetries = 10;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var ClinicProc = Dialog.input("Ambulant operationsnotat", "Kliniker og procedure", 
  {"clinician": {"type": "SELECT", "prompt": "Kliniker", "selectBetween": [
    "Amb. sygeplejerske / fotograf", 
    "Anders Vestergård", 
    "Anna Stage Vergmann",
    "Bettina Andersen",
    "Christina Døfler Poulsen", 
    "Daniel Nyborg",
    "Dorte Bechtold",
    "Gerda Nørrelykke Møller",
    "Henrik Lundberg",
    "Jesper Pindbo Vestergaard",
    "Jimmi Wied",
    "Kathrine Leth-Møller",
    "Kristian Lundberg",
    "Laleh Molander",
    "Lene Poder Olsen",
    "Lisa Søgaad",
    "Mads Fonager Nørgaard",
    "Maiken Sjøholtstrand",
    "Majbrit Lind",
    "Maria Andersen",
    "Martine Petersen",
    "Michael Kjeldgaard",
    "Morten Juul B Hansen",
    "Nico Gampenrieder",
    "Niels Elkjær",
    "Niels Løgstrup",
    "Niels Lyhne",
    "Peter Ruhlmann",
    "Rebecca Broe",
    "Rene Jensen",
    "Søren Blindbæk",
    "Sara Wallenius",
    "Thomas Torp"]},
  "ivisygeplejerske": {"type": "SELECT", "prompt": "IVI sygeplejerske", "selectBetween": [
    "Anamaria Strøm",
    "Anja Holmslund",
    "Berti Jeppesen",
    "Mette Winkler",
    "Rikke Flesner Laursen",
    "Sine Legarth",
    "Vicki Nielsen"]},
  "procedure": {"type": "SELECT", "prompt": "Procedure", "selectBetween": [
    "Eylea",
    "Femto-LASIK",
    "Fotoundersøgelse",
    "Katarakt kontrol",
    "Katarakt operation - Standard",
    "Katarakt operation - Torisk",
    "Lucentis",
    "Ozurdex",
    "Skeleoperation - esotropi",
    "Skeleoperation - exotropi",
    "SMILE",
    "Visus KR 800S",
    "Vitrektomi - Epiretinal fibrose",
    "Vitrektomi - Makulært hul"]}
  });

if ((ClinicProc.procedure === "Eylea") || (ClinicProc.procedure === "Lucentis") || (ClinicProc.procedure === "Ozurdex")) {
  Flow.run("Eye function - DxtSin", {"Procedure": ClinicProc.procedure});
} else {
if (ClinicProc.procedure === "Femto-LASIK") {
  Flow.run("Eye function - Femto", {"Procedure": ClinicProc.procedure});
} else {
if (ClinicProc.procedure === "Fotoundersøgelse") {
  Flow.run("Eye function - Fotounders", {"Procedure": ClinicProc.procedure});
} else {
if (ClinicProc.procedure === "Katarakt kontrol") {
  Flow.run("Eye function - Katarakt kontrol", {"Procedure": ClinicProc.procedure});
} else {
if (ClinicProc.procedure === "Katarakt operation - Standard") {
  Flow.run("Eye function - Katarakt standard", {"Procedure": ClinicProc.procedure});
} else {
if (ClinicProc.procedure === "Katarakt operation - Torisk") {
  Flow.run("Eye function - Katarakt torisk", {"Procedure": ClinicProc.procedure});
} else {
if (ClinicProc.procedure === "Skeleoperation - esotropi") {
  Flow.run("Eye function - Skeleoperation", {"Procedure": ClinicProc.procedure});
} else {
if (ClinicProc.procedure === "Skeleoperation - exotropi") {
  Flow.run("Eye function - Skeleoperation", {"Procedure": ClinicProc.procedure});
} else {
if (ClinicProc.procedure === "SMILE") {
  Flow.run("Eye function - SMILE", {"Procedure": ClinicProc.procedure});
} else {
if (ClinicProc.procedure === "Visus KR 800S") {
  Flow.run("Eye function - Visus", {"Procedure": ClinicProc.procedure});
} else {
if ((ClinicProc.procedure === "Vitrektomi - Epiretinal fibrose") || (ClinicProc.procedure === "Vitrektomi - Makulært hul") ) {
  Flow.run("Eye function - Vitrektomi", {"Procedure": ClinicProc.procedure});
}}}}}}}}}}}