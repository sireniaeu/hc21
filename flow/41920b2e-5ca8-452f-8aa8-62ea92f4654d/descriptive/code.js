/* This flow is used to call the Psykiatrik ankomst" flow with patient and booking time 
Used to test Cosmic login */

try {
  var result = Flow.run('Psykiatri ankomst', { '[eu.sirenia]Action.In.PsykAR.Tid': "10:00", '[eu.sirenia]Action.In.PsykAR.Cpr': "010101-0123" });
  Dialog.info('Retur fra Chrome', result, { });
} catch (e) {
  Dialog.info('Catch Retur fra Chrome', e.message, { });
}