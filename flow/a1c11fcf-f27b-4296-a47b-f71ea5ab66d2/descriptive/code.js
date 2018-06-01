

(function Visus (x) {
   var besogst = ["Kontrol (Ambulant klinisk kontakt)", "Nyhenvist (Ambulant primærjournal)"];
  var tensiont =  ["Lufttension", "Icare."];
  var dilat = ["Nej", "O.U.", "O.dxt", "O.sin"];
  var draaber = ["Metaoxedrin 10% + Mydriacyl 1%", "Minims: Metaoxedrin 10% + Mydriacyl 1%", "Mydriacyl 1%                            ", "Minims: Mydriacyl 1%                            ", "Cyclogyl 1%                       "];   
  var oct = ["Nej", "O.dxt", "O.sin", "O.U."];
  
    var visus = Dialog.input(
      "Visus KR 800S", "Angiv målinger",{
        "Initialer": {"type": "MULTITEXT", "prompt": "Initialer:", 'texts': [{'t1': 't1', 'suffix': '(små bogstaver)'}]},
        'Stregkode': {"type": "MULTITEXT", "prompt": "Stregkode: ", 'texts': [{'t1': 't1', 'value': "000000", 'prefix': 'KR ', 'suffix': '(6 cifre fra KR800S-udskrift)', 'validation': {regex: '^[0-9]{6}$', 'message': "Skal være 6 tal"}}]},
        'Besogstype': { "type": "RADIO", "prompt": "Besøgstype:", "value": besogst[0], "selectBetween": besogst},
        'dEgenBrille': { 
          'type': 'MULTITEXT',
          'prompt': 'Egen brille O.dxt:',
          'texts': [
            { 'dEgenBrille': 'dEgenBrille', 'suffix': 'sf.'},
            { 'dEgenBrille': 'dsf1', 'suffix': ' x', "value": "0"},
            { 'dEgenBrille': 'dsf2', 'suffix': '°', "value": "0"}]},
        'sEgenBrille': { 
          'type': 'MULTITEXT',
          'prompt': 'Egen brille O.sin:',
          'texts': [
            { 'sEgenBrille': 'sEgenBrille', 'suffix': 'sf.'},
            { 'sEgenBrille': 'ssf1', 'suffix': ' x', "value": "0"},
            { 'sEgenBrille': 'ssf2', 'suffix': '°', "value": "0"}]},
        "oTension": {"type": "MULTITEXT", "prompt": "Tension O.dxt:", 'texts': [{'ot': 'ot', 'suffix': 'mmHg'}]}, 
        "oTensionType": { "type": "RADIO", "prompt": " ", "value": tensiont[0], "selectBetween": tensiont},
        "sTension": {"type": "MULTITEXT", "prompt": "Tension O.sin:", 'texts': [{'os': 'os', 'suffix': 'mmHg'}]},
        "sTensionType": { "type": "RADIO", "prompt": " ", "value": tensiont[0], "selectBetween": tensiont},
        "Dilatation": { "type": "RADIO", "prompt": "Dilatation:", "value": dilat[1], "selectBetween": dilat}, 
        "Draaber": { "type": "RADIO", "prompt": "Dråber:", "value": draaber[0], "selectBetween": draaber},  
        'divider1': { 'type': 'DIVIDER'},
        "TopconOCT": { "type": "RADIO", "prompt": "Topcon OCT:", "value": oct[0], "selectBetween": oct},
        "TopconPapilOCT": { "type": "RADIO", "prompt": "Topcon papil OCT:", "value": oct[0], "selectBetween": oct},
        "HeidelbergOCT": { "type": "RADIO", "prompt": "Heidelberg OCT:", "value": oct[0], "selectBetween": oct},
        "HeidelbergPapilOCT": { "type": "RADIO", "prompt": "Heidelberg papil OCT:", "value": oct[0], "selectBetween": oct},
        'CRT': { 'type': 'MULTITEXT','prompt': 'CRT:','texts': [
            { 'od': 'od', 'prefix': 'O.dxt', 'suffix': 'my   '},
            { 'os': 'os', 'prefix': 'O.sin', 'suffix': 'my   '}]},
        'divider2': { 'type': 'DIVIDER'},
       //'desc2': { 'type': 'DESCRIPTION','value': ''},
        "OptosFoto": { "type": "RADIO", "prompt": "Optos foto:", "value": oct[0], "selectBetween": oct},
        "TopconFoto": { "type": "RADIO", "prompt": "Topcon foto:", "value": oct[0], "selectBetween": oct}
      });
  return visus;
})();