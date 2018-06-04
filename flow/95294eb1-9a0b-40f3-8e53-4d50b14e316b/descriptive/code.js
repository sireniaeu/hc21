var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];


var Userpsyk = 'ankomstpsyk';
var PassPsyk = 'ankomstpsyk1234';
var UserSirenia = "testlaege40";
var PassSirenia = "abcd1234";
var AfdPsyk = "PSY Psykiatrisk Afdeling (Odense)";
var OUHafdF = "<<08 OUH Øre-Næse-Hals/Høreklinik Afd. F>>";



  
try {
  Fields["Cosmic user name"].input(UserSirenia);
  Fields["Cosmic password"].input(PassSirenia);
  Fields["Cosmic login button"].click();
  Wait.forField(Fields["Cosmic afdeling"], 10);
  Fields["Cosmic afdeling"].select(OUHafdF);
  Fields["OK button"].click();
} catch (e) {
  errmsg = "Fejl i login subflow.";
  Log.warn('PsykiatriWarn', errmsg);
  throw errmsg;
}