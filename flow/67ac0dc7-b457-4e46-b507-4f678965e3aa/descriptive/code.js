var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

//Fields["Besøgsliste - Vindue"].click();
//var kliniker = Fields["Besøgsliste - Kliniker"].select(".*mef7ni.*");
//var kliniker = Fields["Besøgsliste - Kliniker"].read();
//var c = Fields["Besøgsliste - Kliniker"].inspect();
//Debug.showDialog(JSON.stringify(c));
//Fields["Menu - Oversigter"].click();
//Fields["Menu - Enhed"].click();
//Fields["Menu - Enhed - Besøgsliste"].click();
//Fields["Besøgsliste - Opdater"].click();
//var patient = Fields['JournalCPRinput'].read();
//Settings.CommandRetries = 4;
//try
//{
//Fields["Besøgsliste - Table"].editcell(patient, "Status", "Udført");
//Fields["Besøgsliste - Opdater"].click();
//} catch(e) {}
//Settings.CommandRetries = StdRetry;
Settings.CommandRetries = 5;
try
{
Fields["Besøgsliste - Vindue"].click();
} catch(e) {
Fields["Menu - Oversigter"].click();
Fields["Menu - Enhed"].click();
Fields["Menu - Enhed - Besøgsliste"].click();
//Fields["Besøgsliste - Vindue"].click();
}
Settings.CommandRetries = StdRetry;
var kliniker = Fields["Besøgsliste - Kliniker"].select(".*mef7ni.*");
Fields["Besøgsliste - Opdater"].click();
//var patient = Fields['JournalCPRinput'].read();
//Settings.CommandRetries = 5;
//try
//{
//Fields["Besøgsliste - Table"].editcell(patient, "Status", "Udført");
//Fields["Besøgsliste - Opdater"].click();
//Dialog.info("Udført", "Patientens status er skiftet til 'Udført' på Henrik Pontoppidans besøgsliste", { 'timeout': 5 });  
//} catch(e) {}
//Settings.CommandRetries = StdRetry;
//Fields['Notat - NavigatorTree'].select("Foto");
