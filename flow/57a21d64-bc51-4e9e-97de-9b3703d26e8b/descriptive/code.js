var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

try {
Fields["CPR"].input("111213-0pm2");
  } catch (e) {
      Dialog.warn('Advarsel', 'CPR kan ikke udfyldes.');
    }
