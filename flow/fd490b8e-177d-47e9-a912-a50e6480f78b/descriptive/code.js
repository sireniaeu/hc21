var buttontypes = ["Ok", 'Cancel'];

/** Config for Pædagogisk afdeling **/
var P1 = [{name: "BVDY0", pad: "               ", txt: "Pæd. instruktion af HA-bruger\n                                + BDKA Instruktion af HA-bruger"},
          {name: "BVDY05", pad: "            ", txt: "Rådgivning i Pæd. Afd."},
          {name: "BVAA33A", pad: "         ", txt: "Telefonkonsultation med pt."},
          {name: "", pad: "", txt: "HA + ØP udleveres via CRS"},
          {name: "BDDD60", pad: "           ", txt: "Pæd. just af HA-bruger"},
          {name: "     APGE1", pad: "           ", txt: "+ Pædagog"},
          {name: "BDXY1", pad: "                ", txt: "AVT"}];

var vs = "Vælg samtale";

var Telefon = [vs,
               "BVAA33A       Telefonkonsultation (med pt.)", 
               "BVAW3            Tlf. samtale m. behandler/instans som led i beh. forløb", 
               "BVAW30         Tlf. samtale m. praktiserende læge", 
               "BVAW31         Tlf. samtale m. speciallæge",
               "BVAW32         Tlf. samtale m. andre myndigheder",
               "BVAW41         Tlf. samtale m. forældre", 
               "BVAW42         Tlf. samtale m. pårørende" ];

var cancelflag = false;
var validated = false;
var til1 = '';

/********************/
/** Audiologopæder **/
/********************/

  try {
    while (!validated) {
      var procedurer = Dialog.input(
        "Audiologopæd", 
        "Vælg procedurer",
        {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1], 'isCancel': true }],
         "Procedurer1": { "type": "CHECKBOX", 
                         "prompt": "Procedurer:", 
                         "orientation": 'vertical',
                         "options": [{'name': P1[0].name + P1[0].pad + P1[0].txt, value: P1[0].name},
                                     {'name': P1[1].name + P1[1].pad + P1[1].txt, value: P1[1].name},
                                     {'name': P1[2].name + P1[2].pad + P1[2].txt, value: P1[2].name},
                                     {'name': P1[3].name + P1[3].pad + P1[3].txt, value: P1[3].name},
                                     {'name': P1[4].name + P1[4].pad + P1[4].txt, value: P1[4].name},
                                     {'name': P1[5].name + P1[5].pad + P1[5].txt, value: P1[5].name},
                                     {'name': P1[6].name + P1[6].pad + P1[6].txt, value: P1[6].name}]
                        },
       
         "Telefon": {'type': 'SELECT',
                     'prompt': 'Telefonkonsultation',
                     'selectBetween': Telefon,
                     'value': Telefon[0]}
        }
      );
      if (procedurer.Procedurer1.length >0) {
        validated = true;
        for (j = 0; j < procedurer.Procedurer1.length; j++) { 
          if (procedurer.Procedurer1[j] === P1[5].name) {
            if (procedurer.Procedurer1[Math.max(j-1,0)] !== P1[4].name) {
              validated = false;
              Dialog.warn('Advarsel', "Når tillægskode APGE1 er valgt, skal procedurer " + P1[4].name + " også være valgt.", { });
            }
          }
        }
      }
    }
  } catch (e) {
    cancelflag = true;
  }

if (!cancelflag) {
  try {
    /*** Get date and time ***/
    var da = new Date();
    var d = da.getDate();
    if (d < 10) {d = ("0" + d);} else {d = d + "";}
    
    var m = da.getMonth() + 1;
    if (m < 10) {m = ("0" + m);} else {m = m + "";}
    var y = da.getFullYear() + "";
    var h = da.getHours();
    if (h < 10) {h = ("0" + h);} else {h = h + "";}
    var i = da.getMinutes();
    if (i < 10) {i = ("0" + i);} else {i = i + "";}
    
    var clinician = "";
    
    /*** Detect clinician ***/
    Flow.run('Check kliniker', {} );
    
    /*** Skabelon starter ***/

    /*** Objektiv undersøgelse ***/
    var udarbejdetaf = clinician.name;
    
    /*** Objektiv undersøgelse ***/
    var objektivundersogelse = "Øre-Næse-Hals objektiv undersøgelse";
    
    /*** Diagnoser ***/
    var diagnose1 = "N/A";
    var diagnose1add1 = "N/A";

    /*** Procedurer - set Ressource ***/
    var ressource = "N/A";  

    /*** Konklusion og plan ***/
    var konklusionogplan = "N/A";

    /*** Ordination af medicin ***/
    var ordinationafmedicin = "N/A";

    /*** Ordinationer, øvrige ***/
    var ordinationer2 = "N/A";

    /*** Information/accept ***/
    var information = "N/A";

    /*** Trin 2 ... ***/
    var trin2 = "N/A";
    var trin2tekst = "N/A";
    
    /*** Kontaktperson(er) ***/
    var kontaktperson = "N/A";
    var kontaktpersontekst = "N/A";

    /*** Hændelser i FMK ***/
    var fmk = "N/A";

    /*** Skal sendes ***/
    var skalsendes = "N/A";

    /*** Skabelon ends ****/
    /*** Final settings ***/
  
    /*** Create entry on dictation list ***/
    var dictate = "N/A";  
    var message = "N/A";  
  
    /*** End with setting focus at predefined field ***/
    var lastfield = "N/A";

    Flow.run('C Sub Amb klinisk kontakt', {Pudarbejdetaf: udarbejdetaf, 
                                           Pobjektivundersogelse: objektivundersogelse, 
                                           Pdiagnose1: diagnose1, 
                                           Pdiagnose1add1: diagnose1add1, 
                                           Pressource: ressource, 
                                           Pkonklusionogplan: konklusionogplan, 
                                           Pordinationafmedicin: ordinationafmedicin, 
                                           Pordinationer2: ordinationer2, 
                                           Pinformation: information, 
                                           Ptrin2: trin2, 
                                           Ptrin2tekst: trin2tekst, 
                                           Pkontaktperson: kontaktperson, 
                                           Pkontaktpersontekst: kontaktpersontekst, 
                                           Pfmk: fmk, 
                                           Pskalsendes: skalsendes, 
                                           Plastfield: lastfield} );  
   
    for (j = 0; j < procedurer.Procedurer1.length; j++) {   
      /* Audiologopæd procedurer */
      til1 = '';
      if (procedurer.Procedurer1[j] === P1[4].name) {
        if (procedurer.Procedurer1.length > j) {
          if (procedurer.Procedurer1[j+1] === P1[5].name) {
            til1 = "APGE1";
          }
        }
        if ( procedurer.Procedurer1[j] !== P1[5].name) {    
          try {
            /* Indsæt Procedurer code og tillægskode */
            Flow.run('C sub Procedurer', {
              'ProcedureCode': procedurer.Procedurer1[j],
              'TillaegsCode1': til1,
              'TillaegsCode2': '',
              'TillaegsCode3': '',
              'TillaegsCode4': '',
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
          } catch (e) {
            Dialog.warn('Advarsel', "Procedurer kan ikke indsættes.", {});
          }
        }
      }
    }

    
    if  (procedurer.Telefon !== vs) {
      /* Telefonkonsultation */
      try {
        /* Indsæt Procedurer code og tillægskode */
        Flow.run('C sub Procedurer', {
          'ProcedureCode': procedurer.Telefon.split(" ")[0],
          'TillaegsCode1': '',
          'TillaegsCode2': '',
          'TillaegsCode3': '',
          'TillaegsCode4': '',
          Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
      } catch (e) {
        Dialog.warn('Advarsel', "Telefonkonsultation kan ikke indsættes.", {});
      }
    }
    
  } catch (e) {
    Dialog.info('header', procedurer.buttons, { 'timeout': 10 });
    Dialog.warn('Afd F: Læge', e.message, { 'timeout': 10 });
    Log.warn('Afd F: Læge',e.message);
  }
}

