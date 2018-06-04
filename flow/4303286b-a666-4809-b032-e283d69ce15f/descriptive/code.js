var clinictype = ["Audiologiassistent", 
                  "Læge", 
                  "Pædagogisk afdeling", 
                  "Ototeknisk service", 
                  "Teknisk afdeling"];

var buttontypes = ["Ok", 'Skift klinikertype', 'Cancel'];

/** Config for Audiologassistent **/
var AAP1 = [{name: "ZZ7091", pad: "             ", txt: "Audiometri"},
            {name: "ZZ7091A", pad: "          ", txt: "APD"},
            {name: "ZZ7096", pad: "             ", txt: "Tympanometri"},
            {name: "UCGL", pad: "                  ", txt: "ABR Hjernestammeaudiometri"},
            {name: "ZZ7100D", pad: "         ", txt: "ASSR"},
            {name: "ZZ1450D1", pad: "      ", txt: "Diagnostisk ABR(D-ABR(toneburst))"},
            {name: "ZZ7103", pad: "             ", txt: "Diskriminationsmåling i frit felt"},
            {name: "ZPP68", pad: "                ", txt: "Proc. afbrudt pga. andre årsager"}];

var Ear = ["Højre", "Venstre"];

var AAP2 = [{name: "BDDD6", pad: "              ", txt: "Høreapparattilpasning"},
            {name: "BDDA0", pad: "              ", txt: "Beh. m. KA."},
            {name: "BDDA2", pad: "              ", txt: "Beh. m. ØH."},
            {name: "BDDB", pad: "                 ", txt: "Spec. HA-beh. (MASKER)"},
            {name: "BDDB0", pad: "              ", txt: "Beh. med BC og BAHA"},
            {name: "BDDB1", pad: "              ", txt: "Beh. med CROS"},
            {name: "BDDB2", pad: "              ", txt: "Beh. med BICROS"},
            {name: "BDKA", pad: "                 ", txt: "Instruktion af HA-bruger"},
            {name: "    ZPP68", pad: "            ", txt: "Proc. afbrudt pga. andre årsager"}];

var J1 = [{name: "BDDD60", pad: "           ", txt: "Justering af HA"},
          {name: "BDDD62", pad: "           ", txt: "Justering af CI"},
          {name: "ZPP68", pad: "                 ", txt: "Proc. afbrudt pga. andre årsager"},
          {name: "BVDY00", pad: "             ", txt: "Vejledning af patient"},
          {name: "BVDT02", pad: "             ", txt: "Vejledning i brug af andet hjælpem.\n                                 (fjernbetj., øreprop etc.)"}];


/** Config for læge **/
var L1 = [{name: "ZZ0149", pad: "             ", txt: "Klinisk undersøgelse"},
          {name: "ZZ0150", pad: "             ", txt: "Journaloptagelse"},
          {name: "ZZ0151", pad: "             ", txt: "Klinisk kontrol"},
          {name: "BRS", pad: "                      ", txt: "Samtaleterapi (tinnituspt.)"},
          {name: "BVAA33A", pad: "        ", txt: "Telefonkonsultation med pt."},
          {name: "BVAA33B", pad: "         ", txt: "E-mail konsultation med pt."},
          {name: "KUDB22", pad: "           ", txt: "OTOMIKROSKOPI"},
          {name: "BDLF1", pad: "                ", txt: "Fjernelse af ørevoks"},
          {name: "ZZ7097", pad: "             ", txt: "Podning af øregang"},
          {name: "BWDA0", pad: "             ", txt: "Receptudstedelse"},
          {name: "ZZ0181", pad: "             ", txt: "Anmeld. til Arbejdsskadestyr."},
          {name: "ZZ0182", pad: "             ", txt: "Udfærdigelse af erklæring"},
          {name: "ZZV005", pad: "             ", txt: "Statusattest"},
          {name: "ZZ7105", pad: "             ", txt: "Udredning til CI"},
          {name: "BDXY6", pad: "               ", txt: "Behandling med Meniet-apparatur"},
          {name: "ZZ7303", pad: "             ", txt: "Dix-Hallpike test"},
          {name: "ZZ7304", pad: "             ", txt: "Epleys procedure"},
          {name: "KUDH02A", pad: "       ", txt: "Rhinoskopi"}];

var L2 = [{name: "AFX01A", pad: "             ", txt: "Endelig udredt (beh. i sygehusregi)"},
          {name: "AFX01C", pad: "             ", txt: "Endelig udredt (ingen beh.)"},
          {name: "AFX01D1", pad: "         ", txt: "Videre udredn. (faglige årsager)"},
          {name: "AFX01D4", pad: "         ", txt: "Videre udredn. (mangl. kapacitet)"},
          {name: "INGEN KODE", pad: "", txt: "(ventestatus 12 og assistancer)"}];
       

/** Config for Pædagogisk afdeling **/
var P1 = [{name: "BVDY0", pad: "               ", txt: "Pæd. instruktion af HA-bruger"},
          {name: "BDKA", pad: "                 ", txt: "Instruktion af HA-bruger"},
          {name: "BVDY05", pad: "            ", txt: "Rådgivning i Pæd. Afd."},
          {name: "BVAA33A", pad: "         ", txt: "Telefonkonsultation med pt."},
/*          {name: "", pad: "                                ", txt: "HA + ØP udleveres via CRS"},*/
          {name: "", pad: "", txt: "HA + ØP udleveres via CRS"},
          {name: "BDDD60", pad: "           ", txt: "Pæd. just af HA-bruger"},
          {name: "", pad: "   +   ", txt: "A+PGE1 (pædagog)"},
          {name: "BDXY1", pad: "               ", txt: "AVT"}];


/** Config for Ototeknisk service **/
var O1 = [{name: "BDDD81", pad: "             ", txt: "Reparation af ØP"},
          {name: "BDDD82", pad: "             ", txt: "Service i forbindelse med ØP"},
          {name: "BDDD50", pad: "             ", txt: "(bdda0) ØP-kanalapparat"},
          {name: "BDDD51", pad: "             ", txt: "(bdda2) ØP-ørehænger"},
          {name: "BDDD5", pad: "                 ", txt: "Aftryk til musikerhøreværn/Svømmeprop"}];

/** Config for Teknisk afdeling **/
var T1 = [{name: "BDDD", pad: "                 ", txt: "Teknisk ydelse til HA bruger"}];

/** General config **/
var F1 = [{name: "BVDY04", pad: "               ", txt: "Undervisning af pt. i nødvendig viden,\n                                   f.eks. støj, høreværn"}];

/* Musikerhøreværn: 
(Diagnose: DZ298)*/
var M1 = [{name: "ZZ7103", pad: "               ", txt: "Fritfeltsmåling af høreværn"}];

/* Hjernestammeundersøgelse */
var H1 = [{name: "ZZ1450D", pad: "            ", txt: "Automatisk ABR (A-ABR)"}];

/* Emissionsus. TEOAE */
var ET = [{name: "ZZ7306D", pad: "               ", txt: "Emissionsus. TEOAE"}];

/* Emissionsus. DPOAE */
var ED = [{name: "ZZ7307D", pad: "               ", txt: "Emissionsus. DPOAE"}];

var RE = ["Z+PR01A Bestået", "Z+PR00A Henvises", "Z+PR00B Ikke bestået", "ZPP68       Proc. afbrudt pga. andre årsager"];



/*** Detect clinician ***/
Flow.run('Detect clinician', {} );

/*Dialog.info('Name', clinician.name, { 'timeout': 10 });
Dialog.info('Title', clinician.title, { 'timeout': 10 });*/

//** If title = a l p o t **//

for (var KlinSet = 0; KlinSet === 0;)
{
try {
    var ctype = Dialog.input(
      "OUH Afdeling F", 
      "Til brug for ukompliceret undersøgelse.\n\nHvis der er tale om en undersøgelse med komplikationer eller ekstraordinære tiltag,laves i stedet et diktat.",
      {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1] }, { 'value': buttontypes[2], 'isCancel': true }],
       "Klinikertype": { "type": "RADIO", 
                        "prompt": "Klinikertype:", 
                        "orientation": 'vertical',
                        "selectBetween": clinictype
                       }
      });
} catch (e) 
{
  KlinSet = 2;
  ctype.Klinikertype = false;
}

  if (ctype.buttons === buttontypes[1]) 
  {
    ctype.Klinikertype = false;
  }
    
/************************/
/** Audiologiassistent **/
/************************/
	
if (ctype.Klinikertype === clinictype[0]) {
  try {
    var procedurer = Dialog.input(
      "OUH Afdeling F", 
      "Vælg procedurer",
      {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1] }, { 'value': buttontypes[2], 'isCancel': true }],
       "Procedurer1": { "type": "CHECKBOX", 
                        "prompt": "Simple høretab:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': AAP1[0].name + AAP1[0].pad + AAP1[0].txt, value: "0"},
                          {'name': AAP1[1].name + AAP1[1].pad + AAP1[1].txt, value: "1"},
                          {'name': AAP1[2].name + AAP1[2].pad + AAP1[2].txt, value: "2"},
                          {'name': AAP1[3].name + AAP1[3].pad + AAP1[3].txt, value: "3"},
                          {'name': AAP1[4].name + AAP1[4].pad + AAP1[4].txt, value: "4"},
                          {'name': AAP1[5].name + AAP1[5].pad + AAP1[5].txt, value: "5"},
                          {'name': AAP1[6].name + AAP1[6].pad + AAP1[6].txt, value: "6"},
                          {'name': AAP1[7].name + AAP1[7].pad + AAP1[7].txt, value: "7"}]
                      },
/*       'divider1': { 'type': 'DIVIDER'},*/
       "Ear": { "type": "CHECKBOX", 
                        "prompt": "Øre:",
                        "orientation": 'vertical',
                        'options': [
                          {'name': Ear[0]},
                          {'name': Ear[1]}]
              },
/*       'divider2': { 'type': 'DIVIDER'},*/
       "Procedurer2": { 'type': "CHECKBOX", 
                        'prompt': "Høreapparattilpasning", 
                        'orientation': 'vertical',
                        'options': [
                          {'name': AAP2[0].name + AAP2[0].pad + AAP2[0].txt, value: "0"},
                          {'name': AAP2[1].name + AAP2[1].pad + AAP2[1].txt, value: "1"},
                          {'name': AAP2[2].name + AAP2[2].pad + AAP2[2].txt, value: "2"},
                          {'name': AAP2[3].name + AAP2[3].pad + AAP2[3].txt, value: "3"},
                          {'name': AAP2[4].name + AAP2[4].pad + AAP2[4].txt, value: "4"},
                          {'name': AAP2[5].name + AAP2[5].pad + AAP2[5].txt, value: "5"},
                          {'name': AAP2[6].name + AAP2[6].pad + AAP2[6].txt, value: "6"},
                          {'name': AAP2[7].name + AAP2[7].pad + AAP2[7].txt, value: "7"},
                          {'name': AAP2[8].name + AAP2[8].pad + AAP2[8].txt, value: "8"}]
                      },
/*       'divider3': { 'type': 'DIVIDER'},*/
       "Justering1": { 'type': "CHECKBOX", 
                        'prompt': "Justering:", 
                        'orientation': 'vertical',
                        'options': [
                          {'name': J1[0].name + J1[0].pad + J1[0].txt, value: "0"},
                          {'name': J1[1].name + J1[1].pad + J1[1].txt, value: "1"},
                          {'name': J1[2].name + J1[2].pad + J1[2].txt, value: "2"},
                          {'name': J1[3].name + J1[3].pad + J1[3].txt, value: "3"},
                          {'name': J1[4].name + J1[4].pad + J1[4].txt, value: "4"}]
                      },
       "Hjernestamme1": {'type': "CHECKBOX", 
                         'prompt': "Hjernestamme-\nundersøgelse:", 
                         'orientation': 'vertical',
                         'options': [
                         {'name': H1[0].name + H1[0].pad + H1[0].txt, value: "0"}]},       
       'Hjernestamme2': {'type': 'SELECT',
                        'prompt': '',
                        'selectBetween': RE,
                        'value': RE[0]},
        "TEOAE1": {'type': "CHECKBOX", 
                         'prompt': "Emissionsus. TEOAE:", 
                         'orientation': 'vertical',
                         'options': [
                         {'name': ET[0].name + ET[0].pad + ET[0].txt, value: "0"}]},       
       'TEOAE2': {'type': 'SELECT',
                  'prompt': '',
                  'selectBetween': RE,
                  'value': RE[0]},
       "DPOAE1": {'type': "CHECKBOX", 
                  'prompt': "Emissionsus. DPOAE:", 
                  'orientation': 'vertical',
                  'options': [
                    {'name': ED[0].name + ED[0].pad + ED[0].txt, value: "0"}]},
       'DPOAE2': {'type': 'SELECT',
                  'prompt': '',
                  'selectBetween': RE,
                  'value': RE[0]},      
       
       "Hoerevaerne": { 'type': "CHECKBOX", 
                       'prompt': "Musikerhøreværn:", 
                       'orientation': 'vertical',
                       'options': [
                         {'name': M1[0].name + M1[0].pad + M1[0].txt, value: "0"}]
                      }
      }
    );
  } catch (e) {
    KlinSet = 2;
    ctype.Klinikertype = false;
  }
  if (ctype.buttons === buttontypes[1]) 
  {
    ctype.Klinikertype = false;
  } else {
    KlinSet = 1;
    /* runflow */
  }
}

/********************/
/**      Læge      **/
/********************/

if (ctype.Klinikertype === clinictype[1]) {
  try {
    var procedurer = Dialog.input(
      "OUH Afdeling F", 
      "Vælg procedurer",
      {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1] }, { 'value': buttontypes[2], 'isCancel': true }],
       "Procedurer1": { "type": "CHECKBOX", 
                        "prompt": "Procedurer:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': L1[0].name + L1[0].pad + L1[0].txt, value: "0"},
                          {'name': L1[1].name + L1[1].pad + L1[1].txt, value: "1"},
                          {'name': L1[2].name + L1[2].pad + L1[2].txt, value: "2"},
                          {'name': L1[3].name + L1[3].pad + L1[3].txt, value: "3"},
                          {'name': L1[4].name + L1[4].pad + L1[4].txt, value: "4"},
                          {'name': L1[5].name + L1[5].pad + L1[5].txt, value: "5"},
                          {'name': L1[6].name + L1[6].pad + L1[6].txt, value: "6"},
                          {'name': L1[7].name + L1[7].pad + L1[7].txt, value: "7"},
                          {'name': L1[8].name + L1[8].pad + L1[8].txt, value: "8"},
                          {'name': L1[9].name + L1[9].pad + L1[9].txt, value: "9"},
                          {'name': L1[10].name + L1[10].pad + L1[10].txt, value: "10"},
                          {'name': L1[11].name + L1[11].pad + L1[11].txt, value: "11"},
                          {'name': L1[12].name + L1[12].pad + L1[12].txt, value: "12"},
                          {'name': L1[13].name + L1[13].pad + L1[13].txt, value: "13"},
                          {'name': L1[14].name + L1[14].pad + L1[14].txt, value: "14"},
                          {'name': L1[15].name + L1[15].pad + L1[15].txt, value: "15"},
                          {'name': L1[16].name + L1[16].pad + L1[16].txt, value: "16"},
                          {'name': L1[17].name + L1[17].pad + L1[17].txt, value: "17"}]
                      },
       'divider1': { 'type': 'DIVIDER'},
       "Procedurer2": { "type": "CHECKBOX", 
                        "prompt": "Koder vedr. udrednings-\ngarantien:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': L2[0].name + L2[0].pad + L2[0].txt, value: "0"},
                          {'name': L2[1].name + L2[1].pad + L2[1].txt, value: "1"},
                          {'name': L2[2].name + L2[2].pad + L2[2].txt, value: "2"},
                          {'name': L2[3].name + L2[3].pad + L2[3].txt, value: "3"},
                          {'name': L2[4].name + L2[4].pad + L2[4].txt, value: "4"}]
                      }
      }
    );
  } catch (e) {
    KlinSet = 2;
    ctype.Klinikertype = false;
  }
  if (ctype.buttons === buttontypes[1]) 
  {
    ctype.Klinikertype = false;
  } else {
    KlinSet = 1;
    /* runflow */
  }
}


/*************************/
/** Pædagigisk afdeling **/
/*************************/

if (ctype.Klinikertype === clinictype[2]) {
  try {
    var procedurer = Dialog.input(
      "OUH Afdeling F", 
      "Vælg procedurer",
      {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1] }, { 'value': buttontypes[2], 'isCancel': true }],
       "Procedurer1": { "type": "CHECKBOX", 
                        "prompt": "Pædagogisk Afd.:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': P1[0].name + P1[0].pad + P1[0].txt, value: "0"},
                          {'name': P1[1].name + P1[1].pad + P1[1].txt, value: "1"},
                          {'name': P1[2].name + P1[2].pad + P1[2].txt, value: "2"},
                          {'name': P1[3].name + P1[3].pad + P1[3].txt, value: "3"},
                          {'name': P1[4].name + P1[4].pad + P1[4].txt, value: "4"},
                          {'name': P1[5].name + P1[5].pad + P1[5].txt, value: "5"},
                          {'name': P1[6].name + P1[6].pad + P1[6].txt, value: "6"},
                          {'name': P1[7].name + P1[7].pad + P1[7].txt, value: "7"}]
                      },
       'divider1': { 'type': 'DIVIDER'},
       "F1": { "type": "CHECKBOX", 
                        "prompt": "Forebyggelse:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': F1[0].name + F1[0].pad + F1[0].txt, value: "0"}]
                      }
      }
    );
  } catch (e) {
    KlinSet = 2;
    ctype.Klinikertype = false;
  }
  if (ctype.buttons === buttontypes[1]) 
  {
    ctype.Klinikertype = false;
  } else {
    KlinSet = 1;
    /* runflow */
  }
}

/*************************/
/** Ototeknisk service **/
/*************************/

if (ctype.Klinikertype === clinictype[3]) {
  try {
    var procedurer = Dialog.input(
      "OUH Afdeling F", 
      "Vælg procedurer",
      {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1] }, { 'value': buttontypes[2], 'isCancel': true }],
       "Procedurer1": { "type": "CHECKBOX", 
                        "prompt": "Ototeknisk service:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': O1[0].name + O1[0].pad + O1[0].txt, value: "0"},
                          {'name': O1[1].name + O1[1].pad + O1[1].txt, value: "1"},
                          {'name': O1[2].name + O1[2].pad + O1[2].txt, value: "2"},
                          {'name': O1[3].name + O1[3].pad + O1[3].txt, value: "3"},
                          {'name': O1[4].name + O1[4].pad + O1[4].txt, value: "4"}]
                      }
       /*,
     'divider1': { 'type': 'DIVIDER'},
       "F1": { "type": "CHECKBOX", 
                        "prompt": "Forebyggelse:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': F1[0].name + F1[0].pad + F1[0].txt, value: "0"}]
                      }*/
      }
    );
  } catch (e) {
    KlinSet = 2;
    ctype.Klinikertype = false;
  }
  if (ctype.buttons === buttontypes[1]) 
  {
    ctype.Klinikertype = false;
  } else {
    KlinSet = 1;
    /* runflow */
  }
}

/*************************/
/**  Teknisk afdeling   **/
/*************************/

if (ctype.Klinikertype === clinictype[4]) {
  try {
    var procedurer = Dialog.input(
      "OUH Afdeling F", 
      "Vælg procedurer",
      {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1] }, { 'value': buttontypes[2], 'isCancel': true }],
       "Teknisk": { "type": "CHECKBOX", 
                        "prompt": "Teknisk afdeling:", 
                        "orientation": 'vertical',
                        "options": [
                          {'name': T1[0].name + T1[0].pad + T1[0].txt, value: "0"}]
                      }
      }
    );
  } catch (e) {
    KlinSet = 2;
    ctype.Klinikertype = false;
  }
  if (ctype.buttons === buttontypes[1]) 
  {
    ctype.Klinikertype = false;
  } else {
    KlinSet = 1;
    /* runflow */
  }
}
}