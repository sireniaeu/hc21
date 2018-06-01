/*var result = Fields["Psyk - besogcombo"].read();
Dialog.info('Besøgscombo', JSON.stringify(result), {  });*/

  
var result = Fields["Psyk - Åbn besøg vindue"].read();
Dialog.info('Vindue', result.message, {  });

throw 1;

windowIsShown = Window.withTitleShown("Åbn besøg");    
if (windowIsShown) {
  var result = Fields["Psyk - Åbn besøg vindue"].inspect();
  Dialog.info('Vindue', JSON.stringify(result), {  });
} else {
    Dialog.info('Vindue', "Ikke fundet", {  });
}

