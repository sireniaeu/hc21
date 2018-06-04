/* Set Procedurer code and up to 4 Tillægskoder */
var debug = false;

    try {
      /*** Set 'Procedurerkoder' ***/
      Fields['Notat - NavigatorTree'].select("Procedurer");
      Fields['Notat - Find Koder - Text'].input(ProcedureCode);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(ProcedureCode);
      Wait.forMilliseconds(1000);
      Fields['Notat - Find Koder - Date'].focus();
      Fields['Notat - Find Koder - Date'].inputNative(Pd + Pm + Py);
      Wait.forMilliseconds(1000);
      Fields['Notat - Find Koder - Time'].focus();
      Fields['Notat - Find Koder - Time'].inputNative(Ph + Pi);
      Fields['Notat - Find Koder - Tilføj'].click();
  
      /*** Set 'Tillægskoder' ***/
      if (TillaegsCode1 !== "") { 
        Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ProcedureCode, 0, 0);
        Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
        Fields['Notat - Find Koder - Text'].input(TillaegsCode1);  
        Fields['Notat - Find Koder - Søg'].click();
        Fields['Notat - Find Koder - Resultat'].select(TillaegsCode1);
        Fields['Notat - Find Koder - Tilføj'].click();
      }
      
      if (TillaegsCode2 !== "") { 
        Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ProcedureCode, 0, 0);
        Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
        Fields['Notat - Find Koder - Text'].input(TillaegsCode2);  
        Fields['Notat - Find Koder - Søg'].click();
        Fields['Notat - Find Koder - Resultat'].select(TillaegsCode2);
        Fields['Notat - Find Koder - Tilføj'].click();
      }
      
      if (TillaegsCode3 !== "") { 
        Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ProcedureCode, 0, 0);
        Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
        Fields['Notat - Find Koder - Text'].input(TillaegsCode3);  
        Fields['Notat - Find Koder - Søg'].click();
        Fields['Notat - Find Koder - Resultat'].select(TillaegsCode3);
        Fields['Notat - Find Koder - Tilføj'].click();
      }
      
      if (TillaegsCode4 !== "") { 
        Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(ProcedureCode, 0, 0);
        Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
        Fields['Notat - Find Koder - Text'].input(TillaegsCode4);  
        Fields['Notat - Find Koder - Søg'].click();
        Fields['Notat - Find Koder - Resultat'].select(TillaegsCode4);
        Fields['Notat - Find Koder - Tilføj'].click();
      }
      
    } catch (e) {
      Dialog.warn('Advarsel', 'Procedurer ' + ProcedureCode + ' kan ikke opdateres', { 'timeout': 5 });
    }
 