(function Femto (x) {
  //var i = 0;
  //while (i === 0) { //*** reinsert if some fields are required ***///
    var femto = Dialog.input(
      "Femto-LASIK", "Angiv målinger",{
       "dEyeIntro": { "type": "SELECT", "prompt": " ", "value": "O.dxt", "selectBetween": ["O.dxt"]},
       "dFlapdiameter": {"prompt": "Flapdiameter (mm):", "value": "8,0", "type": "TEXT"},
       "dFlaptykkelse": {"prompt": "Flaptykkelse (my):", "value": "120", "type": "TEXT"},
       "dKorrektion": {"prompt": "Korrektion:                              +", "type": "TEXT"},
       "dsf1": {"prompt": "                                                      sf.", "type": "TEXT"},
       "dsf2": {"prompt": "                                                       x", "type": "TEXT"},
       "dOptisk": {"prompt": "Optisk zone (mm):", "value": "6,25", "type": "TEXT"},
       "dAblation": {"prompt": "Ablationsdybde (my):", "type": "TEXT"},
       "sEyeIntro": { "type": "SELECT", "prompt": " ", "value": "O.sin", "selectBetween": ["O.sin"]},
       "sFlapdiameter": {"prompt": "Flapdiameter (mm):", "value": "8,0", "type": "TEXT"},
       "sFlaptykkelse": {"prompt": "Flaptykkelse (my):", "value": "120", "type": "TEXT"},
       "sKorrektion": {"prompt": "Korrektion:                              +", "type": "TEXT"},
       "ssf1": {"prompt": "                                                      sf.", "type": "TEXT"},
       "ssf2": {"prompt": "                                                       x", "type": "TEXT"},
       "sOptisk": {"prompt": "Optisk zone (mm):", "value": "6,25", "type": "TEXT"},
       "sAblation": {"prompt": "Ablationsdybde (my):", "type": "TEXT"}
      });
//    i = 1;
//  }
  return femto;
})();




