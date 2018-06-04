var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

Fields['Menu - LPR Oversigt'].click();
Fields['LPR Oversigt - Date1'].click();
Fields['LPR Oversigt - Date1'].inputNative("11112017<backspace><backspace><backspace><backspace><backspace><backspace><backspace><backspace>");
Fields['LPR Oversigt - Opdater'].click();
Wait.forField(Fields['LPR Oversigt - Table'], 10);
Fields['LPR Oversigt - Table'].select("Åben");
//Fields['LPR Oversigt - Kontaktdata'].select("Diagnose");
var c = Fields['LPR Oversigt - Kontaktdata'].inspect("Diagnose");
Debug.showDialog(JSON.stringify(c));
//Debug.showDialog(c.text);
