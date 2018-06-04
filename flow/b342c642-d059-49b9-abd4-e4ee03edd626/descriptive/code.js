var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

Fields['Menu - Visiter henvisning'].click();
Fields['Visiter henvisning - Alle patienter'].click();
