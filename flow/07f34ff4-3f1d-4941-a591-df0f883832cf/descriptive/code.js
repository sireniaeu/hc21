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

  var skabelontype = "Diagnoser og procedurer";
  Flow.run('Skift skabelon', {'nyskab': skabelontype});
  Settings.CommandRetries = StdRetry;
  
  //*******************************//
  //*** Creation of Cosmic Note ***//
  //*******************************//

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