/* Data setup for Audiologiassistent til kald af C Sub hoerenotat */

var StdRetry = 10;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var enhed = "OUH Øre-, Næse- og Hals Afsnit F2 ";

var buttontypes = ["Ok", 'Cancel'];
var barn = ["Nej", "Ja"];

/** Config for Audiologassistent **/
var AAP1 = [{
    name: "ZZ7091",
    pad: "             ",
    txt: "Audiometri med læge"
  },
  {
    name: "ZZ7091",
    pad: "             ",
    txt: "Audiometri uden læge"
  },
  {
    name: "ZZ7091A",
    pad: "          ",
    txt: "APD"
  },
  {
    name: "ZZ7096",
    pad: "             ",
    txt: "Tympanometri"
  },
  {
    name: "UCGL",
    pad: "                  ",
    txt: "ABR Hjernestammeaudiometri"
  },
  {
    name: "ZZ7100D",
    pad: "         ",
    txt: "ASSR"
  },
  {
    name: "ZZ1450D1",
    pad: "      ",
    txt: "Diagnostisk ABR(D-ABR(toneburst))"
  },
  {
    name: "ZZ7103",
    pad: "             ",
    txt: "Diskriminationsmåling i frit felt"
  },
  {
    name: "ZPP68",
    pad: "            ",
    txt: "Proc. afbrudt pga. andre årsager"
  }
];

var Ear = ["Vælg øre(r)", "Højre øre", "Venstre øre", "Bilateralt"];

/* Tilpasning */
var T1 = [{
    name: "BDDD6",
    pad: "             ",
    txt: "Høreapparattilpasning"
  },
  {
    name: "BDDA0",
    pad: "              ",
    txt: "Beh. m. KA."
  },
  {
    name: "BDDA2",
    pad: "              ",
    txt: "Beh. m. ØH."
  },
  {
    name: "BDDD62",
    pad: "          ",
    txt: "Tilpasning af CI"
  },
  {
    name: "BDDB",
    pad: "                 ",
    txt: "Spec. HA-beh. (MASKER)"
  },
  {
    name: "BDDB0",
    pad: "              ",
    txt: "Beh. med BC og BAHA"
  },
  {
    name: "BDDB1",
    pad: "              ",
    txt: "Beh. med CROS"
  },
  {
    name: "BDDB2",
    pad: "              ",
    txt: "Beh. med BICROS"
  },
  {
    name: "BDKA",
    pad: "                 ",
    txt: "Instruktion af HA-bruger"
  },
  {
    name: "ZPP68",
    pad: "            ",
    txt: "Proc. afbrudt pga. andre årsager"
  }
];

/* Justering */
var J1 = [{
    name: "BDDD60",
    pad: "           ",
    txt: "Justering af HA"
  },
  {
    name: "BDDD62",
    pad: "           ",
    txt: "Justering af CI"
  },
  {
    name: "BVDY00",
    pad: "             ",
    txt: "Vejledning af patient"
  },
  {
    name: "BVDT02",
    pad: "             ",
    txt: "Vejledning i brug af andet hjælpem.\n                                 (fjernbetj., øreprop etc.)"
  },
  {
    name: "ZPP68",
    pad: "            ",
    txt: "Proc. afbrudt pga. andre årsager"
  }
];

/** General config **/
var F1 = [{
  name: "BVDY04",
  pad: "               ",
  txt: "Undervisning af pt. i nødvendig viden,\n                                   f.eks. støj, høreværn"
}];

/* Hjernestammeundersøgelse */
var H1 = [{
    name: "ZZ1450D",
    pad: "           ",
    txt: "Automatisk ABR (A-ABR)"
  },
  {
    name: "ZPP68",
    pad: "            ",
    txt: "Proc. afbrudt pga. andre årsager"
  }
];

/* Emissionsus. TEOAE */
var ET = [{
    name: "ZZ7306D",
    pad: "           ",
    txt: "Emissionsus. TEOAE"
  },
  {
    name: "ZPP68",
    pad: "            ",
    txt: "Proc. afbrudt pga. andre årsager"
  }
];

/* Emissionsus. DPOAE */
var ED = [{
    name: "ZZ7307D",
    pad: "           ",
    txt: "Emissionsus. DPOAE"
  },
  {
    name: "ZPP68",
    pad: "            ",
    txt: "Proc. afbrudt pga. andre årsager"
  }
];

/* Elektrocochleografi */
var EC = [{
  name: "ZZ1460",
  pad: "               ",
  txt: "Elektrocochleografi\n+ UFYA00           Elektrofysiologisk us."
}];

/* V-Hit */
var VH = [{
  name: "ZZ7094",
  pad: "               ",
  txt: "Vestibulærundersøgelse\n+ ZZ7301           Smooth persuit"
}];

/* Klinisk undersøgelse  */
var KU = [{
  name: "ZZ0149",
  pad: "               ",
  txt: "Klinisk undersøgelse (1. besøg efter henv.)"
}];

/* Musikerhøreværn: 
(Diagnose: DZ298)*/
var M1 = [{
  name: "ZZ7103",
  pad: "               ",
  txt: "Fritfeltsmåling af høreværn"
}];

var RE = ["ZPR01A Bestået", "ZPR00A Henvises", "ZPR00B Ikke bestået"];

var vejl = ["Angiv vejledning\n", "Ikke relevant.\n", "Der gives instruktion og udleveres relevante vejledninger.\n", "Patienten medgives relevante vejledninger og går videre til begynderundervisning ved lokalt kommunikationscenter her.\n", "Patienten gives kort instruktion og der udleveres relevante vejledninger. Anbefales kontakt til lokalt kommunikationscenter m.h.p. begynderundervisning.\n"];

var til1 = '';
var til2 = '';
var til3 = '';
var til4 = '';

var FlagBDDA2 = false;
var FlagBDDA0 = false;

var FlagSlut = false;

var janej = ["Ja", "Nej"];

var samtykkesendt = ["ingen", "henvisende instans", "andre"];

var samtykketxt = "Patienten giver samtykke til udlevering af relevante journaloplysninger til lokalt kommunikationscenter: ";

/*function fnsamtykke() {
  try {
    var janejinfo = Dialog.input(
      "Samtykke",
      samtykketxt, {
        buttons: [{
          'value': buttontypes[0]
        }, {
          'value': buttontypes[1],
          'isCancel': true
        }],
        'jn': {
          'prompt': '',
          'type': 'RADIO',
          "orientation": 'horisontal',
          'selectBetween': [janej[0], janej[1]],
          'value': janej[0]
        }
      });
    return janejinfo.jn;
  } catch (e) {
    FlagSlut = true;
  }
}*/


/*function fnvejl() {
  try {
    var vejlinfo = Dialog.input(
      "Vejledning",
      "", {
        buttons: [{
          'value': buttontypes[0]
        }, {
          'value': buttontypes[1],
          'isCancel': true
        }],
        'maxDialogWidth': 1000,
        'vejl': {
          'prompt': 'Angiv vejledning:',
          'type': 'SELECT',
          "orientation": 'vertical',
          'selectBetween': vejl,
          'value': vejl[0]
        }
      });
    return vejlinfo.vejl;
  } catch (e) {
    FlagSlut = true;
  }
}*/


/************************/
/** Audiologiassistent **/
/************************/
var validated = false;

while (!validated) {
  try {
    var audiologiass = Dialog.input(
      "Audiologiassistent",
      "Vælg procedurer", {
        buttons: [{
          'value': buttontypes[0]
        }, {
          'value': buttontypes[1],
          'isCancel': true
        }],
        'maxDialogWidth': 510,
        "Procedurer1": {
          "type": "CHECKBOX",
          "prompt": "Høretab:",
          "orientation": 'vertical',
          "options": [{
              'name': AAP1[0].name + AAP1[0].pad + AAP1[0].txt,
              value: "AUDIOM"
            },
            {
              'name': AAP1[1].name + AAP1[1].pad + AAP1[1].txt,
              value: "AUDIOU"
            },
            {
              'name': AAP1[2].name + AAP1[2].pad + AAP1[2].txt,
              value: AAP1[2].name
            },
            {
              'name': AAP1[3].name + AAP1[3].pad + AAP1[3].txt,
              value: AAP1[3].name
            },
            {
              'name': AAP1[4].name + AAP1[4].pad + AAP1[4].txt,
              value: AAP1[4].name
            },
            {
              'name': AAP1[5].name + AAP1[5].pad + AAP1[5].txt,
              value: AAP1[5].name
            },
            {
              'name': AAP1[6].name + AAP1[6].pad + AAP1[6].txt,
              value: AAP1[6].name
            },
            {
              'name': AAP1[7].name + AAP1[7].pad + AAP1[7].txt,
              value: AAP1[7].name
            },
            {
              'name': AAP1[8].name + AAP1[8].pad + AAP1[8].txt,
              value: AAP1[8].name
            }
          ]
        },
        
        'Barn': {
          'prompt': 'Barn',
          'type': 'RADIO',
          "orientation": 'horisontal',
          'selectBetween': barn,
          'value': barn[0]
        },

        'Samtykkesendt': {
          'type': 'SELECT',
          'prompt': 'Samtykke sendt til',
          'selectBetween': samtykkesendt,
          'value': samtykkesendt[0]
        },
        
        "divider1": { 'type': 'DIVIDER'},

        'Ear': {
          'type': 'SELECT',
          'prompt': 'Øre',
          'selectBetween': Ear,
          'value': Ear[0]
        },

        "Tilpasning": {
          'type': "CHECKBOX",
          'prompt': "Tilpasning",
          'orientation': 'vertical',
          'options': [{
              "name": T1[0].name + T1[0].pad + T1[0].txt,
              value: T1[0].name
            },
            {
              "name": T1[1].name + T1[1].pad + T1[1].txt,
              value: T1[1].name
            },
            {
              "name": T1[2].name + T1[2].pad + T1[2].txt,
              value: T1[2].name
            },
            {
              "name": T1[3].name + T1[3].pad + T1[3].txt,
              value: T1[3].name
            },
            {
              "name": T1[4].name + T1[4].pad + T1[4].txt,
              value: T1[4].name
            },
            {
              "name": T1[5].name + T1[5].pad + T1[5].txt,
              value: T1[5].name
            },
            {
              "name": T1[6].name + T1[6].pad + T1[6].txt,
              value: T1[6].name
            },
            {
              "name": T1[7].name + T1[7].pad + T1[7].txt,
              value: T1[7].name
            },
            {
              "name": T1[8].name + T1[8].pad + T1[8].txt,
              value: T1[8].name
            },
            {
              "name": T1[9].name + T1[9].pad + T1[9].txt,
              value: T1[9].name
            }
          ]
        },

        'Samtykke': {
          'prompt': 'Samtykke',
          'type': 'RADIO',
          "orientation": 'horisontal',
          'selectBetween': janej,
          'value': janej[0]
        },

        'vejl': {
          'prompt': 'Vejledning',
          'type': 'SELECT',
          "orientation": 'vertical',
          'selectBetween': vejl,
          'value': vejl[0]
        },

        "Justering": {
          'type': "CHECKBOX",
          'prompt': "Justering",
          'orientation': 'vertical',
          'options': [{
              'name': J1[0].name + J1[0].pad + J1[0].txt,
              value: J1[0].name
            },
            {
              'name': J1[1].name + J1[1].pad + J1[1].txt,
              value: J1[1].name
            },
            {
              'name': J1[2].name + J1[2].pad + J1[2].txt,
              value: J1[2].name
            },
            {
              'name': J1[3].name + J1[3].pad + J1[3].txt,
              value: J1[3].name
            },
            {
              'name': J1[4].name + J1[4].pad + J1[4].txt,
              value: J1[4].name
            }
          ]
        },
        
        "divider2": { 'type': 'DIVIDER'},

        "Hjernestamme1": {
          'type': "CHECKBOX",
          'prompt': "Hjernestammeunders.:",
          'orientation': 'vertical',
          'options': [{
              'name': H1[0].name + H1[0].pad + H1[0].txt,
              value: H1[0].name
            },
            {
              'name': H1[1].name + H1[1].pad + H1[1].txt,
              value: H1[1].name
            }
          ]
        },

        'Hjernestamme2': {
          'type': 'SELECT',
          'prompt': '',
          'selectBetween': RE,
          'value': RE[0]
        },

        "TEOAE1": {
          'type': "CHECKBOX",
          'prompt': "Emissionsus. TEOAE:",
          'orientation': 'vertical',
          'options': [{
              'name': ET[0].name + ET[0].pad + ET[0].txt,
              value: ET[0].name
            },
            {
              'name': ET[1].name + ET[1].pad + ET[1].txt,
              value: ET[1].name
            }
          ]
        },

        'TEOAE2': {
          'type': 'SELECT',
          'prompt': '',
          'selectBetween': RE,
          'value': RE[0]
        },

        "DPOAE1": {
          'type': "CHECKBOX",
          'prompt': "Emissionsus. DPOAE:",
          'orientation': 'vertical',
          'options': [{
              'name': ED[0].name + ED[0].pad + ED[0].txt,
              value: ED[0].name
            },
            {
              'name': ED[1].name + ED[1].pad + ED[1].txt,
              value: ED[1].name
            }
          ]
        },

        'DPOAE2': {
          'type': 'SELECT',
          'prompt': '',
          'selectBetween': RE,
          'value': RE[0]
        },

        "Elektro": {
          'type': "CHECKBOX",
          'prompt': "Elektrocochleografi:",
          'orientation': 'vertical',
          'options': [{
            'name': EC[0].name + EC[0].pad + EC[0].txt,
            value: EC[0].name
          }]
        },

        "VHit": {
          'type': "CHECKBOX",
          'prompt': "Vestibulærundersøgelse:",
          'orientation': 'vertical',
          'options': [{
            'name': VH[0].name + VH[0].pad + VH[0].txt,
            value: VH[0].name
          }]
        },

        "Kliniskund": {
          'type': "CHECKBOX",
          'prompt': "Klinisk undersøgelse :",
          'orientation': 'vertical',
          'options': [{
            'name': KU[0].name + KU[0].pad + KU[0].txt,
            value: KU[0].name
          }]
        },

        "Hoerevaerne": {
          'type': "CHECKBOX",
          'prompt': "Musikerhøreværn:",
          'orientation': 'vertical',
          'options': [{
            'name': M1[0].name + M1[0].pad + M1[0].txt,
            value: "0"
          }]
        }
      }
    );
  } catch (e) {
    FlagSlut = true;
    validated = true;
  }

  if (!FlagSlut) {
    if (audiologiass.Tilpasning.length > 0 && audiologiass.Ear === Ear[0]) {
      Dialog.warn('Advarsel', 'Vælg øre.', {});
      validated = false; 
    } else {
      if ((audiologiass.Tilpasning.length > 0) && (audiologiass.Samtykke + "" === janej[0]) && (audiologiass.vejl + "" === vejl[0])) {
        Dialog.warn('Advarsel', 'Vælg vejledning.', {});
        validated = false; 
      } else {
        validated = true;
      }
    }
  }
  
  if (!FlagSlut) {
    if (audiologiass.Procedurer1.length > 0) {
      if (audiologiass.Procedurer1[1] === "AUDIOU") { /* Hvis 2. checkbox er AUDIOU må den 1. være AUDIOM */
        Dialog.warn('Advarsel', 'Audiometri kan ikke være både med og uden læge.', {});
        validated = false; 
      } else {
        validated = true;
      }
    }
  }
  
} /* Slut hovedmenu */


if (!FlagSlut) {
  try {
    /*** Get date and time ***/
    var da = new Date();
    var d = da.getDate();
    if (d < 10) {
      d = ("0" + d);
    } else {
      d = d + "";
    }
    var m = da.getMonth() + 1;
    if (m < 10) {
      m = ("0" + m);
    } else {
      m = m + "";
    }
    var y = da.getFullYear() + "";
    var h = da.getHours();
    if (h < 10) {
      h = ("0" + h);
    } else {
      h = h + "";
    }
    var i = da.getMinutes();
    if (i < 10) {
      i = ("0" + i);
    } else {
      i = i + "";
    }

    /*** Detect clinician ***/
    Flow.run('Check kliniker', {});

    /*** Skabelon starter ***/
    
    var lastfield = "N/A";

    /*** Kontaktperson   ***/
    var kontaktperson = "N/A";
    var kontaktpersontekst = "N/A";

    /*** Visitkort   ***/
    var visitkort = "N/A";
    var visitkorttekst = "N/A";

    var samtykke = "N/A";
    /* Spørg om Samtykke ved specifikke procedurer under Tilpasning og Justering */

    if (audiologiass.Tilpasning.length > 0) {
      samtykke = samtykketxt + audiologiass.Samtykke;
      if (audiologiass.Samtykke === janej[0]) {
        samtykke = samtykke + "<newline><newline>" + audiologiass.vejl;
      }
    }
    if (audiologiass.Justering.length > 0) {
      switch (audiologiass.Justering[0]) {
        case J1[0].name:
        case J1[1].name:
          samtykke = samtykketxt + audiologiass.Samtykke;
          break;
      }
    }

    /* Samtykke ved audiometri */
    if (audiologiass.Procedurer1.length > 0) {
      if (audiologiass.Procedurer1[0] === "AUDIOU" && audiologiass.Barn === barn[0]) {
        samtykke = "Patienten er velmotiveret for behandlingen og medgives tid til høreapparattilpasning.<newline><newline>Efter aftale sendes kopi til: " + audiologiass.Samtykkesendt + ".";
      }
    }

    /*** Objektivundersoegelse   ***/
    var objektivundersoegelse = "N/A";

    /*** Audiometri   ***/
    var audiometri = "N/A";

    if (audiologiass.Procedurer1.length > 0) {
      if (audiologiass.Procedurer1[0] === "AUDIOU" && audiologiass.Barn === barn[0])  {
        audiometri = "Patienten kommer til høreundersøgelse m.h.p. høreapparatbehandling. Ved visitationen er der på baggrund af oplysninger fra henvisende instans og evt. tidligere journaloplysninger ikke fundet behov for udredning ved læge på Høreklinikken.<newline><newline>Audiometri som anført i auditbase.<newline><newline>Bemærkninger: ";
      } 
      if (audiologiass.Procedurer1[0] === "AUDIOM" && audiologiass.Barn === barn[0])  {
        audiometri = "Patienten kommer til høreundersøgelse m.h.p. høreapparatbehandling.<newline><newline>Audiometri som anført i auditbase.<newline><newline>Bemærkninger: ";
      }
    }
    
    /*** Angivelsesnøjagtighed   ***/
    var angivelsesnoejagtighed = "N/A";
    var angivelsesnoejagtighedtekst = "N/A";

    /*** Frifeltsaudiometri   ***/
    var frifeltsaudiometri = "N/A";

    /*** Behandlingsforslag ***/
    var behandlingsforslag = "N/A";

    if (audiologiass.Procedurer1.length > 0 && audiologiass.Barn === barn[0]) {
      if (audiologiass.Procedurer1[0] === "AUDIOU")  {
        behandlingsforslag = "Patienten anbefales høreapparatbehandling som anført.<newline><newline>Årsagskode: <newline>HA type: <newline>Farve: <newline>Øreprop: <newline><newline>Fjernbetjening: ";
      } 
      if (audiologiass.Procedurer1[0] === "AUDIOM" && audiologiass.Barn === barn[0])  {
        behandlingsforslag = "Der foreslås høreapparatbehandling som anført.<newline><newline>Årsagskode: <newline>HA type: <newline>Farve: <newline>>Øreprop: <newline><newline>Fjernbetjening: <newline><newline>Patienten går videre til læge.";
      }
      var lastfield = "Audiometri";
    }

    /*** Farve ***/
    var farve = "N/A";

    /*** Øreprop/ventilation ***/
    var behoereprop = "N/A";

    /******************/
    /*** Tilpasning ***/
    /******************/
    var tilpasning = "N/A";
    var tilpasningtekst = "N/A";
    var tilpfabrikat = "N/A"; /*** Fabrikat / Type / Farve ***/
    var tilpprogramvalg = "N/A"; /*** Programvalg ***/
    var tilpslange = "N/A"; /*** Slangestørrelse / Øretip ***/
    var tilpoereprop = "N/A"; /*** Øreprop/ventilation ***/

    if (audiologiass.Tilpasning.length > 0) {
      var vejlres = "";
      if (audiologiass.Tilpasning[audiologiass.Tilpasning.length - 1] !== "ZPP68") {
        var tilpasning = "N/A";
        /* GL TEKST var tilpasningtekst = "Tilpasset i <newline><newline>Der er udleveret relevante vejledninger og givet instruktion."; */
        var tilpasningtekst = "Patienten kommer til apparattilpasning: <newline><newline>Der udleveres apparat til: " + audiologiass.Ear + ".<newline><newline>Planlagt opfølgning: ";

        var tilpfabrikat = "Licitationskode: <newline>HA-model: <newline>Tilbehør: <newline>Farve: <newline>Filtre: <newline>Batteristr.: ";
        var tilpprogramvalg = "P1: <newline>P2: <newline>P3: <newline>P4: <newline><newline>Volumenkontrol: <newline>Programomskifter: ";
        var tilpslange = "Receiver/Slange: <newline>Domes: ";
        var tilpoereprop = "ØP-type: <newline>Ventilation: ";
      }
      var lastfield = "Tilpasning";
    }


    /*****************/
    /*** Justering ***/
    /*****************/
    var justering = "N/A";
    var justeringtekst = "N/A";
    var justfabrikat = "N/A"; /*** Fabrikat / Type / Farve ***/
    var justprogramvalg = "N/A"; /*** Programvalg ***/
    var justslange = "N/A"; /*** Slangestørrelse / Øretip ***/
    var justoereprop = "N/A"; /*** Øreprop/ventilation ***/

    if (audiologiass.Justering.length > 0) {
      var justering = "N/A";
      var justeringtekst = "Patienten kommer til justering.<newline><newline>Problemstilling:<newline><newline>Justering:<newline><newline>Planlagt opfølgning: <newline><newline>";

      var justfabrikat = "N/A"; /*"Licitationskode: <newline>HA-model: <newline>Tilbehør: <newline>Farve: <newline>Filtre: <newline>Batteristr.: ";*/

      var justprogramvalg = "N/A"; /*"P1: <newline>P2: <newline>P3: <newline>P4: <newline><newline>Volumenkontrol: <newline>Programomskifter: ";*/
      var justslange = "N/A"; /*"Receiver/Slange: <newline>Domes: ";*/
      var justoereprop = "N/A"; /*"ØP-type: <newline>Ventilation: ";*/

      var lastfield = "Justering";
    }

    /*****************/
    /*** Diagnoser ***/
    /*****************/
    var Diagnose1 = "N/A";
    var Diagnose1add1 = "N/A";
    if (audiologiass.Hoerevaerne.length > 0) {
      var Diagnose1 = "DZ298";
    }

    /*********************************/
    /*** Preset Procedurer to null ***/
    /*** Procedurer set separately ***/
    /*********************************/
    var ProcedureCode1 = "N/A";
    var ProcedureCode1add1 = "N/A";
    var ProcedureCode1add2 = "N/A";
    var ProcedureCode1add3 = "N/A";
    var ProcedureCode2 = "N/A";
    var ProcedureCode2add1 = "N/A";
    var ProcedureCode3 = "N/A";
    var ProcedureCode4 = "N/A";
    var ProcedureCode5 = "N/A";
    var ProcedureCode6 = "N/A";
    var Ressource = "N/A";

    /*** Skal sendes ***/
    var skalsendes = "Nej";

    /*** Skabelon ends ****/
    /*** Final settings ***/

    /*** Run Flow motor ***/
    try {
      Flow.run('C Sub hoerenotat', {
        AOd: d,
        AOm: m,
        AOy: y,
        AOh: h,
        AOi: i,
        AOkontaktperson: kontaktperson,
        AOkontaktpersontekst: kontaktpersontekst,
        AOvisitkort: visitkort,
        AOvisitkorttekst: visitkorttekst,
        AOsamtykke: samtykke,
        AOobjektivundersoegelse: objektivundersoegelse,
        AOaudiometri: audiometri,
        AOangivelsesnoejagtighed: angivelsesnoejagtighed,
        AOangivelsesnoejagtighedtekst: angivelsesnoejagtighedtekst,
        AOfrifeltsaudiometri: frifeltsaudiometri,
        AObehandlingsforslag: behandlingsforslag,
        AOfarve: farve,
        AObehoereprop: behoereprop,
        AOtilpasning: tilpasning,
        AOtilpasningtekst: tilpasningtekst,
        AOtilpfabrikat: tilpfabrikat,
        AOtilpprogramvalg: tilpprogramvalg,
        AOtilpslange: tilpslange,
        AOtilpoereprop: tilpoereprop,
        AOjustering: justering,
        AOjusteringtekst: justeringtekst,
        AOjustfabrikat: justfabrikat,
        AOjustprogramvalg: justprogramvalg,
        AOjustslange: justslange,
        AOjustoereprop: justoereprop,
        AODiagnose1: Diagnose1,
        AODiagnose1add1: Diagnose1add1,
        AOProcedureCode1: ProcedureCode1,
        AOProcedureCode1add1: ProcedureCode1add1,
        AOProcedureCode1add2: ProcedureCode1add2,
        AOProcedureCode1add3: ProcedureCode1add3,
        AOProcedureCode2: ProcedureCode2,
        AOProcedureCode2add1: ProcedureCode2add1,
        AOProcedureCode3: ProcedureCode3,
        AOProcedureCode4: ProcedureCode4,
        AOProcedureCode5: ProcedureCode5,
        AOProcedureCode6: ProcedureCode6,
        AORessource: Ressource,
        AOskalsendes: skalsendes,
        AOenhed: enhed,
        AOlastfield: lastfield
      });

      /***********************************/
      /*** Set Procedurer of all types ***/
      /***********************************/

      /* Procedurer for høretab */
      try {
        if (audiologiass.Procedurer1.length > 0) {

          /* Hvis Procedurer afbrudt sæt Procedurer som tillægskode */
          if (audiologiass.Procedurer1[audiologiass.Procedurer1.length - 1] === "ZPP68") {
            if (audiologiass.Procedurer1.length > 5) {
              Dialog.warn('Advarsel', 'For mange koder angivet.', {});
              throw 1;
            }
            /* Sæt Procedurer som tillægskoder*/
            if (audiologiass.Procedurer1.length > 1) {
              if (audiologiass.Procedurer1[0] === "AUDIOM" || audiologiass.Procedurer1[0] === "AUDIOU") {
                var til1 = AAP1[0].name;
              } else {
                var til1 = audiologiass.Procedurer1[0];
              }
            }
            if (audiologiass.Procedurer1.length > 2) {
              var til2 = audiologiass.Procedurer1[1];
            }
            if (audiologiass.Procedurer1.length > 3) {
              var til3 = audiologiass.Procedurer1[2];
            }
            if (audiologiass.Procedurer1.length > 4) {
              var til4 = audiologiass.Procedurer1[3];
            }
            Flow.run('C sub Procedurer', {
              'ProcedureCode': "ZPP68",
              'TillaegsCode1': til1,
              'TillaegsCode2': til2,
              'TillaegsCode3': til3,
              'TillaegsCode4': til4,
              Pd: d,
              Pm: m,
              Py: y,
              Ph: h,
              Pi: i
            });
          } else {
            for (j = 0; j < audiologiass.Procedurer1.length; j++) {
              if (audiologiass.Procedurer1[j] === "AUDIOM" || audiologiass.Procedurer1[j] === "AUDIOU") {
                var pcode = AAP1[0].name; 
              } else {
                var pcode = audiologiass.Procedurer1[j];
              }
              Flow.run('C sub Procedurer', {
                'ProcedureCode': pcode,
                'TillaegsCode1': '',
                'TillaegsCode2': '',
                'TillaegsCode3': '',
                'TillaegsCode4': '',
                Pd: d,
                Pm: m,
                Py: y,
                Ph: h,
                Pi: i
              });
            }
          }
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for høretab kan ikke indsættes.", {});
      }


      /* Tilpasning */
      try {
        if (audiologiass.Tilpasning.length > 0) {
          /* Hvis Procedurer afbrudt sæt Procedurer som tillægskode */
          if (audiologiass.Tilpasning[audiologiass.Tilpasning.length - 1] === "ZPP68") {
            if (audiologiass.Tilpasning.length > 5) {
              Dialog.warn('Advarsel', 'For mange koder angivet.', {});
              throw 1;
            }
            /* Sæt Procedurer som tillægskoder*/
            if (audiologiass.Tilpasning.length > 1) {
              var til1 = audiologiass.Tilpasning[0];
            }
            if (audiologiass.Tilpasning.length > 2) {
              var til2 = audiologiass.Tilpasning[1];
            }
            if (audiologiass.Tilpasning.length > 3) {
              var til3 = audiologiass.Tilpasning[2];
            }
            if (audiologiass.Tilpasning.length > 4) {
              var til4 = audiologiass.Tilpasning[3];
            }
            Flow.run('C sub Procedurer', {
              'ProcedureCode': "ZPP68",
              'TillaegsCode1': til1,
              'TillaegsCode2': til2,
              'TillaegsCode3': til3,
              'TillaegsCode4': til4,
              Pd: d,
              Pm: m,
              Py: y,
              Ph: h,
              Pi: i
            });
          } else {

            for (j = 0; j < audiologiass.Tilpasning.length; j++) {

              switch (audiologiass.Tilpasning[j] + "") {
                case T1[1].name:
                case T1[2].name:
                case T1[4].name:

                  switch (audiologiass.Ear) {
                    case Ear[1]:
                      Flow.run('C sub Procedurer', {
                        'ProcedureCode': audiologiass.Tilpasning[j],
                        'TillaegsCode1': 'TUL1',
                        'TillaegsCode2': '',
                        'TillaegsCode3': '',
                        'TillaegsCode4': '',
                        Pd: d,
                        Pm: m,
                        Py: y,
                        Ph: h,
                        Pi: i
                      });
                      break;
                    case Ear[2]:
                      Flow.run('C sub Procedurer', {
                        'ProcedureCode': audiologiass.Tilpasning[j],
                        'TillaegsCode1': 'TUL2',
                        'TillaegsCode2': '',
                        'TillaegsCode3': '',
                        'TillaegsCode4': '',
                        Pd: d,
                        Pm: m,
                        Py: y,
                        Ph: h,
                        Pi: i
                      });
                      break;
                    case Ear[3]:
                      Flow.run('C sub Procedurer', {
                        'ProcedureCode': audiologiass.Tilpasning[j],
                        'TillaegsCode1': 'TUL1',
                        'TillaegsCode2': '',
                        'TillaegsCode3': '',
                        'TillaegsCode4': '',
                        Pd: d,
                        Pm: m,
                        Py: y,
                        Ph: h,
                        Pi: i
                      });
                      Flow.run('C sub Procedurer', {
                        'ProcedureCode': audiologiass.Tilpasning[j],
                        'TillaegsCode1': '',
                        'TillaegsCode2': '',
                        'TillaegsCode3': '',
                        'TillaegsCode4': '',
                        Pd: d,
                        Pm: m,
                        Py: y,
                        Ph: h,
                        Pi: i
                      });
                      Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(audiologiass.Tilpasning[j], 1, 0);
                      Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
                      Fields['Notat - Find Koder - Text'].input("TUL2");
                      Fields['Notat - Find Koder - Søg'].click();
                      Fields['Notat - Find Koder - Resultat'].select("TUL2");
                      Fields['Notat - Find Koder - Tilføj'].click();
                      break;
                  }
                  break;
                default:
                  Flow.run('C sub Procedurer', {
                    'ProcedureCode': audiologiass.Tilpasning[j],
                    'TillaegsCode1': '',
                    'TillaegsCode2': '',
                    'TillaegsCode3': '',
                    'TillaegsCode4': '',
                    Pd: d,
                    Pm: m,
                    Py: y,
                    Ph: h,
                    Pi: i
                  });
              }
            }
          }
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for tilpasning kan ikke indsættes.", {});
      }

      /* Justering */
      try {
        if (audiologiass.Justering.length > 0) {
          if (audiologiass.Justering[audiologiass.Justering.length - 1] === "ZPP68") {
            /* Procedurer afbrudt - sæt koder som tillægskoder */
            if (audiologiass.Justering.length > 5) {
              Dialog.warn('Advarsel', 'For mange koder angivet.', {});
              throw 1;
            }
            /* Sæt Procedurer som tillægskoder*/
            if (audiologiass.Justering.length > 1) {
              var til1 = audiologiass.Justering[0];
            }
            if (audiologiass.Justering.length > 2) {
              var til2 = audiologiass.Justering[1];
            }
            if (audiologiass.Justering.length > 3) {
              var til3 = audiologiass.Justering[2];
            }
            if (audiologiass.Justering.length > 4) {
              var til4 = audiologiass.Justering[3];
            }
            Flow.run('C sub Procedurer', {
              'ProcedureCode': "ZPP68",
              'TillaegsCode1': til1,
              'TillaegsCode2': til2,
              'TillaegsCode3': til3,
              'TillaegsCode4': til4,
              Pd: d,
              Pm: m,
              Py: y,
              Ph: h,
              Pi: i
            });
          } else {
            for (j = 0; j < audiologiass.Justering.length; j++) {
              Flow.run('C sub Procedurer', {
                'ProcedureCode': audiologiass.Justering[j],
                'TillaegsCode1': '',
                'TillaegsCode2': '',
                'TillaegsCode3': '',
                'TillaegsCode4': '',
                Pd: d,
                Pm: m,
                Py: y,
                Ph: h,
                Pi: i
              });
            }
          }
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for justering kan ikke indsættes.", {});
      }


      /* Hjernestammeundersøgelse */
      try {
        if (audiologiass.Hjernestamme1.length > 0) {
          /* Hvis Procedurer afbrudt sæt Procedurer som tillægskode */
          if (audiologiass.Hjernestamme1[audiologiass.Hjernestamme1.length - 1] === H1[1].name) {
            Flow.run('C sub Procedurer', {
              'ProcedureCode': H1[1].name,
              'TillaegsCode1': H1[0].name,
              'TillaegsCode2': '',
              'TillaegsCode3': '',
              'TillaegsCode4': '',
              Pd: d,
              Pm: m,
              Py: y,
              Ph: h,
              Pi: i
            });
          } else {
            /* Indsæt Procedurer code og tillægskode */
            var splitstr = audiologiass.Hjernestamme2.split(" ");
            var tillaegskode = splitstr[0]; /* Cut tillægskode ud af streng */
            Flow.run('C sub Procedurer', {
              'ProcedureCode': audiologiass.Hjernestamme1[0],
              'TillaegsCode1': tillaegskode,
              'TillaegsCode2': '',
              'TillaegsCode3': '',
              'TillaegsCode4': '',
              Pd: d,
              Pm: m,
              Py: y,
              Ph: h,
              Pi: i
            });
          }
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for hjernestammeundersøgelse kan ikke indsættes.", {});
      }


      /* Emissionsus. TEOAE */
      try {
        if (audiologiass.TEOAE1.length > 0) {
          /* Hvis Procedurer afbrudt sæt Procedurer som tillægskode */
          if (audiologiass.TEOAE1[audiologiass.TEOAE1.length - 1] === ET[1].name) {
            Flow.run('C sub Procedurer', {
              'ProcedureCode': ET[1].name,
              'TillaegsCode1': ET[0].name,
              'TillaegsCode2': '',
              'TillaegsCode3': '',
              'TillaegsCode4': '',
              Pd: d,
              Pm: m,
              Py: y,
              Ph: h,
              Pi: i
            });
          } else {
            /* Indsæt Procedurer code og tillægskode */
            var splitstr = audiologiass.TEOAE2.split(" ");
            var tillaegskode = splitstr[0]; /* Cut tillægskode ud af streng */
            Flow.run('C sub Procedurer', {
              'ProcedureCode': audiologiass.TEOAE1[0],
              'TillaegsCode1': tillaegskode,
              'TillaegsCode2': '',
              'TillaegsCode3': '',
              'TillaegsCode4': '',
              Pd: d,
              Pm: m,
              Py: y,
              Ph: h,
              Pi: i
            });
          }
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for Emissionsus. TEOAE kan ikke indsættes.", {});
      }


      /* Emissionsus. DPOA */
      try {
        if (audiologiass.DPOAE1.length > 0) {
          /* Hvis Procedurer afbrudt sæt Procedurer som tillægskode */
          if (audiologiass.DPOAE1[audiologiass.DPOAE1.length - 1] === ED[1].name) {
            Flow.run('C sub Procedurer', {
              'ProcedureCode': ET[1].name,
              'TillaegsCode1': ED[0].name,
              'TillaegsCode2': '',
              'TillaegsCode3': '',
              'TillaegsCode4': '',
              Pd: d,
              Pm: m,
              Py: y,
              Ph: h,
              Pi: i
            });
          } else {
            /* Indsæt Procedurer code og tillægskode */
            var splitstr = audiologiass.DPOAE2.split(" ");
            var tillaegskode = splitstr[0]; /* Cut tillægskode ud af streng */
            Flow.run('C sub Procedurer', {
              'ProcedureCode': audiologiass.DPOAE1[0],
              'TillaegsCode1': tillaegskode,
              'TillaegsCode2': '',
              'TillaegsCode3': '',
              'TillaegsCode4': '',
              Pd: d,
              Pm: m,
              Py: y,
              Ph: h,
              Pi: i
            });
          }
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for Emissionsus. DPOA kan ikke indsættes.", {});
      }


      /* Elektrocochleografi */
      try {
        if (audiologiass.Elektro.length > 0) {
          /* Indsæt Procedurer code og tillægskode */
          Flow.run('C sub Procedurer', {
            'ProcedureCode': EC[0].name,
            'TillaegsCode1': "UFYA00",
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
            Pd: d,
            Pm: m,
            Py: y,
            Ph: h,
            Pi: i
          });
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for Elektrocochleografi kan ikke indsættes.", {});
      }


      /* V-Hit */
      try {
        if (audiologiass.VHit.length > 0) {
          /* Indsæt Procedurer code og tillægskode */
          Flow.run('C sub Procedurer', {
            'ProcedureCode': VH[0].name,
            'TillaegsCode1': "ZZ7301",
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
            Pd: d,
            Pm: m,
            Py: y,
            Ph: h,
            Pi: i
          });
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for Elektrocochleografi kan ikke indsættes.", {});
      }


      /* Klinisk undersøgelse  */
      try {
        if (audiologiass.Kliniskund.length > 0) {
          /* Indsæt Procedurer code og tillægskode */
          Flow.run('C sub Procedurer', {
            'ProcedureCode': KU[0].name,
            'TillaegsCode1': '',
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
            Pd: d,
            Pm: m,
            Py: y,
            Ph: h,
            Pi: i
          });
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for Elektrocochleografi kan ikke indsættes.", {});
      }


      /* Musikerhøreværn */
      try {
        if (audiologiass.Hoerevaerne.length > 0) {
          /* Indsæt Procedurer code og tillægskode */
          Flow.run('C sub Procedurer', {
            'ProcedureCode': M1[0].name,
            'TillaegsCode1': '',
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
            Pd: d,
            Pm: m,
            Py: y,
            Ph: h,
            Pi: i
          });
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for Elektrocochleografi kan ikke indsættes.", {});
      }


    } catch (e) {
      Dialog.warn('Advarsel', 'C Sub Hørenotat kan ikke kaldes. ', {
        'timeout': 5
      });
    }

    if (lastfield !== "N/A") {
      Fields['Notat - NavigatorTree'].select("" + lastfield + "");
    }

  } catch (e) {
    Dialog.warn('Advarsel', e.message, {});
    Log.warn('OUHafdFWarn', e.message);
  }
}
