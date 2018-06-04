Settings.CommandRetries = 9;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

/***********************/
/*** Vælg notat-type ***/
/***********************/
//*** From JBP flow - "Procedurer" does not exist in the Udd-miljø for Ambulant operationsnotat
//Fields['Notat - Skabelon'].select("Ambulant operationsnotat");

//*** Inserted instead
Fields['Notat - Skabelon'].select("Operationsnotat");

/******************/
/*** Trin 1 ... ***/
/******************/
Fields['Notat - NavigatorTree'].select("Trin 1");
Fields['Notat - Fast værdi'].select("Udført");

/****************/
/*** Operatør ***/
/****************/
Fields['Notat - NavigatorTree'].select("Operatør");
Fields['Notat - Operatør - Text'].input("Jonathan Bunde-Pedersen");

/****************/
/*** Anæstesi ***/
/****************/
Fields['Notat - NavigatorTree'].select("Anæstesitype");
Fields['Notat - Anæstesitype - Text'].input("Dråbeanæstesi");

/******************/
/*** Procedurer ***/
/******************/
Fields['Notat - NavigatorTree'].select("Procedurer");

//*** Temporary work around - to be deleted
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
Fields['Notat - Find Koder - Kodetype'].select("Procedurer");
Fields['Notat - Find Koder - Kodetype'].inputNative("\t");


//*** From JBP flow - select wrong field in "Operationsnotat" skabelon
//Fields['Notat - Find Koder - Text'].input("KCKD05B");

//*** Gary Larsson
//Dialog.info('Indsættes med søg på beskrivelse', "KCKD05B", {timeout: 3});
Fields['Notat - Find Koder - Text'].input("Punktur af corpus vitreum");

Fields['Notat - Find Koder - Søg'].click();
// Select the found entry
// ||select:**/Find koder/CambioPanel/JScrollPane/JViewport/SearchTable;KCKD05
Fields['Notat - Find Koder - Resultat'].select("KCKD05B");

// Add date and time
// ||text:**/Yderligere procedureoplysninger/CambioDateTimeComponent/CambioDateChooser/DateFormattedSpinner/*IDate;01012020;sendkeys
var da = new Date();
var d = da.getDate();
if (d < "10") d = ("0" + d);
var m = da.getMonth() + 1;
if (m < "10") m = ("0" + m);
var y = da.getFullYear();
Fields['Notat - Find Koder - Date'].inputNative(d + m + y);

var h = da.getHours();
if (h < "10") h = ("0" + h);
var i = da.getMinutes();
if (i < "10") i = ("0" + i);
// ||text:**/Yderligere procedureoplysninger/CambioDateTimeComponent/CambioTimeChooser/TimeFormattedSpinner/ITime;0800;sendkeys
//Dialog.info('Wait a bit', h + ":" + i, {timeout: 5});
Fields['Notat - Find Koder - Time'].inputNative(h + i);
//"\b\b\b\b" + 

Fields['Notat - Find Koder - Tilføj'].click();

// Now, select the added code and start adding additional codes
// ||select:**/Registrerede koder/**/*ClinicalCodeTree*;KCK
Fields['Notat - Find Koder - Valgte koder'].select("KCKD05B");

// Now add an additional procedure choice
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
//Fields['Notat - Find Koder - Text'].input("TUL1");

//*** More Gary 
//Dialog.info('Indsæt manuelt', "TUL1");
Fields['Notat - Find Koder - Text'].input("højresidig");

Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select("TUL1");
Fields['Notat - Find Koder - Tilføj'].click();

// and another
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
//Fields['Notat - Find Koder - Text'].input("MS01LA05");

//*** and more Gary
//Dialog.info('Indsæt manuelt', "MS01LA05");
Fields['Notat - Find Koder - Text'].input("aflibercept");

Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select("MS01LA05");
Fields['Notat - Find Koder - Tilføj'].click();

/*****************************/
/*** Operationsbeskrivelse ***/
/*****************************/
Fields['Notat - NavigatorTree'].select("Operationsbeskrivelse");
Fields['Notat - Operationsbeskrivelse - Text'].input("Anti-VEGF-injektion med Eylea " + "\n\nDer injiceres 0,05 ml Eylea 40 mg/ml, 3,5 mm bag limbus, ukompliceret.");

/******************/
/*** Trin 2 ... ***/
/******************/
try {
  Fields['Notat - NavigatorTree'].select("Trin 2");
  Fields['Notat - Fast værdi'].select("Udført");
}
catch (e){
  Dialog.warn('Advarsel', 'Trin 2 kan ikke genneføres', { 'timeout': 5 });}

/******************/
/*** Trin 6 ... ***/
/******************/
try {
  Fields['Notat - NavigatorTree'].select("Trin 6");
  Fields['Notat - Fast værdi'].select("Udført");
}
catch (e){
  Dialog.warn('Advarsel', 'Trin 6 findes ikke', { 'timeout': 5 });}

/***************/
/*** Preview ***/
/***************/
Fields['Notat - Preview'].click();
