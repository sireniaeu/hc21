//var result = Fields["Notat - Kliniker"].read();
//Dialog.info("Kliniker", JSON.stringify(result.items[0]));

Fields["Notat - Resource - Ret"].click();
//Wait.forSeconds(2);
var modalIsShown = Window.modalShown();
Dialog.info("Model", modalIsShown);

//Fields["Notat - Skift skabelon"].click();


Dialog.info('Wait', '4 s', { 'timeout': 4 });
Fields["Notat - Resource - Arrow"].click();
Fields["Notat - Resource - Kliniker"].select("James");
Wait.forSeconds(3);
Fields["Notat - Resource - Tilføj"].click();
Fields["Notat - Resource - OK"].click();