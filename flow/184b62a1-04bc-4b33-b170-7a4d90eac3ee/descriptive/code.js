Settings.CommandRetryDelays = [50, 50, 50, 200, 400, 800, 1600]; // skdfjhd

/* Functions called by the flow */


  /* Claenup before start */
  Settings.CommandRetries = 3;
//Timer.start('PsykFlowTimer');

  try { Fields["Cave - Annullér knap"].click(); } catch (e) {}
//Timer.log('PsykFlowTimer', 'Testtid1');
  try { Fields["Cave - OK knap"].click(); } catch (e) {}
//Timer.log('PsykFlowTimer', 'Testtid12');
  try { Fields["Psy - Besøgsregistrering"].click(); } catch (e) {}
//Timer.log('PsykFlowTimer', 'Testtid13');
//Timer.stop('PsykFlowTimer');