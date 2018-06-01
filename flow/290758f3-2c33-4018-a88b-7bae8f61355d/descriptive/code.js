//******************************************************************//
//*** Cosmic flow to input data from a device in a clinical note ***//
//******************************************************************//

var StdRetry = 13;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

try {
  /* Go to Journal / Nyt notat */
  Fields["Menu - Nyt notat"].click();
    
  /**************************/
  /*** Set type of note   ***/
  /**************************/
  Settings.CommandRetries = 10;
  var skabelontype = "Målte værdier afd. A";
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
      Wait.forField(Fields["Notat - Skabelon for Read"], 10); 
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
                 Dialog.warn('Advarsel', skabelontype + ' kan ikke vælges.', { 'timeout': 5 });
                             } 
                    }
    }
       } catch (e) {
         Dialog.warn('Advarsel', 'Skabelon kan ikke vælges.', { 'timeout': 5 });
                   }
   Settings.CommandRetries = StdRetry;
} catch (e) {
  Log.warn('Device input','Skabelon kan ikke vælges.');
}

Fields["Notat - Afdeling Enhed"].select(".*K.*");

Fields['Notat - NavigatorTree'].select("Puls");
Fields["Notat - Numerisk værdi"].input(Puls);

Fields["Signer"].click();
if (Kliniker) {
  var klinik = Kliniker;
} else {
  var klinik = "James";
}
Fields["Godkender"].select(".*" + klinik + ".*");
Fields["Ja"].click();

//Fields["Gem kladde"].click();

Fields["Cave - Luk"].click();
    