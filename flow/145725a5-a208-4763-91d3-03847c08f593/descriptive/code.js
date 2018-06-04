/* OUH Afd. F - Øre-, næse-, hals-afdeling */

var clinictype = ["Audiologiassistent", 
                  "Læge", 
                  "Audiologopæder", 
                  "Ototeknisk service", 
                  "Teknisk afdeling"];

var buttontypes = ["Ok", 'Cancel'];

/*** Detect clinician ***/
Flow.run('Check kliniker', {} );

//** If title = a l p o t **//

  try {
    var ctype = Dialog.input(
      "OUH Afdeling F", 
      "Til brug for ukompliceret undersøgelse.\n\nHvis der er tale om en undersøgelse med komplikationer eller ekstraordinære tiltag, laves i stedet et diktat.",
      {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1], 'isCancel': true }],
       "Klinikertype": { "type": "RADIO", 
                        "prompt": "Klinikertype:", 
                        "orientation": 'vertical',
                        "selectBetween": clinictype,
                        'validation': {'isRequired': true, 'message': "Vælg kliniker"}
                       }
      });
  } catch (e) {
    throw "Cancel";
  }
  
  try {
    switch (ctype.Klinikertype){
      case clinictype[0]:
        var result = Flow.run('OUH Afd F Audiologiassistent', { });      
        break;
      case clinictype[1]:
        var result = Flow.run('OUH Afd F Læge', { });
        break;
      case clinictype[2]:
        var result = Flow.run('OUH Afd F Pædagoger', { });
        break;
      case clinictype[3]:      
        var result = Flow.run('OUH Afd F Ototeknik', { });
        break;
      case clinictype[4]:
        var result = Flow.run('OUH Afd F Teknisk afdeling', { });
        break;
    }
  } catch (e) {  
    throw 'Flow er afbrudt';
  }
