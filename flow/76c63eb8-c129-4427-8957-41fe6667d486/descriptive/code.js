(function Vitrektomi (x) {
  //var i = 0;
  //while (i === 0) { //*** reinsert if some fields are required ***///
    var vitrektomi = Dialog.input(
       Procedure, "Angiv målinger",{
       "Eye": { "type": "SELECT", "prompt": "Øje:", "value": "O.dxt", "selectBetween": ["O.dxt", "O.sin"]},
       "Anaestesi": { "type": "SELECT", "prompt": "Anæstesi", "value": "Peribulbær anæstesi", "selectBetween": ["Peribulbær anæstesi", "Retrobulbær anæstesi", "Generel anæstesi"]},
       "Endolaser": { "type": "SELECT", "prompt": "Endolaser:", "value": "Nej", "selectBetween": ["Nej", "Ja"]},
        "Text": { "type": "SELECT", "prompt": " ", "value": "Hvis ja: Notatet kodes automatisk med laser. Ret teksten i operationsbeskrivelsen bagefter.", "selectBetween": ["Hvis ja: Notatet kodes automatisk med laser. Ret teksten i operationsbeskrivelsen bagefter."]}
      });
//    i = 1;
//  }
  return Vitrektomi;
})();