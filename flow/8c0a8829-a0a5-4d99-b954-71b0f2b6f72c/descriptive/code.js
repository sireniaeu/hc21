//******************************************************************************************//
//*** Cosmic flow to capture OR Procedure information and creation of OR note ***//
//******************************************************************************************//

var StdRetry = 9;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

try {
  var skabelontype = "Høreprøve, øreprop, tilpasning og justering";
  Flow.run('Skift skabelon', {'nyskab': skabelontype});

  
/*  try {
    var ExistingSkabelon = Fields["Notat - Skabelon for Read"].read();
    if (skabelontype !== ExistingSkabelon) 
    {  
      try {
        Settings.CommandRetries = 5;
        Fields['Notat - Skabelon'].select(skabelontype);
        if (ExistingSkabelon !== "<Vælg skabelon>") { 
          Fields["Notat - Skift skabelon"].click();
        }
      } catch (e) {
        try {
          Fields['Notat - Skabelon'].select("Tilføj flere alternativer...");
          if (ExistingSkabelon !== "<Vælg skabelon>") {
            Fields["Notat - Skift skabelon"].click();
          }
          Fields["Notat - Alternative skabeloner"].select(skabelontype);
          Fields["Notat - Tilføj skabelon"].click();
          Fields["Cave - OK knap"].click();
        } catch (e) {
          Dialog.warn('Advarsel', skabelontype + ' kan ikke vælges.');
        } 
      }
    }
  } catch (e) {
    Dialog.warn('Advarsel', 'Skabelon kan ikke vælges.', { 'timeout': 5 });
  }*/
  Settings.CommandRetries = StdRetry;
 
  //*******************************//
  //*** Creation of Cosmic Note ***//
  //*******************************//
  
  /********************/
  /***     Enhed    ***/
  /********************/
  if (AOenhed !== "N/A"){
    try {
      //var renhed = Fields["Notat - Afdeling Enhed"].read();
      Fields["Notat - Afdeling Enhed"].select(".*" + AOenhed + ".*");
    } catch (e) {
      Dialog.warn('Advarsel', 'Denne Enhed kan ikke vælges:\n' + AOenhed + '\n\nVælg korrekt enhed og tast OK.');
    }
  } 
  
  /***********************/
  /*** Kontaktperson   ***/
  /***********************/
  if (AOkontaktperson !== "N/A"){ 
    try {
      Fields['Notat - NavigatorTree'].select("Kontaktperson");
      Fields['Notat - Fast værdi'].select(AOkontaktperson);
      if (AOkontaktpersontekst !== "N/A"){   
        try {
          Fields['Notat - Fritekst'].input(AOkontaktpersontekst);
        } catch (e) {
          Dialog.warn('Advarsel', 'Kontaktperson(er) tekst kan ikke opdateres.', { 'timeout': 5 });
        }
      }
    } catch (e) {
      Dialog.warn('Advarsel', 'Kontaktperson(er) kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /****************/
  /*** Visitkor ***/
  /****************/
  if (AOvisitkort !== "N/A"){ 
    try {
      Fields['Notat - NavigatorTree'].select("Visitkort");
      Fields['Notat - Fast værdi'].select(AOvisitkort);
      if (AOvisitkorttekst !== "N/A"){   
        try {
          Fields['Notat - Fritekst'].input(AOvisitkorttekst);
        } catch (e) {
          Dialog.warn('Advarsel', 'Visitkort tekst kan ikke opdateres.', { 'timeout': 5 });
        }
      }
    } catch (e) {
      Dialog.warn('Advarsel', 'Visitkort kan ikke opdateres.', { 'timeout': 5 });
    }
  }
 
  /****************/
  /*** Samtykke ***/
  /****************/
  if (AOsamtykke !== "N/A"){
    try {
      Fields['Notat - NavigatorTree'].select("Samtykke");
      Fields['Notat - Fritekst'].input(AOsamtykke);
    } catch (e) {
      Dialog.warn('Advarsel', 'Samtykke kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /*****************************/
  /*** Objektiv undersøgelse ***/
  /*****************************/
  if (AOobjektivundersoegelse !== "N/A"){  
    try { 
      Fields['Notat - NavigatorTree'].select("Objektiv unders");
      Fields['Notat - Fritekst'].input(AOobjektivundersoegelse);
    } catch (e) {
      Dialog.warn("Advarsel", "Objektiv undersøgelse kan ikke opdateres."); 
    } 
  }

  /********************/
  /*** Audiometri   ***/
  /********************/
  if (AOaudiometri !== "N/A"){
    try {
      Fields['Notat - NavigatorTree'].select("Audiometri");
      Fields["Notat - Fritekst"].input(AOaudiometri);
    } catch (e) {
      Dialog.warn('Advarsel', 'Audiometri kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /********************************/
  /*** Angivelsesnøjagtighed   ***/
  /********************************/
  if (AOangivelsesnoejagtighed !== "N/A"){ 
    try {
      Fields['Notat - NavigatorTree'].select("Angivelsesn");
      Fields['Notat - Fast værdi'].select(AOangivelsesnoejagtighed);
      if (AOangivelsesnoejagtighedtekst !== "N/A"){   
        try {
          Fields['Notat - Fritekst'].input(AOangivelsesnoejagtighedtekst);
        } catch (e) {
          Dialog.warn('Advarsel', 'Angivelsesnøjagtighedtekst tekst kan ikke opdateres.', { 'timeout': 5 });
        }
      }
    } catch (e) {
      Dialog.warn('Advarsel', 'Angivelsesnøjagtighed kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /***************************/
  /*** Frifeltsaudiometri  ***/
  /***************************/
  if (AOfrifeltsaudiometri !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("Frifeltsaudiometri");
      Fields['Notat - Fritekst'].input(AOfrifeltsaudiometri);
    } catch (e) {
      Dialog.warn('Advarsel', 'Frifeltsaudiometri kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /***************************/
  /*** Behandlingsforslag  ***/
  /***************************/
  if (AObehandlingsforslag !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("Behandlingsforslag");
      Fields['Notat - Fritekst'].input(AObehandlingsforslag);
    } catch (e) {
      Dialog.warn('Advarsel', 'Behandlingsforslag kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /********************************************/
  /*** Farve høreapparat / speechprocessor  ***/
  /********************************************/
  if (AOfarve !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("Farve h");
      Fields['Notat - Fritekst'].input(AOfarve);
    } catch (e) {
      Dialog.warn('Advarsel', 'Farve høreapparat kan ikke opdateres.', { 'timeout': 5 });
    }
  }
     
  /********************************************/
  /*** Øreprop / ventilation  ***/
  /********************************************/
  if (AObehoereprop !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("**/Objektiv*/Behandlingsforslag*/Øreprop*");
      Fields['Notat - Fritekst'].input(AObehoereprop);
    } catch (e) {
      Dialog.warn('Advarsel', 'Øreprop / ventilation kan ikke opdateres.', { 'timeout': 5 });
    }
  }
   
  /********************/
  /*** Tilpasning   ***/
  /********************/
  if (AOtilpasning !== "N/A"){ 
    try {
      Fields['Notat - NavigatorTree'].select("Tilpasning");
      Fields['Notat - Fast værdi'].select(AOtilpasning);

    } catch (e) {
      Dialog.warn('Advarsel', 'Tilpasning kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /************************/
  /*** Tilpasning tekst ***/
  /************************/
  if (AOtilpasningtekst !== "N/A"){   
    try {
      Fields['Notat - NavigatorTree'].select("Tilpasning");
      Fields['Notat - Fritekst'].input(AOtilpasningtekst);
    } catch (e) {
      Dialog.warn('Advarsel', 'Tilpasning tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /********************************************/
  /*** Fabrikat / type / farve  ***/
  /********************************************/
  if (AOtilpfabrikat !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("**/Tilpasning*/Fabrikat *");
      Fields['Notat - Fritekst'].input(AOtilpfabrikat);
    } catch (e) {
      Dialog.warn('Advarsel', 'Fabrikat / type / farve kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /********************/
  /*** Programvalg  ***/
  /********************/
  if (AOtilpprogramvalg !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("**/Tilp*/Programvalg*");
      Fields['Notat - Fritekst'].input(AOtilpprogramvalg);
    } catch (e) {
      Dialog.warn('Advarsel', 'Programvalg kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /*********************************/
  /*** Slangestørrelse / Øretip  ***/
  /*********************************/
  if (AOtilpslange !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("**/Tilpasning*/Slangest*");
      Fields['Notat - Fritekst'].input(AOtilpslange);
    } catch (e) {
      Dialog.warn('Advarsel', 'Slangestørrelse kan ikke opdateres.', { 'timeout': 5 });
    }
  }
 
  /******************************/
  /*** Øreprop / ventilation  ***/
  /******************************/
  
  if (AOtilpoereprop !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("**/Tilpasning*/Øreprop*");
      /*Fields['Notat - NavigatorTree'].selectWithOffsetAndSkip("Øreprop", 1, 0);*/
      Fields['Notat - Fritekst'].input(AOtilpoereprop);
    } catch (e) {
      Dialog.warn('Advarsel', 'Øreprop / ventilation kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /********************/
  /*** Justering   ***/
  /********************/
  if (AOjustering !== "N/A"){ 
    try {
      Fields['Notat - NavigatorTree'].select("Justering");
      Fields['Notat - Fast værdi'].select(AOjustering);
    } catch (e) {
      Dialog.warn('Advarsel', 'Justering kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /************************/
  /*** Justering tekst  ***/
  /************************/
  if (AOjusteringtekst !== "N/A"){   
    try {
      Fields['Notat - NavigatorTree'].select("Justering");
      Fields['Notat - Fritekst'].input(AOjusteringtekst);
    } catch (e) {
      Dialog.warn('Advarsel', 'Justering tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /********************************************/
  /*** Fabrikat / type / farve  ***/
  /********************************************/
  if (AOjustfabrikat !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("**/Justering*/Fabrikat *");
      Fields['Notat - Fritekst'].input(AOjustfabrikat);
    } catch (e) {
      Dialog.warn('Advarsel', 'Fabrikat / type / farve kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /********************/
  /*** Programvalg  ***/
  /********************/
  if (AOjustprogramvalg !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("**/Justering*/Programvalg*");
      Fields['Notat - Fritekst'].input(AOjustprogramvalg);
    } catch (e) {
      Dialog.warn('Advarsel', 'Programvalg kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /*********************************/
  /*** Slangestørrelse / Øretip  ***/
  /*********************************/
  if (AOjustslange !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("**/Justering*/Slangest*");
      Fields['Notat - Fritekst'].input(AOjustslange);
    } catch (e) {
      Dialog.warn('Advarsel', 'Slangestørrelse kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /******************************/
  /*** Øreprop / ventilation  ***/
  /******************************/
  
  if (AOjustoereprop !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("**/Justering*/Øreprop*");
      Fields['Notat - Fritekst'].input(AOjustoereprop);
    } catch (e) {
      Dialog.warn('Advarsel', 'Øreprop / ventilation kan ikke opdateres.', { 'timeout': 5 });
    }
  }
    
  /*******************/
  /*** Diagnoser   ***/
  /*******************/
  if (AODiagnose1 !== "N/A"){
    Fields['Notat - NavigatorTree'].select("Diagnoser");
    Fields['Notat - Find Koder - Kodetype'].select("Diagnoser");
    Fields['Notat - Find Koder - Text'].input(AODiagnose1);
    Fields['Notat - Find Koder - Søg'].click();
    Fields['Notat - Find Koder - Resultat'].select(AODiagnose1);
    Fields['Notat - Find Koder - Tilføj'].click();
  }

  /*** Set 'Tillægskoder' ***/
  if (AODiagnose1add1 !== "N/A"){  
    Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(AODiagnose1, 0, 0);
    Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
    Fields['Notat - Find Koder - Text'].input(AODiagnose1add1);  
    Fields['Notat - Find Koder - Søg'].click();
    Fields['Notat - Find Koder - Resultat'].select(AODiagnose1add1);
    Fields['Notat - Find Koder - Tilføj'].click();
  }
  
  /******************/
  /*** Procedurer ***/
  /******************/

  /*** Procedure 1 ***/  
  if (AOProcedureCode1 !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("rocedurer");
      Fields['Notat - Find Koder - Text'].input(AOProcedureCode1);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode1);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(AOd + AOm + AOy);
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(AOh + AOi);
      Fields['Notat - Find Koder - Tilføj'].click();
  
      /*** Set 'Tillægskoder' ***/
      if (AOProcedureCode1add1 !== "N/A"){  
        Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(AOProcedureCode1, 0, 0);
        Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
        Fields['Notat - Find Koder - Text'].input(AOProcedureCode1add1);  
        Fields['Notat - Find Koder - Søg'].click();
        Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode1add1);
        Fields['Notat - Find Koder - Tilføj'].click();
      }
      if (AOProcedureCode1add2 !== "N/A"){  
        Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(AOProcedureCode1, 0, 0);
        Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
        Fields['Notat - Find Koder - Text'].input(AOProcedureCode1add2);
        Fields['Notat - Find Koder - Søg'].click();
        Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode1add2);
        Fields['Notat - Find Koder - Tilføj'].click();}
      if (AOProcedureCode1add3 !== "N/A"){  
        Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(AOProcedureCode1, 0, 0);
        Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
        Fields['Notat - Find Koder - Text'].input(AOProcedureCode1add3);
        Fields['Notat - Find Koder - Søg'].click();
        Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode1add3);
        Fields['Notat - Find Koder - Tilføj'].click();
      }
    } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 1 kan ikke opdateres', { 'timeout': 5 });
    }
  }
  /*** Procedure 2 ***/  
  if (AOProcedureCode2 !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("rocedurer");
      Fields['Notat - Find Koder - Text'].input(AOProcedureCode2);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode2);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(AOd + AOm + AOy);
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(AOh + AOi);
      Fields['Notat - Find Koder - Tilføj'].click();
    
      /*** Set 'Tillægskoder' ***/
      if (AOProcedureCode2add1 !== "N/A"){  
        Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(AOProcedureCode1, 0, 1);
        Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
        Fields['Notat - Find Koder - Text'].input(AOProcedureCode2add1);  
        Fields['Notat - Find Koder - Søg'].click();
        Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode2add1);
        Fields['Notat - Find Koder - Tilføj'].click();
      }
    } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 2 kan ikke opdateres', { 'timeout': 5 });
    }
  }  

  /*** Procedure 3 ***/  
  if (AOProcedureCode3 !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("rocedurer");
      Fields['Notat - Find Koder - Text'].input(AOProcedureCode3);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode3);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(AOd + AOm + AOy);
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(AOh + AOi);
      Fields['Notat - Find Koder - Tilføj'].click();
    } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 3 kan ikke opdateres', { 'timeout': 5 });
    }
  }
    
  /*** Procedure 4 ***/  
  if (AOProcedureCode4 !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("rocedurer");
      Fields['Notat - Find Koder - Text'].input(AOProcedureCode4);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode4);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(AOd + AOm + AOy);
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(AOh + AOi);
      Fields['Notat - Find Koder - Tilføj'].click();
    } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 4 kan ikke opdateres', { 'timeout': 5 });
    }
  }
  
  /*** Procedure 5 ***/  
  if (AOProcedureCode5 !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("rocedurer");
      Fields['Notat - Find Koder - Text'].input(AOProcedureCode5);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode5);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(AOd + AOm + AOy);
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(AOh + AOi);
      Fields['Notat - Find Koder - Tilføj'].click();
    } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 5 kan ikke opdateres', { 'timeout': 5 });
    }
  }
  
  /*** Procedure 6 ***/  
  if (AOProcedureCode6 !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("rocedurer");
      Fields['Notat - Find Koder - Text'].input(AOProcedureCode6);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode6);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(AOd + AOm + AOy);
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(AOh + AOi);
      Fields['Notat - Find Koder - Tilføj'].click();
    } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 6 kan ikke opdateres', { 'timeout': 5 });
    }
  }

  /*** Procedurer - set Ressource ***/  
  if (AORessource !== "N/A"){  
    //  var cn = Fields["Notat - Kliniker"].read().items[0].match(/([^\(]+)\s+\(([^\)]+)\)\s*(.*)/);
    try {
      Fields["Notat - Resource - Ret"].click();
      try {
        //      Settings.CommandRetries = 9;
        //      Fields["Notat - Resource - Kliniker"].select(".*" + cn[1]+" .*");
        //      Settings.CommandRetries = 15;
        Wait.forMilliseconds(1000);
        Fields["Notat - Resource - Tilføj"].click();
        Fields["Notat - Resource - OK"].click();
      } catch (e) {
        Settings.CommandRetries = StdRetry;
        Dialog.warn('Advarsel', "Kliniker " + cn[1] + " findes ikke i listen.");
        Fields["Cave - Annullér knap"].click();
      }
    } catch (e) {
      Dialog.warn('Advarsel', 'Ressource kan ikke opdateres', { 'timeout': 5 });
    }
  }

  /********************/
  /*** Skal sendes   ***/
  /********************/
  if (AOskalsendes !== "N/A"){ 
    try {
      Fields['Notat - NavigatorTree'].select("Skal sendes");
      Fields['Notat - Fast værdi'].select(AOskalsendes);
    } catch (e) {
      Dialog.warn('Advarsel', 'Skal sendes kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  //**************************************************//  
  //*** End with setting focus at predefined field ***//
  //**************************************************//  
  if (AOlastfield !== "N/A"){
    Fields['Notat - NavigatorTree'].select("" + AOlastfield + "");
  }
  
  //****************************************************//  
  //*** General catch of throw's throughout the flow ***//
  //****************************************************//  
} catch (e) {	
  Dialog.warn("Advarsel", "Automatisk oprettelse af notat afbrydes.");
}