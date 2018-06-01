//var r = Flow.run("Dialogdemo", {prompta: "AAAA"}); // dsfjhskfh
var inputs = {
    'submitOnValidation': true,
    'name': { 
      'prompt': 'Name',
      'type': 'TEXT',
      'multiline': true,
      'suffix': 'mm'
    },
  'colorCheckBox': { 
      'prompt': 'Choose color',
      'type': 'CHECKBOX',
      'orientation': 'vertical',
    'promptAlignment': 'right',
      'options': [{ name: 'red'}, { name: 'green'}]
    },
    'colorRadio': { 
      'prompt': 'Choose color',
      'type': 'RADIO',
      'selectBetween': ['red', 'green', 'blue']
    },
    'foo': {
      'prompt': 'Show only on blue',
      'dependsOn': 'colorRadio=blue',
          'promptAlignment': 'right',
      'type': 'TEXT'
    },
    'bar': { 
      'prompt': 'Bar',
      'type': 'TEXT',
      'suffix': 'bb'
    },
    'colorCombo': { 
      'prompt': 'Choose color',
      'type': 'SELECT',
      'selectBetween': ['red', 'green', 'blue'],
      'validation': {'isRequired': true, 'message': "Color must be selected" }
    },
    'header' : {
      'type': 'HEADER',
      'value': 'Header #1'
    },
    'desc': { 
      'type': 'DESCRIPTION',
      'value': 'Super long description possible. When a moon hits your eye like a big pizza pie. Thats amore. When the world seems to shine like youve had too much wine. Thats amore. Bells will ring ting-a-ling-a-ling, ting-a-ling-a-ling. And youll sing Vita bella. Hearts will play tippy-tippy-tay, tippy-tippy-tay'
    },
      'desc2': { 
      'type': 'DESCRIPTION',
      'value': 'Super long description possible. When a moon hits your eye like a big pizza pie. Thats amore. When the world seems to shine like youve had too much wine. Thats amore. Bells will ring ting-a-ling-a-ling, ting-a-ling-a-ling. And youll sing Vita bella. Hearts will play tippy-tippy-tay, tippy-tippy-tay'
    },
      'desc3': { 
      'type': 'DESCRIPTION',
      'value': 'Super long description possible. When a moon hits your eye like a big pizza pie. Thats amore. When the world seems to shine like youve had too much wine. Thats amore. Bells will ring ting-a-ling-a-ling, ting-a-ling-a-ling. And youll sing Vita bella. Hearts will play tippy-tippy-tay, tippy-tippy-tay'
    },
      'desc4': { 
      'type': 'DESCRIPTION',
      'value': 'Super long description possible. When a moon hits your eye like a big pizza pie. Thats amore. When the world seems to shine like youve had too much wine. Thats amore. Bells will ring ting-a-ling-a-ling, ting-a-ling-a-ling. And youll sing Vita bella. Hearts will play tippy-tippy-tay, tippy-tippy-tay'
    },
      'desc5': { 
      'type': 'DESCRIPTION',
      'value': 'Super long description possible. When a moon hits your eye like a big pizza pie. Thats amore. When the world seems to shine like youve had too much wine. Thats amore. Bells will ring ting-a-ling-a-ling, ting-a-ling-a-ling. And youll sing Vita bella. Hearts will play tippy-tippy-tay, tippy-tippy-tay'
    },
    'desc6': { 
      'type': 'DESCRIPTION',
      'value': 'Super long description possible. When a moon hits your eye like a big pizza pie. Thats amore. When the world seems to shine like youve had too much wine. Thats amore. Bells will ring ting-a-ling-a-ling, ting-a-ling-a-ling. And youll sing Vita bella. Hearts will play tippy-tippy-tay, tippy-tippy-tay'
    },
    'desc7': { 
      'type': 'DESCRIPTION',
      'value': 'Super long description possible. When a moon hits your eye like a big pizza pie. Thats amore. When the world seems to shine like youve had too much wine. Thats amore. Bells will ring ting-a-ling-a-ling, ting-a-ling-a-ling. And youll sing Vita bella. Hearts will play tippy-tippy-tay, tippy-tippy-tay'
    },
    'desc8': { 
      'type': 'DESCRIPTION',
      'value': 'Super long description possible. When a moon hits your eye like a big pizza pie. Thats amore. When the world seems to shine like youve had too much wine. Thats amore. Bells will ring ting-a-ling-a-ling, ting-a-ling-a-ling. And youll sing Vita bella. Hearts will play tippy-tippy-tay, tippy-tippy-tay'
    },
    'date': {
      'type': 'DATE'
    },
    'multi': { 
      'type': 'MULTITEXT',
      'prompt': 'Some complex texts',
      'texts': [
        { 'name': 'a', 'prefix': 'pre', 'suffix': 'suf', 'multiline': true},
        { 'name': 'b', 'prefix': '>', 'suffix': '<' }
      ]
    }
};
var r = Dialog.input("hello", "sdlfjdsljfs", inputs); // sdfsd
Debug.ger();