var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];


//var c = Fields["FMK - Ordinationsliste - Table"].inspect();
//Debug.showDialog(JSON.stringify(c));
//Dialog.info("Pause", "", {});

Fields["FMK - Ordinationsliste - Table"].select(".*pust.*");
Fields["FMK - Ordinationsliste - Table"].rightClickCell(".*pust.*", "Dosering");
Fields["FMK - Recept"].click();
Fields["FMK - Recept reitereret"].click();
Fields["FMK - Recept genudleveres"].input("2");
Fields["FMK - Recept genudleveres hver"].input("1");
Fields["FMK - Recept genudleveres uge"].click();
//Fields["FMK - Recept Opret Recept"].click();
//Dialog.info("Pause", "", {});
