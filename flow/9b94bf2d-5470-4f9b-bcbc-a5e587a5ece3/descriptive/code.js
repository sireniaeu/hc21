var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var c = Fields["FMK - Ordinationsliste - Table"].inspect();
Debug.showDialog(JSON.stringify(c));
Dialog.info("Pause", "", {});

Fields["FMK - Ordinationsliste - Table"].select(".*stær.*ve..*");
Fields["FMK - Ordinationsliste - Table"].rightClickCell(".*stær.*ve..*", "Dosering");
Fields["FMK - Seponer i FMK"].click();
Fields["FMK - Bevar recepter og Seponer"].click();
Fields["JournalCPRinput"].simulateClick();  //** Makes Cosmic right-click menu disappear **
