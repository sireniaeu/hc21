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
Settings.CommandRetries = 5;
  //var skabelontype = "Ambulant operationsnotat";
  var skabelontype = "Operationsnotat";
  try {
    var ExistingSkabelon = Fields["Notat - Skabelon for Read"].read();
    if (skabelontype !== ExistingSkabelon)
    {     
     try {
      Fields['Notat - Skabelon'].select(skabelontype);
      Settings.CommandRetries = StdRetry;
      if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Assistance")
      {
      Fields["Notat - Skift skabelon"].click();
      }
      Wait.forField(Fields["Notat - Skabelon for Read"], 8); 
     } catch (e) {
             try {
                 Fields['Notat - Skabelon'].select("Tilføj flere alternativer...");
                 Settings.CommandRetries = StdRetry;
                 if (ExistingSkabelon !== "<Vælg skabelon>" && ExistingSkabelon !== "Assistance")
                 {
                 Fields["Notat - Skift skabelon"].click();
                 }
                 Fields["Notat - Alternative skabeloner"].select(skabelontype);
                 Fields["Notat - Tilføj skabelon"].click();
                 Fields["Cave - OK knap"].click();
                 Wait.forField(Fields["Notat - Skabelon for Read"], 10); 
             } catch (e) {
                 Dialog.warn('Advarsel', skabelontype + ' kan ikke vælges.');
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
 
/*********************/
/*** Udarbejdet af ***/
/*********************/
if (AOudarbejdetaf !== "N/A"){
  try {
     Fields['Notat - NavigatorTree'].select("Udarbejdet af");
     Fields["Notat - Fritekst"].input(AOudarbejdetaf);
  } catch (e) {
      Dialog.warn('Advarsel', 'Udarbejdet af kan ikke opdateres.', { 'timeout': 5 });
  }
}

  
  /********************/
/*** Enhed   ***/
/********************/

  try {
    Fields["Notat - Afdeling Enhed"].select(".* .*"); 
  } catch (e) {
      Dialog.warn('Advarsel', 'Enhed kan ikke opdateres.', { 'timeout': 5 });
  }

/********************/
/*** Indikation   ***/
/********************/
if (AOindikation !== "N/A"){
  try {
     Fields['Notat - NavigatorTree'].select("Indikation");
     Fields["Notat - Fritekst"].input(AOindikation);
  } catch (e) {
      Dialog.warn('Advarsel', 'Indikation kan ikke opdateres.', { 'timeout': 5 });
  }
}
  
/****************/
/*** Trin 1   ***/
/****************/
  if (AOtrin1 !== "N/A"){   
  try {
      Fields['Notat - NavigatorTree'].select("Trin 1");
      Fields['Notat - Fast værdi'].select("Udført");
    }
    catch (e) {
      Dialog.warn('Advarsel', 'Trin 1 kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  if (AOtrin1tekst !== "N/A"){   
  try {
      Fields['Notat - NavigatorTree'].select("Trin 1");
      Fields['Notat - Fritekst'].input(AOtrin1tekst);
    }
    catch (e) {
      Dialog.warn('Advarsel', 'Trin 1 teskt kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  
/****************/
/*** ASA      ***/
/****************/
if (AOasa !== "N/A"){
  try {
      Fields['Notat - NavigatorTree'].select("ASA (American society of Anesthesiologists)");
      Fields['Notat - Fast værdi'].select(AOasa);
    }
    catch (e) {
      Dialog.warn('Advarsel', 'ASA kan ikke opdateres.', { 'timeout': 5 });
    }
}
if (AOasatekst !== "N/A"){
  try {
      Fields['Notat - NavigatorTree'].select("ASA (American society of Anesthesiologists)");
      Fields['Notat - Fritekst'].input(AOasatekst);
    }
    catch (e) {
      Dialog.warn('Advarsel', 'ASA tekst kan ikke opdateres.', { 'timeout': 5 });
    }
}
  
/****************/
/*** Operatør ***/
/****************/
 if (AOoperatoer !== "N/A"){  
   try { 
    Fields['Notat - NavigatorTree'].select("Operatør");
    Fields['Notat - Operatør - Text'].input(AOoperatoer);
  } catch (e) {
    Dialog.warn("Advarsel", "'Operatør' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  } 
 }

/***************************/
/*** Operatørassistent   ***/
/***************************/
if (AOoperatoerassistent !== "N/A"){
  try {
     Fields['Notat - NavigatorTree'].select("Operatørassistent");
     Fields["Notat - Fritekst"].input(AOoperatoerassistent);
  } catch (e) {
      Dialog.warn('Advarsel', 'Operatørassistent kan ikke opdateres.', { 'timeout': 5 });
  }
}

/*********************/
/*** Anæstesitype  ***/
/*********************/
 if (AOanaestesi !== "N/A"){  
 try {
    Fields['Notat - NavigatorTree'].select("Anæstesitype");
    Fields['Notat - Anæstesitype - Text'].input(AOanaestesi);
  } catch (e) {
      Dialog.warn('Advarsel', 'Anæstesi kan ikke opdateres.', { 'timeout': 5 });
  }
 }
     
/************************/
/*** Operationsstatus ***/
/************************/
if (AOoperationsstatus !== "N/A"){
  try {
      Fields['Notat - NavigatorTree'].select("Operationsstatus");
      Fields['Notat - Fast værdi'].select(AOoperationsstatus);
    }
    catch (e) {
      Dialog.warn('Advarsel', 'Operationsstatus kan ikke opdateres.', { 'timeout': 5 });
    }
}
if (AOoperationsstatustekst !== "N/A"){
  try {
      Fields['Notat - NavigatorTree'].select("Operationsstatus");
      Fields['Notat - Fritekst'].input(AOoperationsstatustekst);
    }
    catch (e) {
      Dialog.warn('Advarsel', 'Operationsstatus tekst kan ikke opdateres.', { 'timeout': 5 });
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
Fields['Notat - Find Koder - Tilføj'].click();
}
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
    
/****************************/
/*** Peroperativ patologi ***/
/****************************/
if (AOperoperativpatologi !== "N/A"){
  try {
     Fields['Notat - NavigatorTree'].select("Peroperativ patologi");
     Fields["Notat - Fritekst"].input(AOperoperativpatologi);
  } catch (e) {
      Dialog.warn('Advarsel', 'Peroperativ patologi kan ikke opdateres.', { 'timeout': 5 });
  }
}

/*****************************/
/*** Operationsbeskrivelse ***/
/*****************************/
if (AOoperationsbeskrivelse !== "N/A"){  
   try {
     Fields['Notat - NavigatorTree'].select("Operationsbeskrivelse");
     Fields['Notat - Operationsbeskrivelse - Text'].input(AOoperationsbeskrivelse);
  } catch (e) {
      Dialog.warn('Advarsel', 'Operationsbeskrivelse kan ikke opdateres.', { 'timeout': 5 });
  }
 }
  
/*************************************/
/*** Operationsbeskrivelse fortsat ***/
/*************************************/
if (AOoperationsbeskrivelsefortsat !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Operationsbeskrivelse forsat");
    Fields['Notat - Fritekst'].input(AOoperationsbeskrivelsefortsat);
  } catch (e) {
      Dialog.warn('Advarsel', 'Operationsbeskrivelse fortsat kan ikke opdateres.', { 'timeout': 5 });
}
}

/***************************************/
/*** Operationsbeskrivelse fortsat 2 ***/
/***************************************/
if (AOoperationsbeskrivelsefortsat2 !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Operationsbeskrivelse forsat 2");
    Fields['Notat - Fritekst'].input(AOoperationsbeskrivelsefortsat2);
  } catch (e) {
      Dialog.warn('Advarsel', 'Operationsbeskrivelse fortsat 2 kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/***************************************/
/*** Anvendte implantater / proteser ***/
/***************************************/
if (AOimplantater !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("implantater");
    Fields['Notat - Fritekst'].input(AOimplantater);
  } catch (e) {
      Dialog.warn('Advarsel', 'Anvendte implantater / proteser kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/***********************************/
/*** Præparater til undersøgelse ***/
/***********************************/
if (AOpraeparater !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Præparater til undersøgelse");
    Fields['Notat - Fritekst'].input(AOpraeparater);
  } catch (e) {
      Dialog.warn('Advarsel', 'Præparater til undersøgelse kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/*********************/
/*** Præparat vægt ***/
/*********************/
if (AOpraeparatvaegt !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Præparat vægt");
    Fields['Notat - Fritekst'].input(AOpraeparatvaegt);
  } catch (e) {
      Dialog.warn('Advarsel', 'Præparat vægt kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/***************/
/*** Blodtab ***/
/***************/
if (AOblodtab !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Blodtab");
    Fields['Notat - Fritekst'].input(AOblodtab);
  } catch (e) {
      Dialog.warn('Advarsel', 'Blodtab kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/**************************/
/*** Konklusion og plan ***/
/**************************/
if (AOkonklusionogplan !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Konklusion og plan");
    Fields['Notat - Konklusion og plan - Text'].input(AOkonklusionogplan);
  } catch (e) {
  Dialog.warn("Advarsel", "'Konklusion og plan' kan ikke opdateres."); }
  }
  
/*************************/
/*** Postoperativ plan ***/
/*************************/
if (AOpostoperativplan !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Postoperativ plan");
    Fields['Notat - Fritekst'].input(AOpostoperativplan);
  } catch (e) {
      Dialog.warn('Advarsel', 'Postoperativ plan kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/*****************************/
/*** Ordination af medicin ***/
/*****************************/
if (AOordinationafmedicin !== "N/A"){
  try {    
    Fields['Notat - NavigatorTree'].select("medicin");
    Fields['Notat - Fritekst'].input(AOordinationafmedicin);                                                 
  } catch (e) {
  Dialog.warn("Advarsel", "'Ordination af medicin' kan ikke opdateres.");
  }
}
  
/****************************/
/*** Ordinationer, øvrige ***/
/****************************/
if (AOordinationer2 !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Ordinationer, øvrige");
    Fields['Notat - Fritekst'].input(AOordinationer2);
  } catch (e) {
      Dialog.warn('Advarsel', 'Ordinationer, øvrige kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/**************************/
/*** Information/accept ***/
/**************************/
if (AOinformation !== "N/A"){
  try {
    Fields['Notat - NavigatorTree'].select("Information");
    Fields['Notat - Fritekst'].input(AOinformation);
  } catch (e) {
      Dialog.warn('Advarsel', 'Information/accept kan ikke opdateres.', { 'timeout': 5 });
}
}
  
/*****************/
/*** Trin 2    ***/
/*****************/
  if (AOtrin2 !== "N/A"){ 
    try {
      Fields['Notat - NavigatorTree'].select("Trin 2"); 
      Fields['Notat - Fast værdi'].select("Udført");
    }
    catch (e){
      Dialog.warn('Advarsel', 'Trin 2 kan ikke opdateres.', { 'timeout': 5 });
    }
  }
  if (AOtrin2tekst !== "N/A"){  
   try {
      Fields['Notat - NavigatorTree'].select("Trin 2"); 
      Fields['Notat - Fritekst'].input(AOtrin2tekst);
    }
    catch (e){
      Dialog.warn('Advarsel', 'Trin 2 tekst kan ikke opdateres.', { 'timeout': 5 });
    }
  }
    
/**********************/
/*** Brevskabeloner ***/
/**********************/
// N/A
  
/***********************/
/*** Kontaktpersoner ***/
/***********************/
if (AOkontaktperson !== "N/A"){
      try {
      Fields['Notat - NavigatorTree'].select("Kontaktperson(er)");
      Fields['Notat - Fast værdi'].select(AOkontaktperson);
    }
    catch (e) {
      Dialog.warn('Advarsel', 'Kontaktperson(er) kan ikke opdateres.', { 'timeout': 5 });
    }
}
if (AOkontaktpersontekst !== "N/A"){
      try {
      Fields['Notat - NavigatorTree'].select("Kontaktperson(er)");
      Fields['Notat - Fritekst'].input(AOkontaktpersontekst);
    }
    catch (e) {
      Dialog.warn('Advarsel', 'Kontaktperson(er) tekst kan ikke opdateres.', { 'timeout': 5 });
    }
}

/******************/
/*** Trin 6 ... ***/
/******************/
   if (AOtrin6 !== "N/A"){  
      try {
      Fields['Notat - NavigatorTree'].select("Trin 6");
      Fields['Notat - Fast værdi'].select("Udført");
    }
    catch (e) {
      Dialog.warn('Advarsel', 'Trin 6 kan ikke opdateres.', { 'timeout': 5 });
    }
   }  
   if (AOtrin6tekst !== "N/A"){  
      try {
      Fields['Notat - NavigatorTree'].select("Trin 6");
      Fields['Notat - Fritekst'].input(AOtrin6tekst);
    }
    catch (e) {
      Dialog.warn('Advarsel', 'Trin 6 tekst kan ikke opdateres.', { 'timeout': 5 });
    }
   }  
    
/***********************/
/*** Hændelser i FMK ***/
/***********************/
if (AOfmk !== "N/A") {
  try {
    Fields['Notat - NavigatorTree'].select("Hændelser i FMK");
    Fields['Notat - Fritekst'].input(AOfmk);
  } catch (e) {
      Dialog.warn('Advarsel', 'Hændelser i FMK kan ikke opdateres.', { 'timeout': 5 });
}
}
/*******************/
/*** Skal sendes ***/
/*******************/
  if (AOskalsendes !== "N/A"){  
 try {
    Fields['Notat - NavigatorTree'].select("Skal sendes");
    Fields['Notat - Fast værdi'].select("Ja");
  } catch (e) {
    Dialog.warn("Advarsel", "'Skal sendes' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); 
  }
  }
  
/*******************************/
/*** Entry on dictation list ***/
/*******************************/
  if (AOdictate !== "N/A"){  
 try {
Fields["Menu - Journal"].click();
Fields["Menu - Digital diktering"].click();
Fields["Digital diktering - Opret nyt diktat fra fil"].click();
Fields["Notat - File name2"].input("c:/Programmer/Manatee/Lyd.wav");
//Fields["Notat - File name2"].input("%userprofile%/AppData/Local/Manatee/Lyd.wav");
Wait.forSeconds(5);
Fields["Digital diktering - vedhæft diktat"].click();
Wait.forField(Fields["Digital diktering - Kommentar"], 20);
Fields["Digital diktering - Kommentar"].input(AOmessage);
//Wait.forSeconds(5);
//Fields["Digital diktering - Gem og afslut"].click();
  } catch (e) {
    Dialog.warn("Advarsel", "'Diktat til sekretær med besked' kan ikke oprettes."); 
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