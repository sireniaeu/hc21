//** Afslutning af Cave-flow **//
Settings.CommandRetries = 9;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

Fields['Cave - Søg og tilføj lægemiddel'].input(" ");
Fields['Cave - Kommentarfelt'].input(" "); //** Note input can not be empty (""). Then input will fail **//
Fields['Cave - Kommentarfelt'].focus();

if (IErr == "0") {
	Dialog.info("Automatisk Cave-registrering afsluttet", "UDFYLD KOMMENTARER og TRYK GEM OG SIGNER.\n\nNB! Det er dit ansvar at checke, at registreringen er foretaget korrekt, før du signerer.\n\nCheck evt. det grønne lomme-Cave-kort med de korrekte ATC-koder for den pågældende registrering.");
}
else {
	Dialog.warn("Automatisk Cave-registrering afsluttet\n\nADVARSEL", "Bemærk, at følgende ATC-koder muligvis ikke blev opdateret korrekt:\n" + IErrMsg + "\n\nNB! Det er dit ansvar at checke, at registreringen er foretaget korrekt, før du signerer. Check evt. det grønne lomme-Cave-kort med de korrekte ATC-koder for den pågældende registrering.\n\n Såfremt opdateringen er korrekt \nUDFYLD KOMMENTARER og TRYK GEM OG SIGNER.\n"); 
}