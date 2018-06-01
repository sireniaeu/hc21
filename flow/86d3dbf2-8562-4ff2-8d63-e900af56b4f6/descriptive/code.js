/**************************/
/*** Set type of note   ***/
/**************************/
var StdRetry = 10;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var skabelontype = nyskab;
try {
  var ExistingSkabelon = Fields["Notat - Skabelon for Read"].read();
  Settings.CommandRetries = 6; /* After the first read the page and field is activated, so retry can be reduced */
  if (skabelontype !== ExistingSkabelon) {
    try {
      Fields['Notat - Skabelon'].select(skabelontype);
      switch (ExistingSkabelon) {
        case "<Vælg skabelon>":
          /*        case "Assistance":
                  case "Plejedata":
                  case "Peroperativ plejekontakt":
                  case "Peroperativ plejekontakt - assisterende sygeplejerske":
                  case "Peroperativ plejekontakt - usteril hjælper":*/
          break;

        default:
          var windowIsShown = Window.withTitleShown("Vil du skifte skabelon?");
          if (windowIsShown) {
            try {Fields["Notat - Skift skabelon"].click(); } catch (e) {}/* The user might press the button, so don't fail if this click fails */
          }
          break;
      }
      Wait.forField(Fields["Notat - Skabelon for Read"], 10); /* Maybe not needed, but does no harm */
    } catch (e) {
      try {
        Fields['Notat - Skabelon'].select("Tilføj flere alternativer...");
        switch (ExistingSkabelon) {
          case "<Vælg skabelon>":
            /*        case "Assistance":
                    case "Plejedata":
                    case "Peroperativ plejekontakt":
                    case "Peroperativ plejekontakt - assisterende sygeplejerske":
                    case "Peroperativ plejekontakt - usteril hjælper":*/
            break;
          default:
            var windowIsShown = Window.withTitleShown("Vil du skifte skabelon?");
            if (windowIsShown) {
              try {Fields["Notat - Skift skabelon"].click();} catch (e) {}
            }
            break;
        }
        Fields["Notat - Alternative skabeloner"].select(skabelontype);
        Fields["Notat - Tilføj skabelon"].click();
        Fields["Cave - OK knap"].click();
        Wait.forField(Fields["Notat - Skabelon for Read"], 10);
      } catch (e) {
        Dialog.warn('Advarsel', skabelontype + ' kan ikke vælges.', {
          'timeout': 5
        });
        throw 1;
      }
    }
  }
} catch (e) {
  Dialog.warn('Advarsel', 'Skabelon kan ikke vælges.', {
    'timeout': 5
  });
  throw 1;
}
