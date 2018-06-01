var result2 = Dialog.input(
  'Input patient id', 
  '', {
    'maxDialogWidth': 300,
    'cpr': { 
      'type': 'MULTITEXT',
      'prompt': 'CPR nr.:',
      'texts': [
        { 'name': 'a', value: "010234", 'suffix': "-"},
        { 'name': 'b', value: "0LB0 *" }
      ]
    },
    'tid': { 
      'type': 'MULTITEXT',
      'prompt': 'Tid:',
      'texts': [
        { 'name': 'a', value: "08", 'suffix': ":"},
        { 'name': 'b', value: "00" }
      ]
    },
    'version': { 
      'prompt': 'Choose version',
      'type': 'RADIO',
      'selectBetween': ['Psykiatri ankomst', 'Psykiatri ankomst v1', 'Ankomst InMem' ],
      'value': 'Psykiatri ankomst'
    }
  });

var cprnr = result2.cpr.a + "-" + result2.cpr.b;
var tid = result2.tid.a + ":" + result2.tid.b;

var flow = result2.version;


try {
  var result = Flow.run(flow, {'[eu.sirenia]Action.In.PsykAR.Cpr': cprnr, '[eu.sirenia]Action.In.PsykAR.Tid': tid});
  Dialog.info('Svar fra flow.run Psykiatri ankomst', result.outputC);
} catch (e) {
  Dialog.info('Svar fra flow.run Psykiatri ankomst', e.message);
  console.log(e);
}