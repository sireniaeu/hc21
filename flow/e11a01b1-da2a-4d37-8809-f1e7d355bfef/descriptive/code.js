var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

Fields["Ryd CPR"].click();
Fields["JournalCPRinput"].input(cpr);
Fields["PatientSøg"].click();
Fields["Menu - Journal"].click();
Fields["Menu - Journal"].click();
Fields["JournalCPRinput"].simulateClick();  //** Makes drop-down in Cosmic menu disappear **
