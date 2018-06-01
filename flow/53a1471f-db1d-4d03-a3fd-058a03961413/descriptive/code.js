
var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var FMK = true;
var ord = "Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt efter kat.operation i højre øje i 3 uger";
//var ord = false;
try {
Flow.run('Standard ordinationer E - test', {fmk: FMK, ordination: ord} );
  } 
  catch (e) {
    Dialog.warn('Advarsel', 'Subflow kan ikke kaldes.', { 'timeout': 5 });
  }
