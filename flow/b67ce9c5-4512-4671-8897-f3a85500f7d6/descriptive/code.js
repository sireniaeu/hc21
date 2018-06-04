(function Fotounders (x) {
  //var i = 0;
  //while (i === 0) { //*** reinsert if some fields are required ***///
    var fotounders = Dialog.input(
      "Fotoundersøgelse", "Angiv målinger",{
       "Initialer": {"prompt": "Initialer (små bogstaver):", "type": "TEXT"},
       "TopconOCT": { "type": "SELECT", "prompt": "Topcon OCT:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
       "TopconPapilOCT": { "type": "SELECT", "prompt": "Topcon papil OCT:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
       "HeidelbergOCT": { "type": "SELECT", "prompt": "Heidelberg OCT:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
       "HeidelbergPapilOCT": { "type": "SELECT", "prompt": "Heidelberg papil OCT:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
       "CRTd": {"prompt": "CRT:                                          OD:", "type": "TEXT"},
       "CRTs": {"prompt": "                                                     OS:", "type": "TEXT"},
       "MacHulBased": {"prompt": "Mac.hul base:                      OD:", "type": "TEXT"}, 
       "MacHulBases": {"prompt": "                                                     OS:", "type": "TEXT"},  
        "MacHulMinimumd": {"prompt": "Mac.hul minimum:           OD:", "type": "TEXT"}, 
        "MacHulMinimums": {"prompt": "                                                     OS:", "type": "TEXT"},  
        "Separator1": { "type": "SELECT", "prompt": " ", "value": "-----------------------------------------------------", "selectBetween": ["-----------------------------------------------------"]},
        "OptosFoto": { "type": "SELECT", "prompt": "Optos foto:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
        "TopconFoto": { "type": "SELECT", "prompt": "Topcon foto:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
        "TopconMosaik": { "type": "SELECT", "prompt": "Topcon mosaik:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
     "Separator2": { "type": "SELECT", "prompt": " ", "value": "-----------------------------------------------------", "selectBetween": ["-----------------------------------------------------"]},
         "TopconFlu": { "type": "SELECT", "prompt": "Topcon flu:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
        "OptosFlu": { "type": "SELECT", "prompt": "Optos flu:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
        "HeidelbergFluICG": { "type": "SELECT", "prompt": "Heidelberg flu + ICG:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
        "HeidelbergFlu": { "type": "SELECT", "prompt": "Heidelberg flu:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
        "Separator3": { "type": "SELECT", "prompt": " ", "value": "-----------------------------------------------------", "selectBetween": ["-----------------------------------------------------"]},
        "Spaltelampefoto": { "type": "SELECT", "prompt": "Spaltelampefoto:", "value": "Nej", "selectBetween": ["Nej", "O.dxt", "O.sin", "O.U."]},
        "Separator4": { "type": "SELECT", "prompt": " ", "value": "-----------------------------------------------------", "selectBetween": ["-----------------------------------------------------"]},
        "Kommentar": {"prompt": "Kommentar:", "type": "TEXT"},
        "Separator5": { "type": "SELECT", "prompt": " ", "value": "-----------------------------------------------------", "selectBetween": ["-----------------------------------------------------"]},
        "Notattype": { "type": "SELECT", "prompt": "Notattype:", "value": "Ny ambulant klinisk kontakt", "selectBetween": ["Overtaget ambulant klinisk kontakt", "Overtaget ambulant primær kontakt", "Ny ambulant klinisk kontakt"]}
      });
//    i = 1;
//  }
  return fotounders;
})();




