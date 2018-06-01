(function SkeleExotropi (x) {
  //var i = 0;
  //while (i === 0) { //*** reinsert if some fields are required ***///
    var skeleexotropi = Dialog.input(
       "Katarakt kontrol", "Angiv målinger",{
       "Eye": { "type": "SELECT", "prompt": "Øje:", "value": "O.dxt", "selectBetween": ["O.dxt", "O.sin"]},
       "Anaestesi": { "type": "SELECT", "prompt": "Anæstesi", "value": "Peribulbær anæstesi", "selectBetween": [ "Peribulbær anæstesi", "Retrobulbær anæstesi", "Generel anæstesi"]},
       "Operation": { "type": "SELECT", "prompt": "Operation:", "value": " ", "selectBetween": [" ", " "]},
       "RectusMedialis": {"prompt": "Rectus medialis lægges tilbage (mm):", "type": "TEXT"},
       "RectusLateralis": {"prompt": "Rectus lateralis forkortes (mm):", "type": "TEXT"}
      });
//    i = 1;
//  }
  return skeleexotropi;
})();