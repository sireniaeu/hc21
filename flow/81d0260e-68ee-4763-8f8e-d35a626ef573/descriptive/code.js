(function KataraktTorisk (x) {
  //var i = 0;
  //while (i === 0) { //*** reinsert if some fields are required ***///
    var katarakttorisk = Dialog.input(
       "Katarakt operation - Torisk", "Angiv målinger",{
       "Eye": { "type": "SELECT", "prompt": "Øje:", "value": "O.dxt", "selectBetween": ["O.dxt", "O.sin"]},
       "Anaestesi": { "type": "SELECT", "prompt": "Anæstesi", "value": "Dråbeanæstesi", "selectBetween": ["Dråbeanæstesi", "Peribulbær anæstesi", "Retrobulbær anæstesi", "Generel anæstesi"]},
       "Phenylephrin": { "type": "SELECT", "prompt": "Phenylephrin intrakameralt:", "value": "Nej", "selectBetween": ["Nej", "Ja"]},
        "Akse": {"prompt": "Akse: (grader)", "type": "TEXT"},
         "Linse": {"prompt": "Linse: (Øverste kode fra æskens bagside)", "type": "TEXT"}
      });
//    i = 1;
//  }
  return katarakttorisk;
})();