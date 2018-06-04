//******************************************************************************************//
//*** Cosmic flow to capture OR Procedure information and creation of outpatient OR note ***//
//******************************************************************************************//
var StdRetry = 12;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

try {
  
/**************************/
/*** Set type of note   ***/
/**************************/
  var skabelontype = "Epikrise u lægemidler";
  try {
    var ExistingSkabelon = Fields["Notat - Skabelon for Read"].read();
    Settings.CommandRetries = 5;
    if (skabelontype !== ExistingSkabelon)
    {     
      try {
        Fields['Notat - Skabelon'].select(skabelontype);
        if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Assistance" && ExistingSkabelon !== "Plejedata")
        {
          Fields["Notat - Skift skabelon"].click();
        }
        Wait.forField(Fields["Notat - Skabelon for Read"], 10);  
      } catch (e) {
        try {
          Fields['Notat - Skabelon'].select("Tilføj flere alternativer...");
          if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Assistance" && ExistingSkabelon !== "Plejedata")
          {
            Fields["Notat - Skift skabelon"].click();
          }
          Fields["Notat - Alternative skabeloner"].select(skabelontype);
          Fields["Notat - Tilføj skabelon"].click();
          Fields["Cave - OK knap"].click();
          Wait.forField(Fields["Notat - Skabelon for Read"], 10);  
        } catch (e) {
          Dialog.warn('Advarsel', skabelontype + ' kan ikke vælges.', { 'timeout': 5 });
        } 
      }
    }
  } catch (e) {
    Dialog.warn('Advarsel', 'Skabelon kan ikke vælges.', { 'timeout': 5 });
  }
  Settings.CommandRetries = StdRetry;
  
  //*******************************//
  //*** Creation of Cosmic Note ***//
  //*******************************//
 
  /*************/
  /*** Enhed ***/
  /*************/

  if (EULenhed !== "N/A"){
    try {
      
      Fields["Notat - Afdeling Enhed"].select(".*" + EULenhed + ".*");
    } catch (e) {
      Dialog.warn('Advarsel', 'Denne Enhed kan ikke vælges:\n' + EULenhed + '\n\nVælg korrekt enhed og tast OK.');
    }
  } 
  
  /*********************/
  /*** Udarbejdet af ***/
  /*********************/
  if (EULudarbejdetaf !== "N/A") {
    try {
      Fields['Notat - NavigatorTree'].select("Udarbejdet af");
      Fields["Notat - Fritekst"].input(EULudarbejdetaf);
    } catch (e) {
      Dialog.warn('Advarsel', 'Udarbejdet af kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /****************************/
  /*** Resumé af forløbet   ***/
  /****************************/
  if (EULresume !== "N/A") {
    try {
      Fields['Notat - NavigatorTree'].select("Resumé af forløbet");
      Fields["Notat - Fritekst"].input(EULresume);
    } catch (e) {
      Dialog.warn('Advarsel', 'Resumé af forløbet kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /*************************************/
  /*** Ikke afsluttede undersøgelser ***/
  /*************************************/
  if (EULikkeafslundersoeg !== "N/A") {   
    try {
      Fields['Notat - NavigatorTree'].select("Ikke afsluttede undersøgelser");
      Fields["Notat - Fritekst"].input(EULikkeafslundersoeg);
    } catch (e) {
      Dialog.warn('Advarsel', 'Ikke afsluttede undersøgelser kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /****************************/
  /*** Efterbehandlingsplan ***/
  /****************************/
  if (EULefterbehandlingsplan !== "N/A") {
    try {
      Fields['Notat - NavigatorTree'].select("Efterbehandlingsplan");
      Fields['Notat - Fritekst'].input(EULefterbehandlingsplan);
    } catch (e) {
      Dialog.warn('Advarsel', 'Efterbehandlingsplan kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /***********************/
  /*** Hændelser i FMK ***/
  /***********************/
  if (EULfmk !== "N/A") {
    try {
      Fields['Notat - NavigatorTree'].select("Hændelser i FMK");
      Fields['Notat - Fritekst'].input(EULfmk);
    } catch (e) {
      Dialog.warn('Advarsel', 'Hændelser i FMK kan ikke opdateres.', { 'timeout': 5 });
    }
  }
    
  /*************************/
  /*** Dosisdispensering ***/
  /*************************/
  if (EULdosisdispensering !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("Dosisdispensering"); 
      Fields['Notat - Fast værdi'].select(EULdosisdispensering);
    } catch (e) {
      Dialog.warn('Advarsel', 'Dosisdispensering kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  if (EULdosisdispenseringtekst !== "N/A") {  
   try {
      Fields['Notat - NavigatorTree'].select("Dosisdispensering"); 
      Fields['Notat - Fritekst'].input(EULdosisdispenseringtekst);
    } catch (e) {
      Dialog.warn('Advarsel', 'Dosisdispensering tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /***********************/
  /*** Sygemelding     ***/
  /***********************/
  if (EULsygemelding !== "N/A") {
    try {
      Fields['Notat - NavigatorTree'].select("Sygemelding");
      Fields['Notat - Fritekst'].input(EULsygemelding);
    } catch (e) {
      Dialog.warn('Advarsel', 'Sygemelding kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /*************************/
  /*** Genoptræningsplan ***/
  /*************************/
  if (EULgenoptraeningsplan !== "N/A") {
    try {
      Fields['Notat - NavigatorTree'].select("Genoptræningsplan");
      Fields['Notat - Fritekst'].input(EULgenoptraeningsplan);
    } catch (e) {
      Dialog.warn('Advarsel', 'Genoptræninngsplan kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /*****************************/
  /*** Blodtransfusion givet ***/
  /*****************************/
  if (EULblodtransfusion !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("Blodtransfusion givet");
      Fields['Notat - Fast værdi'].select("Ja");
    } catch (e) {
      Dialog.warn("Advarsel", "'Skal sendes' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen.", { 'timeout': 5 }); 
    }
  } 
  
  if (EULblodtransfusiontekst !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("Blodtransfusion givet");
      Fields['Notat - Fritekst'].input(EULblodtransfusiontekst);
    } catch (e) {
      Dialog.warn('Advarsel', 'Blodtransfusion givet tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /*******************/
  /*** Diagnoser   ***/
  /*******************/
  if (EULDiagnose1 !== "N/A"){
    try {
      Fields['Notat - NavigatorTree'].select("Diagnoser");
      Fields['Notat - Find Koder - Kodetype'].select("Diagnoser");
      Fields['Notat - Find Koder - Text'].input(EULDiagnose1);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(EULDiagnose1);
      Fields['Notat - Find Koder - Tilføj'].click();
    } catch (e) {
       Dialog.warn('Advarsel', 'Diagnose kan ikke opdateres.', { 'timeout': 5 });
    }
  }
      

  /*** Set 'Tillægskoder' ***/
  if (EULDiagnose1add1 !== "N/A") {
    try {
      Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(EULDiagnose1, 0, 0);
      Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
      Fields['Notat - Find Koder - Text'].input(EULDiagnose1add1);  
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(EULDiagnose1add1);
      Fields['Notat - Find Koder - Tilføj'].click();
    } catch (e) {
      Dialog.warn('Advarsel', 'Diagnose tillægskode kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /*********************************/
  /*** Information til patienten ***/
  /*********************************/
  if (EULinformation !== "N/A") {
    try {
      Fields['Notat - NavigatorTree'].select("Information til patienten");
      Fields['Notat - Fritekst'].input(EULinformation);
    } catch (e) {
      Dialog.warn('Advarsel', 'Information til patienten kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /************************/
  /*** Brev til patient ***/
  /************************/
  // N/A
    
  /*******************************/
  /*** Entry on dictation list ***/
  /*******************************/
  if (EULdictate !== "N/A"){  
    try {
      Fields["Menu - Journal"].click();
      Fields["Menu - Digital diktering"].click();
      Fields["Digital diktering - Opret nyt diktat"].click();
      Fields["Digital diktering - record start"].click();
      Wait.forSeconds(1);
      Fields["Digital diktering - record stop"].click();
      Fields["Digital diktering - Kommentar"].input(EULmessage);
      Fields["Digital diktering - Kategori"].select("Epikrise");
      Fields["Digital diktering - prioritet1"].click();
      Fields["Digital diktering - Gem og afslut"].click();
    } catch (e) {
      Dialog.warn("Advarsel", "'Diktat til sekretær med besked' kan ikke oprettes.", { 'timeout': 5 }); 
    }
  }
  
  //**************************************************//  
  //*** End with setting focus at predefined field ***//
  //**************************************************//  
  if (EULlastfield !== "N/A"){
    Fields['Notat - NavigatorTree'].select("" + EULlastfield + "");
  }
  
  //******************//  
  //*** Save draft ***//
  //******************//   
  if (EULgemkladde !== "N/A") {
    Fields["Gem kladde"].click();
  }
  
  //****************************************************//  
  //*** General catch of throw's throughout the flow ***//
  //****************************************************// 
} catch (e) {
  Dialog.warn("Advarsel", "Automatisk oprettelse af notat afbrydes.", {});
}