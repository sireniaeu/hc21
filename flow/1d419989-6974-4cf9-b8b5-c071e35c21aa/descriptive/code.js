// *** This function updates one medication in the Cave module in Cosmic *** //

Settings.CommandRetries = 9;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

(function UpdateMedication (x) {

Fields['Cave - Søg og tilføj lægemiddel'].input(Middel);
Fields['Cave - Søg knap'].click();

// *** Wait for the ATC code page to appear *** //
try {
	Wait.forField(Fields['Cave - medicin.dk'],10);
} catch(e) {
  Dialog.warn("ADVARSEL!", "Siden med medicin og ATC-koder er ikke kommet frem.\n\nVær ekstra opmærksom inden Cave signeres og godkendes.");
  return ATC;
}

try {
	Fields["Cave - Medicintabel"].select(ATC);
} catch(f) {
  Dialog.warn("ADVARSEL!", "ATC-koden (" + ATC + ") findes ikke i listen af præparater.\n\nVær ekstra opmærksom inden du signerer og godkender.");
  try {
    Settings.CommandRetries = 6;
    Fields['Cave - Annullér knap'].click();}
  catch (e) {
    Fields["Cave - Annuller knap"].click();
  }
  return ATC;
}

Fields['Cave - OK knap'].click();

// *** Wait for return to the ATC list page *** //
try {
	Wait.forField(Fields['Cave - Kemisk Gruppe Combo'],10);
    } catch(g) {
    Dialog.warn("ADVARSEL!", "Listen med ATC-koder er ikke kommet frem.\n\nVær ekstra opmærksom inden Cave signeres og godkendes.");
    return ATC;
  }

try {
	Fields["Cave - Kemisk Gruppe Combo"].editcell(ATCshort, "Type", Mtype);
    } catch(h) {
    Dialog.warn("ADVARSEL!", "ATC-type " + Mtype + " for " + ATC + " blev ikke opdateret.\n\nVær ekstra opmærksom inden Cave signeres og godkendes.");
    return ATC;
 }
return 0;
  
})();