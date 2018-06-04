var StdRetry = 3;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];
var cprread;
try
{
Settings.CommandRetries = 1;
try {
  cprread = Fields["CPR read"].read();
  Settings.CommandRetries = StdRetry;
if (cprread === "")
{
  Dialog.info("Ingen patient valgt", "", {});
}
else
{
  try {
Flow.run('Find patientjournal', {cpr: cprread});
  } catch (e) {
      Dialog.warn('Advarsel', 'Cosmic kan ikke kaldes.', {});
    }
}
  } catch (e) {
      Dialog.info('Ingen patient valgt', "Vælg link fra 'patientdetaljer'.", {});
    }
  } catch (e) {
      Dialog.warn('Advarsel', 'Generel fejl i Cosmic-link.', {});
    }
