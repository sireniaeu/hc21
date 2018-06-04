Settings.CommandRetries = 5;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

//var ExistingSkabelon = Fields["Notat - Skabelon for Read"].read();
	
var c = Fields["FMK - Ordinationsliste - Table"].read();
Dialog.info("Test", c, {});
throw 1;

Fields["Cave - Annullér knap"].click();
throw 1;

var notatskab = "Ambulant primær journal";

try {
  Fields['Notat - Skabelon'].select(notatskab);
  } catch (e) {
    Fields['Notat - Skabelon'].select("Tilføj flere alternativer...");
    //Debug.showDialog('Debugged!');
    Fields["Notat - Skift skabelon"].click();
    try {
      Fields["Notat - Alternative skabeloner"].select(notatskab);
      Fields["Notat - Tilføj skabelon"].click();
      Fields["Cave - OK knap"].click();
    } catch (e) {
      Dialog.warn('Advarsel', 'Skabelon kan ikke vælges.');
    } 
  }

throw 1;

Fields['Notat - NavigatorTree'].select("Skal sendes");
Fields['Notat - Fast værdi'].select("Nej");
var skalsendes = Fields["Notat - Fast værdi TextArea"].read();
//var skalsendes = Fields["Notat - Fast værdi CellRenderer"].read();
//var skalsendes = Fields['Notat - Fast værdi'].read().items[0];
Dialog.warn("Skal Sendes", skalsendes);
    
throw 1;

var klinikernavn = "xyz";
Fields["Notat - Resource - Ret"].click();
try {
  Fields["Notat - Resource - Kliniker"].select(".*" + klinikernavn+" .*");
} catch (e) {
  Dialog.warn('Advarsel', "Kliniker " + klinikernavn + " findes ikke i listen.");
}
Fields["Notat - Resource - Tilføj"].click();
Fields["Notat - Resource - OK"].click();
throw 1;

for (i=10; i<60;i++) {
  for (j=10;j<24;j++){
  //Fields['Notat - Find Koder - Date'].focus();
  //Fields['Notat - Find Koder - Date'].inputNative("12");
  Fields['Notat - Find Koder - Time'].focus();
  Fields['Notat - Find Koder - Time'].inputNative(j);
    Fields['Notat - Find Koder - Time'].inputNative(i);
  }
}
throw 1;

//submitOnValidation

//Fields["Cave - Diktat Pil"].click();


Fields["Notat - Fritekst FOVAEL OCT o dx"].input('input');


throw 1;
Fields['Notat - Skabelon'].select("Ambulant klinisk kontakt");
Fields["Notat - NavigatorTree"].select("Objektiv undersøgelse");
Fields["Notat - Fast værdi arrow"].click();
Fields["Notat - Fast værdi"].select("Øjen objektiv undersøgelse"); 
Fields["Notat - NavigatorTree"].select("Behandlingsplan");

Fields['Notat - NavigatorTree'].select("Visus o d");
Fields["Notat - Numerisk værdi"].input("1.2");
Fields["Notat - Fritekst Visus o. dx."].input('input');

Fields['Notat - NavigatorTree'].select("Visus o s");
Fields["Notat - Numerisk værdi"].input("1.2");
Fields["Notat - Fritekst Visus o. sin."].input('input');

Fields['Notat - NavigatorTree'].select("Foveal OCT o d");
Fields["Notat - Numerisk værdi"].input("1.2");
Fields["Notat - Fritekst FOVAEL OCT o dx"].input('input');

Fields['Notat - NavigatorTree'].select("Foveal OCT o s");
Fields["Notat - Numerisk værdi"].input("1.2");
Fields["Notat - Fritekst FOVAEL OCT o sin"].input('input');

//Fields['Notat - NavigatorTree'].select("Egen brille o d");
//Fields["Notat - Numerisk værdi"].input("1.2");
//Fields["Notat - Fritekst FOVAEL OCT o dx"].input('input');

//Fields['Notat - NavigatorTree'].select("Egen brille o s");
//Fields["Notat - Numerisk værdi"].input("1.2");
//Fields["Notat - Fritekst FOVAEL OCT o sin"].input('input');
