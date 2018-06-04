(function KataraktKontrol (x) {
  //var i = 0;
  //while (i === 0) { //*** reinsert if some fields are required ***///
    var kataraktkontrol = Dialog.input(
      "Katarakt kontrol", "Angiv målinger",{
       "Eye": { "type": "SELECT", "prompt": "Øje:", "value": "O.dxt", "selectBetween": ["O.dxt", "O.sin"]},
       "Visus": {"prompt": "Visus:", "type": "TEXT"},
       "Kommentar1": { "type": "SELECT", "prompt": " ", "value": "Snellen (HB, 1/60 og lign.) noteres i refraktionsfeltet.", "selectBetween": ["Snellen (HB, 1/60 og lign.) noteres i refraktionsfeltet."]},
        "Refraktion": {"prompt": "Anvendt refraktion:", "value": "s.c.", "type": "TEXT"},
        "Tension": {"prompt": "Tension (mmHg):", "type": "TEXT"},
        "TensionType": { "type": "SELECT", "prompt": " ", "value": "Appl.", "selectBetween": ["Appl.", "Icare."]},
        "Spaltelampe": { "type": "SELECT", "prompt": "Spaltelampe:", "value": "Tekst kan efterfølgende ændres", "selectBetween": ["Tekst kan efterfølgende ændres","Tilladelig postoperativ reaktion med intet til minimalt kornealt ødem. Pseudophakos skønnes på plads", "Tilladelig postoperativ reaktion med let til moderat ødem og folder i MD. Pseudophakos skønnes på plads."]},
        "Konklusion": {"prompt": "Konklusion (valgfri tekst):", "type": "TEXT"},
        "Efterbehamdling": { "type": "SELECT", "prompt": " ", "value": "Efterbehandling: Mazidex x 3 i 3 uger", "selectBetween": ["Efterbehandling: Mazidex x 3 i 3 uger"]},
        "Kontrol": { "type": "SELECT", "prompt": "Postoperativ plan:", "value": "Kontrol hos egen øjenlæge om 1 uge. Fortsætter i øjenafdelingen som planlagt.", "selectBetween": ["Kontrol hos egen øjenlæge om 1 uge. Fortsætter i øjenafdelingen som planlagt.", "Afsluttes til kontrol hos egen øjenlæge om 1 uge.", "Torisk linse implanteret. Kontrol i øjenambulatoriet om 3 uger"]}
      });
//    i = 1;
//  }
  return kataraktkontrol;
})();








