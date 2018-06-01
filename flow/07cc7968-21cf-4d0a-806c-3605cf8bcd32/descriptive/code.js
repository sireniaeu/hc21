var oculus = ["O.sin", "O.dxt"];
var anaest = ["Dråbeanæstesi                               ",
              "Peribulbær anæstesi                         ", 
              "Retrobulbær anæstesi                        ", 
              "Generel anæstesi                            "];
var phenyl = ["Nej", "Ja"];

var katarakttorisk = Dialog.input(
    "Katarakt operation - Torisk", "Angiv målinger",{
      "Eye": { "type": "RADIO", "prompt": "Øje:", "value": oculus[0], "selectBetween": oculus},
      "Anaestesi": { "type": "RADIO", "prompt": "Anæstesi", "value": anaest[3], "selectBetween": anaest},
      "PhenylIntro": { "type": 'DESCRIPTION', 'value': "Phenylephrin intrakameralt:"},
      "Phenylephrin": { "type": "RADIO", "prompt": "p ", "value": "Nej", "selectBetween": ["Nej", "Ja"]},
      //"Akse": {"type": "TEXT", "prompt": "Akse:", 'validation': {'regex': '^[0-9]{1,3}$', 'message': "Akse skal angives og skal være et tal"}},
      //"Linse": {"type": "TEXT", "prompt": "Linse:", 'validation': {'isRequired': true, 'message': "Linse skal angives"}}
      "Akse": {"type": "MULTITEXT", "prompt": "Akse:", 
               'texts': 
               [{'akse': 'a', 
                 'suffix': "°",
                 'validation': {'regex': '^[0-9]{1,3}$', 'message': "Akse skal angives og skal være et tal"} 
                } ] },
      "Linse": {"type": "MULTITEXT", "prompt": "Linse:", 
                'texts': 
                [{'linse': 'b', 
                  'suffix': "(Øverste kode fra æskens bagside)", 'validation': {'isRequired': true, 'message': "Linse skal angives"} 
                 } ] }
    });

var result = Dialog.input(
  'This is a demo', 
  'Some description goes here.', { 
    'multi': { 
      'type': 'MULTITEXT',
      'prompt': 'Some complex texts',
      'texts': [
        { 'name': 'a', 'prefix': 'pre', 'suffix': 'suf', 'validation': { 'regex': 'a+', 'message': 'Must contain at least one \"a\"'} },
        { 'name': 'b', 'prefix': '>', 'suffix': '<' }
      ]
    }
  }
);
var multitest = Dialog.input( 'Multi test', 'L', {
                             'Linse': {"type": "MULTITEXT", "prompt": "Linse:", 
                'texts': 
                [{'linse': 'b', 
                  'suffix': "(Øverste kode fra æskens bagside)", 
                  'validation': {'isRequired': true, 'message': "Linse skal angives"} } ] }
} );


