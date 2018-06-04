//******************************************************************************************//
//*** Cosmic flow to capture OR Procedure information and creation of outpatient OR note ***//
//******************************************************************************************//
var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

try {
  
/**************************/
/*** Set type of note   ***/
/**************************/
Settings.CommandRetries = 7;
  var skabelontype = "Assistance";
  try {
    var ExistingSkabelon = Fields["Notat - Skabelon for Read"].read();
    if (skabelontype !== ExistingSkabelon)
    {     
     try {
      Fields['Notat - Skabelon'].select(skabelontype);
      if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Plejedata") {
      Fields["Notat - Skift skabelon"].click();
      }
     Wait.forField(Fields["Notat - Skabelon for Read"], 10);
     } catch (e) {
             try {
                 Fields['Notat - Skabelon'].select("Tilføj flere alternativer...");
                 if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Plejedata") {
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
  
/****************/
/*** Anamnese ***/
/****************/
  if (ASSanamnese !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Anamnese"); 
      Fields['Notat - Fast værdi'].select(ASSanamnese);
    }
    catch (e){
      Dialog.warn('Advarsel', 'Anamnese drop-down kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  if (ASSanamnesetekst !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Anamnese"); 
      Fields['Notat - Fritekst'].input(ASSanamnesetekst);
    }
    catch (e){
      Dialog.warn('Advarsel', 'Anamnese tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
/***************/
/*** Alkohol ***/
/***************/
  if (ASSalkohol !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Alkohol"); 
      Fields['Notat - Fast værdi'].select(ASSalkohol);
    }
    catch (e){
      Dialog.warn('Advarsel', 'Alkohol drop-down kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  if (ASSalkoholtekst !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Alkohol"); 
      Fields['Notat - Fritekst'].input(ASSalkoholtekst);
    }
    catch (e){
      Dialog.warn('Advarsel', 'Alkohol tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
/*************/
/*** Tobak ***/
/*************/
  if (ASStobak !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Tobak"); 
      Fields['Notat - Fast værdi'].select(ASStobak);
    }
    catch (e){
      Dialog.warn('Advarsel', 'Tobak drop-down kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  if (ASStobaktekst !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Tobak"); 
      Fields['Notat - Fritekst'].input(ASStobaktekst);
    }
    catch (e){
      Dialog.warn('Advarsel', 'Tobak tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
/*****************************/
/*** Objektiv undersøgelse ***/
/*****************************/

  Fields["Notat - NavigatorTree"].select("Objektiv undersøgelse");
  Fields["Notat - Fast værdi arrow"].click();
  Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
 
 //** Select 'Anamnese' in order for the template to expand "Objectiv undersøgelse"
 Fields['Notat - NavigatorTree'].select("Anamnese");
  
  Fields["Notat - NavigatorTree"].select("Pupiller");
  try {
  Fields["Notat - Fritekst"].input(ASSpupiller);
  } catch (e) {
    Dialog.warn("Advarsel", "Fritekst i Pupiller ikke fundet"); }
  
  Fields["Notat - NavigatorTree"].select("Spaltelampe");
  try {
  Fields["Notat - Fritekst"].input(ASSspaltelampe);
   } catch (e) {
    Dialog.warn("Advarsel", "Spaltelampe ikke fundet"); }
  
Fields['Notat - NavigatorTree'].select("Oftalmoskopi");
 try {
Fields["Notat - Fritekst"].input(ASSoftalmoskopi);
 } catch (e) {
   Dialog.warn("Advarsel", "Oftalmoskopi ikke fundet"); }
  
/********************************/
/*** Undersøgelser/procedurer ***/
/********************************/
if (ASSundersoegproc !== "N/A") {
  try {
    Fields['Notat - NavigatorTree'].select("Undersøgelse");
    Fields['Notat - Fritekst'].input(ASSundersoegproc);
  } catch (e) {
      Dialog.warn('Advarsel', 'Undersøgelser/procedurer kan ikke opdateres.', { 'timeout': 5 });
}
}

/***************/
/*** Skopier ***/
/***************/
if (ASSskopier !== "N/A") {
  try {
    Fields['Notat - NavigatorTree'].select("Skopier");
    Fields['Notat - Fritekst'].input(ASSskopier);
  } catch (e) {
      Dialog.warn('Advarsel', 'Skopier kan ikke opdateres.', { 'timeout': 5 });
}
}

/*************************/
/*** Ultralydskanning ***/
/*************************/
if (ASSultralyd !== "N/A") {
  try {
    Fields['Notat - NavigatorTree'].select("Ultralydskanning");
    Fields['Notat - Fritekst'].input(ASSultralyd);
  } catch (e) {
      Dialog.warn('Advarsel', 'Ultralydskanning kan ikke opdateres.', { 'timeout': 5 });
}
}

/********************/
/*** Undersøgelse ***/
/********************/
if (ASSundersoegelse !== "N/A") {
  try {
    Fields['Notat - NavigatorTree'].selectWithOffset("Undersøgelse", 3);
    Fields['Notat - Fritekst'].input(ASSundersoegelse);
  } catch (e) {
      Dialog.warn('Advarsel', 'Undersøgelse kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/*** Behandlingsplan ***/  
  
/**************************/
/*** Konklusion og plan ***/
/**************************/
if (ASSkonklusionogplan !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Konklusion og plan");
    Fields['Notat - Konklusion og plan - Text'].input(ASSkonklusionogplan);
  } catch (e) {
  Dialog.warn("Advarsel", "'Konklusion og plan' kan ikke opdateres.", { 'timeout': 5 });
  }
  }
  
/******************/
/*** Procedurer ***/
/******************/

/*** Procedure 1 ***/  
if (ASSProcedureCode1 !== "N/A"){  
  try {
      Fields['Notat - NavigatorTree'].select("Procedurer");
      Fields['Notat - Find Koder - Text'].input(ASSProcedureCode1);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(ASSProcedureCode1);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(ASSd + ASSm + ASSy);
//    Fields["Notat - Kalender knap"].click();
//    Wait.forField(Fields["Notat - Kalender måned"],4);
//    Fields['OK button'].click();
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(ASSh + ASSi);
      Fields['Notat - Find Koder - Tilføj'].click();
  
/*** Set 'Tillægskoder' ***/
if (ASSProcedureCode1add1 !== "N/A"){  
Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ASSProcedureCode1, 0, 0);
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
Fields['Notat - Find Koder - Text'].input(ASSProcedureCode1add1);  
Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select(ASSProcedureCode1add1);
Fields['Notat - Find Koder - Tilføj'].click();
 }
if (ASSProcedureCode1add2 !== "N/A"){  
Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ASSProcedureCode1, 0, 0);
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
Fields['Notat - Find Koder - Text'].input(ASSProcedureCode1add2);
Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select(ASSProcedureCode1add2);
Fields['Notat - Find Koder - Tilføj'].click();
}
if (ASSProcedureCode1add3 !== "N/A"){  
Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ASSProcedureCode1, 0, 0);
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
Fields['Notat - Find Koder - Text'].input(ASSProcedureCode1add3);
Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select(AOProcedureCode1add3);
Fields['Notat - Find Koder - Tilføj'].click();
}
  } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 1 kan ikke opdateres', { 'timeout': 5 });
  }
 }

/*** Procedure 2 ***/  
if (ASSProcedureCode2 !== "N/A"){  
  try {
      Fields['Notat - NavigatorTree'].select("Procedurer");
      Fields['Notat - Find Koder - Text'].input(ASSProcedureCode2);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(ASSProcedureCode2);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(ASSd + ASSm + ASSy);
//    Fields["Notat - Kalender knap"].click();
//    Wait.forField(Fields["Notat - Kalender måned"],4);
//    Fields['OK button'].click();
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(ASSh + ASSi);
      Fields['Notat - Find Koder - Tilføj'].click();
    
/*** Set 'Tillægskoder' ***/
if (ASSProcedureCode2add1 !== "N/A"){  
Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ASSProcedureCode1, 0, 1);
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
Fields['Notat - Find Koder - Text'].input(ASSProcedureCode2add1);  
Fields['Notat - Find Koder - Søg'].click();
Fields['Notat - Find Koder - Resultat'].select(ASSProcedureCode2add1);
Fields['Notat - Find Koder - Tilføj'].click();
 }
} catch (e) {
      Dialog.warn('Advarsel', 'Procedure 2 kan ikke opdateres', { 'timeout': 5 });
  }
 }  

/*** Procedure 3 ***/  
if (ASSProcedureCode3 !== "N/A"){  
  try {
      Fields['Notat - NavigatorTree'].select("Procedurer");
      Fields['Notat - Find Koder - Text'].input(ASSProcedureCode3);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(ASSProcedureCode3);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(ASSd + ASSm + ASSy);
//    Fields["Notat - Kalender knap"].click();
//    Wait.forField(Fields["Notat - Kalender måned"],4);
//    Fields['OK button'].click();
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(ASSh + ASSi);
      Fields['Notat - Find Koder - Tilføj'].click();
  } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 3 kan ikke opdateres', { 'timeout': 5 });
  }
 }
    
/*** Procedure 4 ***/  
if (ASSProcedureCode4 !== "N/A"){  
  try {
      Fields['Notat - NavigatorTree'].select("Procedurer");
      Fields['Notat - Find Koder - Text'].input(ASSProcedureCode4);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(ASSProcedureCode4);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(ASSd + ASSm + ASSy);
//    Fields["Notat - Kalender knap"].click();
//    Wait.forField(Fields["Notat - Kalender måned"],4);
//    Fields['OK button'].click();
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(ASSh + ASSi);
      Fields['Notat - Find Koder - Tilføj'].click();
  } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 4 kan ikke opdateres', { 'timeout': 5 });
  }
 }
  
/*** Procedure 5 ***/  
if (ASSProcedureCode5 !== "N/A"){  
  try {
      Fields['Notat - NavigatorTree'].select("Procedurer");
      Fields['Notat - Find Koder - Text'].input(ASSProcedureCode5);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(ASSProcedureCode5);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(ASSd + ASSm + ASSy);
//    Fields["Notat - Kalender knap"].click();
//    Wait.forField(Fields["Notat - Kalender måned"],4);
//    Fields['OK button'].click();
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(ASSh + ASSi);
      Fields['Notat - Find Koder - Tilføj'].click();
  } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 5 kan ikke opdateres', { 'timeout': 5 });
  }
 }
  
/*** Procedure 6 ***/  
if (ASSProcedureCode6 !== "N/A"){  
  try {
      Fields['Notat - NavigatorTree'].select("Procedurer");
      Fields['Notat - Find Koder - Text'].input(ASSProcedureCode6);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(ASSProcedureCode6);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(ASSd + ASSm + ASSy);
//    Fields["Notat - Kalender knap"].click();
//    Wait.forField(Fields["Notat - Kalender måned"],4);
//    Fields['OK button'].click();
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(ASSh + ASSi);
      Fields['Notat - Find Koder - Tilføj'].click();
  } catch (e) {
      Dialog.warn('Advarsel', 'Procedure 6 kan ikke opdateres', { 'timeout': 5 });
  }
 }

/*** Procedurer - set Ressource ***/  
if (ASSRessource !== "N/A"){  
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
      Dialog.warn('Advarsel', "Kliniker findes ikke i listen.", {});
      Fields["Cave - Annullér knap"].click();
    }
  } catch (e) {
    Dialog.warn('Advarsel', 'Ressource kan ikke opdateres', { 'timeout': 5 });
  }
}
  
/*****************************/
/*** Ordination af medicin ***/
/*****************************/
if (ASSordinationafmedicin !== "N/A"){
  try {    
    Fields['Notat - NavigatorTree'].select("medicin");
    Fields['Notat - Fritekst'].input(ASSordinationafmedicin);                                                 
  } catch (e) {
  Dialog.warn("Advarsel", "'Ordination af medicin' kan ikke opdateres.", { 'timeout': 5 });
  }
}
  
/****************************/
/*** Ordinationer, øvrige ***/
/****************************/
if (ASSordinationer2 !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Ordinationer, øvrige");
    Fields['Notat - Fritekst'].input(ASSordinationer2);
  } catch (e) {
      Dialog.warn('Advarsel', 'Ordinationer, øvrige kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/**************************/
/*** Information/accept ***/
/**************************/
if (ASSinformation !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Information");
    Fields['Notat - Fritekst'].input(ASSinformation);
  } catch (e) {
      Dialog.warn('Advarsel', 'Information/accept kan ikke opdateres.', { 'timeout': 5 });
}
}  
  
/*****************/
/*** Trin 2    ***/
/*****************/
  if (ASStrin2 !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Trin 2"); 
      Fields['Notat - Fast værdi'].select("Udført");
    }
    catch (e){
      Dialog.warn('Advarsel', 'Trin 2 drop-down kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  if (ASStrin2tekst !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Trin 2"); 
      Fields['Notat - Fritekst'].input(ASStrin2tekst);
    }
    catch (e){
      Dialog.warn('Advarsel', 'Trin 2 tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }
   
/*******************************/
/*** Entry on dictation list ***/
/*******************************/
  if (ASSdictate !== "N/A"){  
 try {
Fields["Menu - Journal"].click();
Fields["Menu - Digital diktering"].click();
Fields["Digital diktering - Opret nyt diktat"].click();
Fields["Digital diktering - record start"].click();
Wait.forSeconds(1);
Fields["Digital diktering - record stop"].click();
Fields["Digital diktering - Kommentar"].input(ASSmessage);
Fields["Digital diktering - Kategori"].select("Operationsnotat");
Fields["Digital diktering - prioritet1"].click();
Fields["Digital diktering - Gem og afslut"].click();
  } catch (e) {
    Dialog.warn("Advarsel", "'Diktat til sekretær med besked' kan ikke oprettes.", { 'timeout': 5 }); 
  }
  }
  
//**************************************************//  
//*** End with setting focus at predefined field ***//
//**************************************************//  
  if (ASSlastfield !== "N/A"){
  Fields['Notat - NavigatorTree'].select("" + ASSlastfield + "");
  }
  
//******************//  
//*** Save draft ***//
//******************//  
  
  if (ASSgemkladde !== "N/A"){
    Fields["Gem kladde"].click();
  }
  
//****************************************************//  
//*** General catch of throw's throughout the flow ***//
//****************************************************//  
} catch (e) {	
  Dialog.warn("Advarsel", "Automatisk oprettelse af notat afbrydes.", {});
}