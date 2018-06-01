var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];
  
//Fields['Menu - Journal'].click();
//Fields['Menu - Journal'].click();
Fields['Journal - Filtrering'].click();
Wait.forField(Fields['Filtrering - Nøgleord'], 15);
//Fields['Filtrering - Nøgleord'].simulateClick();
//Fields['Filtrering - Nøgleord list'].editcell('.*', '.*Anamnese.*', 'false');
var info = Fields['Filtrering - Nøgleord list'].inspect();
Debug.showDialog(JSON.stringify(info));
//Fields['Filtrering - Kliniker'].simulateClick();
//Fields['Filtrering - Rolle'].simulateClick();
//Fields['Filtrering - Lokalitet'].simulateClick();
//Fields['Filtrering - Notattype'].simulateClick();
//Fields['Filtrering - Kontakt'].simulateClick();
//Fields['Filtrering - Nøgleord list'].editcell('.*Visus o. dx..*', '.*', 'true');
//Fields['Filtrering - button filtrer'].click();
//var c = Fields['Filtrering - Nøgleord list'].read();
//Dialog.info("Test", c);
//Fields['Filtrering - Nøgleord list'].select("Anamnese");
//Fields['Filtrering - Nøgleord list'].simulateClick();

