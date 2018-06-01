/* Called from OUH Afd F menu                                       */
/* Data setup for Audiologiassistent til kald af C Sub hoerenotat */

var enhed = "OUH Øre-, Næse- og Hals Afsnit F2 ";

var buttontypes = ["Ok", 'Cancel'];

/** Config for Audiologassistent **/
var AAP1 = [{
    name: "ZZ7091",
    pad: "             ",
    txt: "Audiometri"
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

var Ear = ["Vælg øre(r)", "Højre øre", "Venstre øre", "Begge ører"];

/* Tilpasning */
var T1 = [{
    name: "BDDD6",
    pad: "             ",
    txt: "Høreapparattilpasning"
  },
  /*            {name: "BDDA0", pad: "              ", txt: "Beh. m. KA. (højre)"},
              {name: "BDDA0", pad: "              ", txt: "Beh. m. KA. (venstre)"},
              {name: "BDDA2", pad: "              ", txt: "Beh. m. ØH. (højre)"},
              {name: "BDDA2", pad: "              ", txt: "Beh. m. ØH. (venstre)"},*/
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

var vejl = ["Der gives instruktion og udleveres relevante vejledninger.\n", "Patienten medgives relevante vejledninger og går videre til begynderundervisning ved lokalt kommunikationscenter her.\n", "Patienten gives kort instruktion og der udleveres relevante vejledninger. Anbefales kontakt til lokalt kommunikationscenter m.h.p. begynderundervisning.\n"];

var til1 = '';
var til2 = '';
var til3 = '';
var til4 = '';

var FlagBDDA2 = false;
var FlagBDDA0 = false;

var FlagSlut = false;

var samtykketxt = "Patienten giver samtykke til udlevering af relevante journaloplysninger til lokalt kommunikationscenter: ";

function fnsamtykke() {
  var janej = ["Ja", "Nej"];
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
}

function fnvejl() {
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
}


/************************/
/** Audiologiassistent **/
/************************/
var validated = false;

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
      'maxDialogWidth': 500,
      'promptWidth': 300,
      "Procedurer1": {
        "type": "CHECKBOX",
        "prompt": "Høretab:",
        "orientation": 'vertical',
        "options": [{
            'name': AAP1[0].name + AAP1[0].pad + AAP1[0].txt,
            value: AAP1[0].name
          },
          {
            'name': AAP1[1].name + AAP1[1].pad + AAP1[1].txt,
            value: AAP1[1].name
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
          }
        ]
      },

      'Ear': {
        'type': 'SELECT',
        'prompt': 'Øre',
        'selectBetween': Ear,
        'value': Ear[0]
      },

      "Tilpasning": {
        'promptWidth': 100,
        'type': "CHECKBOX",
        'prompt': "Tilpasning",
        'promptAlignment': 'right',
        'options': [{
            'name': T1[0].name + T1[0].pad + T1[0].txt,
            value: T1[0].name
          },
          {
            'name': T1[1].name + T1[1].pad + T1[1].txt,
            value: T1[1].name
          },
          {
            'name': T1[2].name + T1[2].pad + T1[2].txt,
            value: T1[2].name
          },
          {
            'name': T1[3].name + T1[3].pad + T1[3].txt,
            value: T1[3].name
          },
          {
            'name': T1[4].name + T1[4].pad + T1[4].txt,
            value: T1[4].name
          },
          {
            'name': T1[5].name + T1[5].pad + T1[5].txt,
            value: T1[5].name
          },
          {
            'name': T1[6].name + T1[6].pad + T1[6].txt,
            value: T1[6].name
          },
          {
            'name': T1[7].name + T1[7].pad + T1[7].txt,
            value: T1[7].name
          },
          {
            'name': T1[8].name + T1[8].pad + T1[8].txt,
            value: T1[8].name
          },
          {
            'name': T1[9].name + T1[9].pad + T1[9].txt,
            value: T1[9].name
          }
        ]
      },

      "Justering": {
        'type': "CHECKBOX",
        'prompt': "Justering:",
        'orientation': 'vertical',
        'options': [{
            'name': J1[0].name + J1[0].pad + J1[0].txt,
            value: J1[0].name,
            selected: true
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
