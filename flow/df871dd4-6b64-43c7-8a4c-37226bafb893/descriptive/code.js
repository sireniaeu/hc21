(function KataraktStandard (x) {
  //var i = 0;
  //while (i === 0) { //*** reinsert if some fields are required ***///
    var kataraktstandard = Dialog.input(
       "Katarakt operation - Standard", "Angiv målinger",{
       "Eye": { "type": "SELECT", "prompt": "Øje:", "value": "O.dxt", "selectBetween": ["O.dxt", "O.sin"]},
       "Anaestesi": { "type": "SELECT", "prompt": "Anæstesi", "value": "Dråbeanæstesi", "selectBetween": ["Dråbeanæstesi", "Peribulbær anæstesi", "Retrobulbær anæstesi", "Generel anæstesi"]},
        "Linsestyrke": {"prompt": "Linsestyrke: Dioptri. Ved minuslinse, ret notat bagefter) +", "type": "TEXT"},
       "Linsetype": { "type": "SELECT", "prompt": "Linestype:", "value": "AMO Tecnis 1 ZCB00", "selectBetween": ["AMO Tecnis 1 ZCB00", "Alcon SN60WF"]},
       "Phenylephrin intrakameralt": { "type": "SELECT", "prompt": "Linestype:", "value": "Nej", "selectBetween": ["Nej", "Ja"]}
      });
//    i = 1;
//  }
  return kataraktstandard;
})();