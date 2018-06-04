(function SMILE (x) {
  //var i = 0;
  //while (i === 0) { //*** reinsert if some fields are required ***///
    var smile = Dialog.input(
      "SMILE", "Angiv målinger",{
       "dEyeIntro": { "type": "SELECT", "prompt": " ", "value": "O.dxt", "selectBetween": ["O.dxt"]},
       "dLaagdiameter": {"prompt": "Lågdiameter (mm):", "value": "7,6", "type": "TEXT"},
       "dLaagtykkelse": {"prompt": "Lågtykkelse (my):", "value": "130", "type": "TEXT"},
       "dKorrektion": {"prompt": "Korrektion:", "type": "TEXT"},
       "dsf1": {"prompt": "                                                      sf.", "value": "0", "type": "TEXT"},
       "dsf2": {"prompt": "                                                       x", "value": "0", "type": "TEXT"},
       "dLentikeldiameter": {"prompt": "Lentikeldiameter (mm):", "value": " ", "type": "TEXT"},
       "Lnetikeltykkelse": {"prompt": "Lentikeltykkelse (my):", "type": "TEXT"},
       "sEyeIntro": { "type": "SELECT", "prompt": " ", "value": "O.sin", "selectBetween": ["O.sin"]},
       "sLaagdiameter": {"prompt": "Lågdiameter (mm):", "value": "7,6", "type": "TEXT"},
       "sLaagtykkelse": {"prompt": "Lågtykkelse (my):", "value": "130", "type": "TEXT"},
       "sKorrektion": {"prompt": "Korrektion:", "type": "TEXT"},
       "ssf1": {"prompt": "                                                      sf.", "value": "0", "type": "TEXT"},
       "ssf2": {"prompt": "                                                       x", "value": "0", "type": "TEXT"},
       "sLentikeldiameter": {"prompt": "Lentikeldiameter (mm):", "value": " ", "type": "TEXT"},
       "sLentikeltykkelse": {"prompt": "Lentikeltykkelse (my):", "type": "TEXT"}
      });
//    i = 1;
//  }
  return smile;
})();




