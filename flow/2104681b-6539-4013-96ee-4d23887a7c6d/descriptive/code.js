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

    /*****************/
    /*** Diagnoser ***/
    /*****************/
    var Diagnose1 = "N/A";

    /*** Skabelon ends ****/
    /*** Final settings ***/

    /*** Run Flow motor ***/
    try {
      Flow.run('C Sub Diagnoser og procedurer', {Pdiagnose1: Diagnose1,
                                                  Plastfield: lastfield
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
      Dialog.warn('Advarsel', 'C Sub Diagnoser og procedurer kan ikke kaldes. ', {
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

