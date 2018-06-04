//** Intro besked og initialisering af Cave-flow **//
Settings.CommandRetries = 9;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

try {
  Dialog.info("Bemærk!", "Du starter nu automatisk Cave-registrering for " + Prep + "\n\nDu kan arbejde videre i andre applikationer end Cosmic.");}
catch (e) {
  throw "Cancel"; }

Fields['Cave - Type Selector - Lægemiddelcave'].select("Lægemiddelcave");
Fields['Cave - Ny'].click();
Fields['Cave - Name'].input(Prep);

try {
  Settings.CommandRetries = 4;
  if(Fields['Cave - Lægemiddelrelateret checkbox'].inspect().checked === false) {
    Fields['Cave - Lægemiddelrelateret checkbox'].click();
  }
} catch (e) {
 Dialog.info("Bemærk!", "Checkbox for Lægemiddelrelateret kan ikke sættes.");
}
Settings.CommandRetries = 9;
