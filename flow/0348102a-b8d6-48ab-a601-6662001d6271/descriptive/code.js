var buttontypes = ["Ok", 'Cancel'];

/** Config for læge **/
var L1 = [{name: "ZZ0149", pad: "              ", txt: "Klinisk undersøgelse"},
          {name: "ZZ0150", pad: "              ", txt: "Journaloptagelse"},
          {name: "ZZ0151", pad: "              ", txt: "Klinisk kontrol"},
          {name: "BRS", pad: "                       ", txt: "Samtaleterapi (tinnituspt.)"},         
          {name: "KUDB22", pad: "            ", txt: "OTOMIKROSKOPI"},
          {name: "BDLF1", pad: "                 ", txt: "Fjernelse af ørevoks"},
          {name: "ZZ7097", pad: "              ", txt: "Podning af øregang"},
          {name: "BWDA0", pad: "              ", txt: "Receptudstedelse"},
          {name: "ZZ0181", pad: "              ", txt: "Anmeld. til Arbejdsskadestyr."},
          {name: "ZZ0182", pad: "              ", txt: "Udfærdigelse af erklæring"},
          {name: "ZZV005", pad: "              ", txt: "Statusattest"},
          {name: "ZZ7105", pad: "              ", txt: "Udredning til CI"},
          {name: "BDXY6", pad: "                ", txt: "Behandling med Meniet-apparatur"},
          {name: "ZZ7303", pad: "              ", txt: "Dix-Hallpike test"},
          {name: "ZZ7304", pad: "              ", txt: "Epleys procedure"},
          {name: "KUDH02A", pad: "        ", txt: "Rhinoskopi"},
          {name: "BVAA33B", pad: "          ", txt: "E-mail konsultation med pt."}];

var L2 = [{name: "AFX01A", pad: "              ", txt: "Endelig udredt (beh. i sygehusregi)"},
          {name: "AFX01C", pad: "              ", txt: "Endelig udredt (ingen beh.)"},
          {name: "AFX01D1", pad: "          ", txt: "Videre udredn. (faglige årsager)"},
          {name: "AFX01D4", pad: "          ", txt: "Videre udredn. (mangl. kapacitet)"}
          /*,
          {name: "INGEN KODE", pad: " ", txt: "(ventestatus 12 og assistancer)"}
          */];

var L3 = [{name: "BVDY04", pad: "              ", txt: "Undervisning af pt. i nødvendig viden, \n                                  f.eks. støj, høreværn"}];
       
var Tele = [{name: "BVAA33A", pad: "              ", txt: "Klinisk undersøgelse"},
          {name: "ZZ0150", pad: "              ", txt: "Journaloptagelse"},
          {name: "ZZ0151", pad: "              ", txt: "Klinisk kontrol"},
          {name: "BRS", pad: "                       ", txt: "Samtaleterapi (tinnituspt.)"},
          {name: "BVAA33A", pad: "         ", txt: "Telefonkonsultation med pt."},
          {name: "BVAA33B", pad: "          ", txt: "E-mail konsultation med pt."},
          {name: "KUDB22", pad: "            ", txt: "OTOMIKROSKOPI"},
          {name: "BDLF1", pad: "                 ", txt: "Fjernelse af ørevoks"},
          {name: "ZZ7097", pad: "              ", txt: "Podning af øregang"},
          {name: "BWDA0", pad: "              ", txt: "Receptudstedelse"},
          {name: "ZZ0181", pad: "              ", txt: "Anmeld. til Arbejdsskadestyr."},
          {name: "ZZ0182", pad: "              ", txt: "Udfærdigelse af erklæring"},
          {name: "ZZV005", pad: "              ", txt: "Statusattest"},
          {name: "ZZ7105", pad: "              ", txt: "Udredning til CI"},
          {name: "BDXY6", pad: "                ", txt: "Behandling med Meniet-apparatur"},
          {name: "ZZ7303", pad: "              ", txt: "Dix-Hallpike test"},
          {name: "ZZ7304", pad: "              ", txt: "Epleys procedure"},
          {name: "KUDH02A", pad: "        ", txt: "Rhinoskopi"}];

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

/********************/
/**      Læge      **/
/********************/

  try {
    var procedurer = Dialog.input(
      "Læge", 
      "Vælg procedurer",
      {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1], 'isCancel': true }],
       "Procedurer1": { "type": "CHECKBOX", 
                        "prompt": "Procedurer:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': L1[0].name + L1[0].pad + L1[0].txt, value: L1[0].name},
                          {'name': L1[1].name + L1[1].pad + L1[1].txt, value: L1[1].name},
                          {'name': L1[2].name + L1[2].pad + L1[2].txt, value: L1[2].name},
                          {'name': L1[3].name + L1[3].pad + L1[3].txt, value: L1[3].name},
                          {'name': L1[4].name + L1[4].pad + L1[4].txt, value: L1[4].name},
                          {'name': L1[5].name + L1[5].pad + L1[5].txt, value: L1[5].name},
                          {'name': L1[6].name + L1[6].pad + L1[6].txt, value: L1[6].name},
                          {'name': L1[7].name + L1[7].pad + L1[7].txt, value: L1[7].name},
                          {'name': L1[8].name + L1[8].pad + L1[8].txt, value: L1[8].name},
                          {'name': L1[9].name + L1[9].pad + L1[9].txt, value: L1[9].name},
                          {'name': L1[10].name + L1[10].pad + L1[10].txt, value: L1[10].name},
                          {'name': L1[11].name + L1[11].pad + L1[11].txt, value: L1[11].name},
                          {'name': L1[12].name + L1[12].pad + L1[12].txt, value: L1[12].name},
                          {'name': L1[13].name + L1[13].pad + L1[13].txt, value: L1[13].name},
                          {'name': L1[14].name + L1[14].pad + L1[14].txt, value: L1[14].name},
                          {'name': L1[15].name + L1[15].pad + L1[15].txt, value: L1[15].name},
                          {'name': L1[16].name + L1[16].pad + L1[16].txt, value: L1[16].name}]
                      },
       
       "Diagnose": { "type": "TEXT", 
                    "prompt": "Diagnose:", 'suffix': "                                                                                                              "},
       
/*      "Bidiagnose1": { "type": "TEXT",
                       "prompt": "Bidiagnose #1:", 'suffix': "                                                                                                              "},
       "Bidiagnose2": { "type": "TEXT",
                       "prompt": "Bidiagnose #2:", 'suffix': "                                                                                                              "},
       "Bidiagnose3": { "type": "TEXT",
                       "prompt": "Bidiagnose #3:", 'suffix': "                                                                                                              "},*/

      
       'Bidiagnoser': { 
         'type': 'MULTITEXT',
         'prompt': 'Bidiagnoser:',
         'texts': [
           { 'name': 'b1', 'prefix': '#1', 'suffix': " ", 'value': ""},
           { 'name': 'b2', 'prefix': '#2', 'suffix': " ", 'value': ""},
           { 'name': 'b3', 'prefix': '#3', 'value': ""}

         ]},
       
/*       'divider2': { 'type': 'DIVIDER'},*/

       "Udredning": { "type": "CHECKBOX", 
                        "prompt": "Koder vedr. udrednings-\ngarantien:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': L2[0].name + L2[0].pad + L2[0].txt, value: L2[0].name},
                          {'name': L2[1].name + L2[1].pad + L2[1].txt, value: L2[1].name},
                          {'name': L2[2].name + L2[2].pad + L2[2].txt, value: L2[2].name},
                          {'name': L2[3].name + L2[3].pad + L2[3].txt, value: L2[3].name}]
                      },

       "Forebyggelse": { "type": "CHECKBOX", 
                        "prompt": "Forebyggelse:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': L3[0].name + L3[0].pad + L3[0].txt, value: L3[0].name}]
                      },
       "Telefon": {'type': 'SELECT',
                   'prompt': 'Telefonkonsultation',
                   'selectBetween': Telefon,
                   'value': Telefon[0]}
      }
    );
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
    
    /*** Diagnoser ***/
    var diagnose1 = "N/A";

    /*** Skabelon ends ****/
    /*** Final settings ***/

  
    /*** End with setting focus at predefined field ***/
    var lastfield = "N/A";

    Flow.run('C Sub Diagnoser og procedurer', {Pdiagnose1: diagnose1,
                                           Plastfield: lastfield} );  
   
    if  (procedurer.Procedurer1.length >0) {
      for (j = 0; j < procedurer.Procedurer1.length; j++) {   
        /* Læge procedurer */
        try {
          /* Indsæt Procedurer code og tillægskode */
          Flow.run('C sub Procedurer', {
            'ProcedureCode': procedurer.Procedurer1[j],
            'TillaegsCode1': '',
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
            Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
        } catch (e) {
          Dialog.warn('Advarsel', "Procedurer kan ikke indsættes.", {});
        }
      }
    }
    
    if  (procedurer.Diagnose.length > 0) {
      var bidiag1 = procedurer.Bidiagnoser.b1;
      var bidiag2 = procedurer.Bidiagnoser.b2;
      var bidiag3 = procedurer.Bidiagnoser.b3;
        /* Læge diagnose */
        try {
          /* Indsæt Procedurer code og tillægskode */
          Flow.run('C sub Diagnoser', {
            'DiagnoseCode': procedurer.Diagnose,
            'TillaegsCode1': procedurer.Bidiagnoser.b1,
            'TillaegsCode2': procedurer.Bidiagnoser.b2,
            'TillaegsCode3': procedurer.Bidiagnoser.b3,
            Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
        } catch (e) {
          Dialog.warn('Advarsel', "Procedurer kan ikke indsættes.", {});
        }
      }
    
    
    if  (procedurer.Udredning.length >0) {
      for (j = 0; j < procedurer.Udredning.length; j++) {
        /* Udrednings procedurer */
        try {
          /* Indsæt Procedurer code og tillægskode */
          Flow.run('C sub Procedurer', {
            'ProcedureCode': procedurer.Udredning[j],
            'TillaegsCode1': '',
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
            Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
        } catch (e) {
          Dialog.warn('Advarsel', "Udredningsprocedurer kan ikke indsættes.", {});
        }
      }
    }
        
    if  (procedurer.Forebyggelse.length >0) {
      for (j = 0; j < procedurer.Forebyggelse.length; j++) {
        /* Forebyggelses procedurer */
        try {
          /* Indsæt Procedurer code og tillægskode */
          Flow.run('C sub Procedurer', {
            'ProcedureCode': procedurer.Forebyggelse[j],
            'TillaegsCode1': '',
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
            Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
        } catch (e) {
          Dialog.warn('Advarsel', "Forebyggelsesprocedurer kan ikke indsættes.", {});
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
