// Auto update ”Morfika” Cave
Settings.CommandRetries = 9;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var GoOn = true;

try {
  Dialog.info("Cave - Morfika", "Husk at vurdere om reaktionen på et morfikum skyldes en allergisk reaktion, eller om det drejer sig om bivirkninger.\n\nBivirkninger registreres under ikonet ”Særlig opmærksomhed” og uden ATC kode.\n\nHYPPIGE MORFIKABIVIRKNINGER:\n- Monosymptomatisk kvalme og opkast\n- Konfusion og svimmelhed\n- Respirationsdepression\n- Lokaliseret urtikaria og hudkløe ved injektionsstedet.\n\nHvis en patient er fejlregistreret for ”CAVE-morfika”, vil det udgøre et problem i smertedækningen af patienten.\n\nVil du fortsætte CAVE-registrering?", {buttons: [  { 'value': 'Ja ' }, { 'value': 'Nej', 'isCancel': true }]});}
catch (e) {
  Dialog.warn("Cave - Morfika afbrydes!", "");
  GoOn = false;
}

if (GoOn) {
  Fields['Cave - Type Selector - Lægemiddelcave'].select("Lægemiddelcave");
  Fields['Cave - Ny'].click();
  Fields['Cave - Name'].input("morfika");
  
  try {
    Settings.CommandRetries = 4;
    if (Fields['Cave - Lægemiddelrelateret checkbox'].inspect().checked === false) {
      Fields['Cave - Lægemiddelrelateret checkbox'].click();
    }
  } catch (e) {
    Dialog.info("Bemærk!", "Checkbox for Lægemiddelrelateret kan ikke sættes.");
  }
  
  var ErrMsg = "";
  var Err = 0;
  
  var medications = [ 
    {Middel: "morfin", ATC: "N02AA01", ATCshort: "N02AA", Mtype: "Farmakologisk gruppe"},
    {Middel: "kodein", ATC: "R05DA04", ATCshort: "R05DA", Mtype: "Kemisk gruppe"}
  ];

  for (var i = 0; i < medications.length; i++) {
    var r = Flow.run("Cave function - Update medication", medications[i]);
    if (r.result != "0") {
      //Log.warn(flowname,"Error in Update medication: " + medications[i].Middel + " " + medications[i].ATC);
      ErrMsg = ErrMsg + "\n" + r.result;
      Err = 1;
    }
  }
  
  Fields['Cave - Søg og tilføj lægemiddel'].input(" ");
  Fields['Cave - Kommentarfelt'].input("NB!");
  Fields['Cave - Kommentarfelt'].focus();

  if (Err == "0") {
    Dialog.info("Automatisk Morfika-registrering afsluttet", "UDFYLD KOMMENTARER og TRYK GEM OG SIGNER.\n\nNB! Det er dit ansvar at checke, at registreringen er foretaget korrekt, før du signerer.");}
  else {
    Dialog.warn("Automatisk Morfika-registrering afsluttet\n\nADVARSEL", "Bemærk, at følgende ATC-koder muligvis ikke blev opdateret korrekt:\n" + ErrMsg + "\n\nNB! Det er dit ansvar at checke, at registreringen er foretaget korrekt, før du signerer.\n\n Såfremt opdateringen er korrekt \nUDFYLD KOMMENTARER og TRYK GEM OG SIGNER.\n"); 
  }
}