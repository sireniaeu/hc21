/* Data setup for Audiologiassistent til kald af C Sub hoerenotat  */

var StdRetry = 10;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

//var enhed = "OUH Øre-, Næse- og Hals Afsnit F2 ";
var enhed = "OUH Høreklinik Amb. ";

var buttontypes = ["Ok", 'Cancel'];
var barn = ["Nej", "Ja"];

/** Config for Audiologassistent **/
var AAP1 = [{name: "ZZ7091", pad: "             ", txt: "Audiometri med læge"},
            {name: "ZZ7091", pad: "             ", txt: "Audiometri uden læge"},
            {name: "ZZ7091A", pad: "          ", txt: "APD"},
            {name: "ZZ7096", pad: "             ", txt: "Tympanometri"},
            {name: "UCGL", pad: "                  ", txt: "ABR Hjernestammeaudiometri"},
            {name: "ZZ7100D", pad: "         ", txt: "ASSR"},
            {name: "ZZ1450D1", pad: "      ", txt: "Diagnostisk ABR(D-ABR(toneburst))"},
            {name: "ZZ7103", pad: "             ", txt: "Diskriminationsmåling i frit felt"},
            {name: "KUDB22", pad: "            ", txt: "OTOMIKROSKOPI"},
            {name: "ZPP68", pad: "            ", txt: "Proc. afbrudt pga. andre årsager"}];

var Ear = ["Vælg øre(r)", "Højre øre", "Venstre øre", "Bilateralt", "Cros", "Bicros"];

/** Config for Teknisk afdeling **/
var TEK = [{name: "BDDD", pad: "                 ", txt: "Teknisk ydelse til HA bruger"}];

/** General config **/
var F1 = [{name: "BVDY04", pad: "               ", txt: "Undervisning af pt. i nødvendig viden,\n                                   f.eks. støj, høreværn"}];

/* Hjernestammeundersøgelse */
var H1 = [{name: "ZZ1450D", pad: "           ", txt: "Automatisk ABR (A-ABR)" },
          {name: "ZPP68", pad: "            ", txt: "Proc. afbrudt pga. andre årsager" }];

/* Emissionsus. TEOAE */
var ET = [{name: "ZZ7306D", pad: "           ", txt: "Emissionsus. TEOAE"},
          {name: "ZPP68", pad: "            ", txt: "Proc. afbrudt pga. andre årsager"}];

/* Emissionsus. DPOAE */
var ED = [{name: "ZZ7307D", pad: "           ", txt: "Emissionsus. DPOAE" },
          { name: "ZPP68", pad: "            ", txt: "Proc. afbrudt pga. andre årsager" }];

/* Elektrocochleografi */
var EC = [{name: "ZZ1460", pad: "               ", txt: "Elektrocochleografi\n+ UFYA00           Elektrofysiologisk us."
}];

/* V-Hit */
var VH = [{name: "ZZ7094", pad: "               ", txt: "Vestibulærundersøgelse\n+ ZZ7301           Smooth persuit"}];

/* Klinisk undersøgelse  */
var KU = [{name: "ZZ0149", pad: "               ", txt: "Klinisk undersøgelse (1. besøg efter henv.)"}];

/* Musikerhøreværn: 
(Diagnose: DZ298)*/
var M1 = [{name: "ZZ7103", pad: "               ", txt: "Fritfeltsmåling af høreværn"}];

var RE = ["ZPR01A Bestået", "ZPR00A Henvises", "ZPR00B Ikke bestået"];

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


/************************/
/** Audiologiassistent **/
/************************/
var validated = false;

try {
  Wait.forField(Fields["Notat - Skabelon for Read"], 3);
} catch (e) {
  Dialog.warn('Advarsel', 'Skift til Nyt notat i Cosmic', {  });
  FlagSlut = true;
  validated = true;
}

while (!validated) {
  try {
    var audiologiass = Dialog.input(
      "Audiometri",
      "Vælg procedurer", {
        buttons: [{'value': buttontypes[0]},
                  {'value': buttontypes[1], 'isCancel': true}],
        'maxDialogWidth': 510,        
       
        'Ear': {
          'type': 'SELECT',
          'prompt': 'Øre',
          'selectBetween': Ear,
          'value': Ear[0]
        },
        
        "Procedurer1": {
          "type": "CHECKBOX",
          "prompt": "Høreprøve:",
          "orientation": 'vertical',
          "options": [{'name': AAP1[0].name + AAP1[0].pad + AAP1[0].txt, value: "AUDIOM"},
                      {'name': AAP1[1].name + AAP1[1].pad + AAP1[1].txt, value: "AUDIOU"},
                      {'name': AAP1[2].name + AAP1[2].pad + AAP1[2].txt, value: AAP1[2].name},
                      {'name': AAP1[3].name + AAP1[3].pad + AAP1[3].txt, value: AAP1[3].name},
                      {'name': AAP1[4].name + AAP1[4].pad + AAP1[4].txt, value: AAP1[4].name},
                      {'name': AAP1[5].name + AAP1[5].pad + AAP1[5].txt, value: AAP1[5].name},
                      {'name': AAP1[6].name + AAP1[6].pad + AAP1[6].txt, value: AAP1[6].name},
                      {'name': AAP1[7].name + AAP1[7].pad + AAP1[7].txt, value: AAP1[7].name},
                      {'name': AAP1[8].name + AAP1[8].pad + AAP1[8].txt, value: AAP1[8].name},
                      {'name': AAP1[9].name + AAP1[9].pad + AAP1[9].txt, value: AAP1[9].name} ]},
        
        'Barn': {
          'prompt': 'Barn',
          'type': 'RADIO',
          "orientation": 'horisontal',
          'selectBetween': barn,
          'value': barn[0]
        },

        'Samtykkesendt': {
          'type': 'SELECT',
          'prompt': 'Samtykke til at sende',
          'selectBetween': samtykkesendt,
          'value': samtykkesendt[0]
        },
        
        "Hjernestamme1": {
          'type': "CHECKBOX",
          'prompt': "Hjernestammeunders.:",
          'orientation': 'vertical',
          'options': [{'name': H1[0].name + H1[0].pad + H1[0].txt, value: H1[0].name},
                      {'name': H1[1].name + H1[1].pad + H1[1].txt, value: H1[1].name}]},

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
          'options': [{'name': ET[0].name + ET[0].pad + ET[0].txt, value: ET[0].name},
                      {'name': ET[1].name + ET[1].pad + ET[1].txt, value: ET[1].name}]},

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
          'options': [{'name': ED[0].name + ED[0].pad + ED[0].txt, value: ED[0].name},
                      {'name': ED[1].name + ED[1].pad + ED[1].txt, value: ED[1].name}]},

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
          'options': [{'name': EC[0].name + EC[0].pad + EC[0].txt, value: EC[0].name}]},

        "VHit": {
          'type': "CHECKBOX",
          'prompt': "Vestibulærundersøgelse:",
          'orientation': 'vertical',
          'options': [{'name': VH[0].name + VH[0].pad + VH[0].txt, value: VH[0].name}]},

        "Kliniskund": {
          'type': "CHECKBOX",
          'prompt': "Klinisk undersøgelse :",
          'orientation': 'vertical',
          'options': [{'name': KU[0].name + KU[0].pad + KU[0].txt, value: KU[0].name}]},

        "Hoerevaerne": {
          'type': "CHECKBOX",
          'prompt': "",
          'orientation': 'vertical',
          'options': [{'name': M1[0].name + M1[0].pad + M1[0].txt, value: "0"}]},
        
        "Teknisk": { 
          "type": "CHECKBOX", 
          "prompt": "Teknisk afdeling:", 
          "orientation": 'vertical',
          'options': [{'name': TEK[0].name + TEK[0].pad + TEK[0].txt, value: TEK[0].name}]}
      }
    );
  } catch (e) {
    FlagSlut = true;
    validated = true;
  }
  
  if (!FlagSlut) { /* Check if something was checked */
    if (audiologiass.Hjernestamme1.length > 0 || 
        audiologiass.Hjernestamme2.length > 0 || 
        audiologiass.TEOAE1.length > 0 || 
        audiologiass.TEOAE2.length > 0 || 
        audiologiass.DPOAE1.length > 0 || 
        audiologiass.DPOAE2.length > 0 || 
        audiologiass.Elektro.length > 0 ||
        audiologiass.VHit.length > 0 || 
        audiologiass.Kliniskund.length > 0 || 
        audiologiass.Hoerevaerne.length > 0 || 
        audiologiass.Teknisk.length > 0 ) {
      validated = true;
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
    if (d < 10) {d = ("0" + d);} else {d = d + "";}
    var m = da.getMonth() + 1;
    if (m < 10) {m = ("0" + m);} else {m = m + "";}
    var y = da.getFullYear() + "";
    var h = da.getHours();
    if (h < 10) {h = ("0" + h);} else {h = h + "";}
    var i = da.getMinutes();
    if (i < 10) {i = ("0" + i);} else {i = i + "";}

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
        behandlingsforslag = "Patienten anbefales høreapparatbehandling som anført.<newline><newline>Årsagskode: <newline>HA type: <newline><newline>Fjernbetjening: ";
      } 
      if (audiologiass.Procedurer1[0] === "AUDIOM" && audiologiass.Barn === barn[0])  {
        behandlingsforslag = "Der foreslås høreapparatbehandling som anført.<newline><newline>Årsagskode: <newline>HA type: <newline><newline>Fjernbetjening: <newline><newline>Patienten går videre til læge.";
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
    
    /*****************/
    /*** Justering ***/
    /*****************/
    var justering = "N/A";
    var justeringtekst = "N/A";
    var justfabrikat = "N/A"; /*** Fabrikat / Type / Farve ***/
    var justprogramvalg = "N/A"; /*** Programvalg ***/
    var justslange = "N/A"; /*** Slangestørrelse / Øretip ***/
    var justoereprop = "N/A"; /*** Øreprop/ventilation ***/

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
    if (audiologiass.Procedurer1.length > 0) {
      for (j = 0; j < audiologiass.Procedurer1.length; j++) {
        if (audiologiass.Procedurer1[j] === "AUDIOU") { /* Hvis Audiometri uden læge sættes Skal sendes til Ja */
                skalsendes = "Ja"; 
        }
      } 
    }

    /*** Skabelon ends ****/
    /*** Final settings ***/
    
    /*** Run Flow motor ***/
    try {
      Flow.run('C Sub Hoereproeve', {
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
        AORessource: Ressource,
        AOskalsendes: skalsendes,
        AOenhed: enhed,
        AOlastfield: lastfield,
        AOfu: false });      
    } catch (e) {
      var err = e.message;
      if (err === '')
        err = 'C Sub Hørenotat kan ikke kaldes. ';
      throw err;
    }

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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
            }
          }
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for høretab kan ikke indsættes.", {});
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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
            'TillaegsCode1': '',
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
          Flow.run('C sub Procedurer', {
            'ProcedureCode': "UFYA00",
            'TillaegsCode1': '',
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
            'TillaegsCode1': '',
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
          Flow.run('C sub Procedurer', {
            'ProcedureCode': "ZZ7301",
            'TillaegsCode1': "",
            'TillaegsCode2': '',
            'TillaegsCode3': '',
            'TillaegsCode4': '',
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
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
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for Elektrocochleografi kan ikke indsættes.", {});
      }

      /* Teknisk service */
      try {
        if (audiologiass.Teknisk.length >0) {
          /* Indsæt Procedurer code og tillægskode */
          Flow.run('C sub Procedurer', {
            'ProcedureCode': TEK[0].name,
            'TillaegsCode1': '', 'TillaegsCode2': '', 'TillaegsCode3': '', 'TillaegsCode4': '',
              Pd: d, Pm: m, Py: y, Ph: h, Pi: i });
        }
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for Teknisk service kan ikke indsættes.", {});
      }
    
    if (lastfield !== "N/A") {
      Fields['Notat - NavigatorTree'].select("" + lastfield + "");
    }

  } catch (e) {
    Dialog.warn('Advarsel', e.message || e, {});
    Log.warn('OUHafdFWarn', e.message || e);
  }
}
