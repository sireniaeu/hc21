//*******************************************************************//
//*** Flow that updates Cosmic template Ambulant klinisk kontakt  ***//
//*** Not all keywords (nøgleord) in the template are encoded     ***//
//*******************************************************************//

var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

try {
  
  /**************************/
  /*** Set type of note   ***/
  /**************************/

  var skabelontype = "Ambulant klinisk kontakt";
  Flow.run('Skift skabelon', {'nyskab': skabelontype});
  Settings.CommandRetries = StdRetry;
  
  //*******************************//
  //*** Creation of Cosmic Note ***//
  //*******************************//
 
  /*** Udarbejdet af ***/
  if (Pudarbejdetaf !== "N/A"){
    try {
      Fields['Notat - NavigatorTree'].select("Udarbejdet af");
      Fields["Notat - Fritekst"].input(Pudarbejdetaf);
    } catch (e) {
      Dialog.warn('Advarsel', 'Udarbejdet af kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /**** Select Objektiv Undersøgelse Øjenundersøgelse ***/  
  if (Pobjektivundersogelse !== "N/A"){
    try {
      Fields["Notat - NavigatorTree"].select("Objektiv undersøgelse");
      Fields["Notat - Fast værdi arrow"].click();
      Fields["Notat - Fast værdi"].select(Pobjektivundersogelse); 
    } catch (e) {
      Dialog.warn('Advarsel', 'Objektiv undersøgelse kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /*** Diagnoser   ***/
  if (Pdiagnose1 !== "N/A"){
    try {
      Fields['Notat - NavigatorTree'].select("Diagnoser");
      Fields['Notat - Find Koder - Kodetype'].select("Diagnoser");
      Fields['Notat - Find Koder - Text'].input(Pdiagnose1);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(Pdiagnose1);
      Fields['Notat - Find Koder - Tilføj'].click();
    } catch (e) {
      Dialog.warn('Advarsel', 'Objektiv undersøgelse kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /*** Procedurer - set Ressource ***/  
  if (Pressource !== "N/A") {  
    try {
      Fields["Notat - Resource - Ret"].click();
      try {
        Wait.forMilliseconds(1000);
        Fields["Notat - Resource - Tilføj"].click();
        Fields["Notat - Resource - OK"].click();
      } catch (e) {
        Settings.CommandRetries = StdRetry;
        Dialog.warn('Advarsel', "Kliniker findes ikke i listen.", {});
        Fields["Cave - Annullér knap"].click();
      }
    } catch (e) {
      Dialog.warn('Advarsel', 'Ressource kan ikke opdateres', { 'timeout': 5 });
    }
  }

  /***********************/
  /*** Behandlingsplan ***/ 
  /***********************/

  /*** Konklusion og plan ***/
  if (Pkonklusionogplan !== "N/A"){
    try {
      Fields['Notat - NavigatorTree'].select("Konklusion og plan");
      Fields['Notat - Konklusion og plan - Text'].input(Pkonklusionogplan);
    } catch (e) {
      Dialog.warn("Advarsel", "'Konklusion og plan' kan ikke opdateres.", { 'timeout': 5 });
    }
  }
  
  /*** Ordination af medicin ***/
  if (Pordinationafmedicin !== "N/A"){
    try {    
      Fields['Notat - NavigatorTree'].select("medicin");
      Fields['Notat - Fritekst'].input(Pordinationafmedicin);                                                 
    } catch (e) {
    Dialog.warn("Advarsel", "'Ordination af medicin' kan ikke opdateres.", { 'timeout': 5 });
    }
  }

  /*** Ordinationer, øvrige ***/
  if (Pordinationer2 !== "N/A"){
    try {
      Fields['Notat - NavigatorTree'].select("Ordinationer, øvrige");
      Fields['Notat - Fritekst'].input(Pordinationer2);
    } catch (e) {
      Dialog.warn('Advarsel', 'Ordinationer, øvrige kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /*** Information/accept ***/
  if (Pinformation !== "N/A"){
    try {
      Fields['Notat - NavigatorTree'].select("Information");    
      Fields['Notat - Fritekst'].input(Pinformation);
    } catch (e) {
      Dialog.warn('Advarsel', 'Information/accept kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /*** Trin 2    ***/
  if (Ptrin2 !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Trin 2"); 
      Fields['Notat - Fast værdi'].select("Udført");
    }
    catch (e){
      Dialog.warn('Advarsel', 'Trin 2 kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  if (Ptrin2tekst !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Trin 2"); 
      Fields['Notat - Fritekst'].input(Ptrin2tekst);
    }
    catch (e){
      Dialog.warn('Advarsel', 'Trin 2 tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /*** Brevskabeloner ***/
  // N/A

  /*** Kontaktpersoner ***/
  if (Pkontaktperson !== "N/A"){
      try {
      Fields['Notat - NavigatorTree'].select("Kontaktperson(er)");
      Fields['Notat - Fast værdi'].select(Pkontaktperson);
    }
    catch (e) {
      Dialog.warn('Advarsel', 'Kontaktperson(er) kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  if (Pkontaktpersontekst !== "N/A"){
    try {
      Fields['Notat - NavigatorTree'].select("Kontaktperson(er)");
      Fields['Notat - Fritekst'].input(Pkontaktpersontekst);
    } catch (e) {
      Dialog.warn('Advarsel', 'Kontaktperson(er) tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }

  /*** Hændelser i FMK ***/
  if (Pfmk !== "N/A") {
    try {
      Fields['Notat - NavigatorTree'].select("Hændelser i FMK");
      Fields['Notat - Fritekst'].input(Pfmk);
    } catch (e) {
      Dialog.warn('Advarsel', 'Hændelser i FMK kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
  /*** Skal sendes ***/
  if (Pskalsendes !== "N/A"){  
    try {
      Fields['Notat - NavigatorTree'].select("Skal sendes");
      Fields['Notat - Fast værdi'].select("Ja");
    } catch (e) {
      Dialog.warn("Advarsel", "'Skal sendes' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen.", { 'timeout': 5 }); 
    }
  }
  

  /*** End with setting focus at predefined field ***/
  if (Plastfield !== "N/A"){
    Fields['Notat - NavigatorTree'].select("" + Plastfield + "");
  }
    
  /*** General catch of throw's throughout the flow ***/
} catch (e) {	
  var err = "Automatisk oprettelse af notat afbrydes. " + e;
  Dialog.warn("Advarsel", err, {});
  throw err;
}