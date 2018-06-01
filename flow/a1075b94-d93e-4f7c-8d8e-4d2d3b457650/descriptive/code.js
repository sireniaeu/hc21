var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

/*
var Userpsyk = 'ankomstpsyk';
var PassPsyk = 'ankomstpsyk1234';
var UserSirenia = "testlaege40";
var PassSirenia = "abcd1234";
var AfdPsyk = "PSY Psykiatrisk Afdeling (Odense)";
var OUHafdF = '08 OUH Øre-Næse-Hals.*';
*/

var User = Usr;
var Pass = Pas;
var Afd = "<<" + Af + ">>";

var errmsg = "";

/* KAN SLETTES, NÅR SPORADISK OPSTARTS ISSUE ER FUNDET */
try {
  Wait.forField(Fields["Cosmic user name"], 1);
  Notification.show('Cosmic', 'Cosmic login', '', {timeout: 60});
} catch (e) {
  Dialog.info('Login wait timeout', 'text', { 'timeout': 10 });
}
  
try {
  Fields["Cosmic user name"].input(User);
  Fields["Cosmic password"].input(Pass);
  Fields["Cosmic login button"].click();
  Wait.forField(Fields["Cosmic afdeling"], 30);
  Fields["Cosmic afdeling"].select(Afd);
  Fields["OK button"].click();
} catch (e) {
  errmsg = "Fejl i login subflow.";
  Log.warn('PsykiatriWarn', errmsg);
  throw errmsg;
}