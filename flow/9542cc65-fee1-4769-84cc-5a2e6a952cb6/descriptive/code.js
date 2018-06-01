var StdRetry = 10;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var enhed = "OUH Øre-, Næse- og Hals Afsnit F2 ";
var buttontypes = ["Ok", 'Cancel'];
var til1 = '';
var til2 = '';
var til3 = '';
var til4 = '';
var validated = false;

var FlagSlut = false;

var O1 = [{name: "BDDD81", pad: "           ", txt: "Reparation af ØP"},
          {name: "BDDD82", pad: "           ", txt: "Service i forbindelse med ØP"},
          {name: "BDDD50", pad: "           ", txt: "ØP-kanalapparat"},
          {name: "BDDD51", pad: "           ", txt: "ØP-ørehænger"},
          {name: "BDDD5", pad: "              ", txt: "Aftryk til musikerhøreværn / Svømmeprop"}];


while (!validated) {
  try {
    var ototeknik = Dialog.input(
      "Ototeknisk service",
      "", 
      {
        buttons: [{'value': buttontypes[0]}, 
                  {'value': buttontypes[1],
                   'isCancel': true}],
        'maxDialogWidth': 500,
        "OTO": {'type': "CHECKBOX",
                'prompt': "Procedurer",
                'orientation': 'vertical',
                'options': [{'name': O1[0].name + O1[0].pad + O1[0].txt, value: O1[0].name},
                            {'name': O1[1].name + O1[1].pad + O1[1].txt, value: O1[1].name},
                            {'name': O1[2].name + O1[2].pad + O1[2].txt, value: O1[2].name},
                            {'name': O1[3].name + O1[3].pad + O1[3].txt, value: O1[3].name},
                            {'name': O1[4].name + O1[4].pad + O1[4].txt, value: O1[4].name}]
               },
                
        "divider1": { 'type': 'DIVIDER'}
      });
    } catch (e) {
      FlagSlut = true;
    }
  validated = true;
}
      


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

    /*** Objektivundersoegelse   ***/
    var objektivundersoegelse = "N/A";

    /*** Audiometri   ***/
    var audiometri = "N/A";
    
    /*** Angivelsesnøjagtighed   ***/
    var angivelsesnoejagtighed = "N/A";
    var angivelsesnoejagtighedtekst = "N/A";

    /*** Frifeltsaudiometri   ***/
    var frifeltsaudiometri = "N/A";

    /*** Behandlingsforslag ***/
    var behandlingsforslag = "N/A";

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
            /* Sæt Procedurer som tillægskoder*/
            for (j = 0; j < ototeknik.OTO.length; j++) {
            switch (ototeknik.OTO[j]) {
              case O1[2].name:
                til1 = "BDDA0";
                break;
                case O1[3].name:
                   til1 = "BDDA2";
                break;
            }
              Flow.run('C sub Procedurer', {
                'ProcedureCode': ototeknik.OTO[j],
                'TillaegsCode1': til1,
                'TillaegsCode2': '',
                'TillaegsCode3': '',
                'TillaegsCode4': '',
                Pd: d,
                Pm: m,
                Py: y,
                Ph: h,
                Pi: i
              });
              til1 = '';
            } 
      } catch (e) {
        Dialog.warn('Advarsel', "Procedurer for høretab kan ikke indsættes.", {});
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

