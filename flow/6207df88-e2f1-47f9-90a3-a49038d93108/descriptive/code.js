/* Called from OUH Afd F menu                                   */
/* Data setup for Teknisk afdeling til kald af C Sub hoerenotat */


var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var buttontypes = ["Ok", 'Cancel'];

/** Config for Teknisk afdeling **/
var T1 = [{name: "BDDD", pad: "                 ", txt: "Teknisk ydelse til HA bruger"}];

var enhed = "OUH Øre-, Næse- og Hals Afsnit F2 ";

/*************************/
/**  Teknisk afdeling   **/
/*************************/

try 
{
/*  var checkbox1 = Dialog.input(
    "OUH Afdeling F", 
    "Vælg procedurer",
    {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1], 'isCancel': true }],
     "teknisk": { "type": "CHECKBOX", 
                 "prompt": "Teknisk afdeling:", 
                 "orientation": 'vertical',
                 "options": [
                   {'name': T1[0].name + T1[0].pad + T1[0].txt, value: T1[0].name}]
                }
    });
  
  
  if (checkbox1.teknisk.length === 0) throw 1;*/
  
  /* Dialog.info('Antal entries i checkbox', checkbox1.teknisk.length + " Entry: " + checkbox1.teknisk[0], { }); */

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
  Flow.run('Check kliniker', {} );
  // Debug.showDialog("Personnel details; name = "+clinician.name+", title = "+clinician.title+", username = "+clinician.username+", initials = "+clinician.initials);

  /*** Skabelon starter ***/
  
  
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

  /*** Tilpasning ***/
  var tilpasning = "N/A";
  var tilpasningtekst = "N/A";

  /*** Fabrikat / Type / Farve ***/
  var tilpfabrikat = "N/A";

  /*** Programvalg ***/
  var tilpprogramvalg = "P1: <newline>P2: <newline>P3: <newline>P4: <newline><newline>Volumenkontrol: <newline>Programomskifter: ";

  /*** Slangestørrelse / Øretip ***/
  var tilpslange = "Receiver/Slange: <newline>Domes: ";

  /*** Øreprop/ventilation ***/
  var tilpoereprop = "ØP-type: <newline>Ventilation: "; 

  /*** Justering ***/
  var justering = "N/A";
  var justeringtekst = "N/A";

  /*** Fabrikat / Type / Farve ***/
  var justfabrikat = "N/A";

  /*** Programvalg ***/
  var justprogramvalg = "N/A";
  
  /*** Slangestørrelse / Øretip ***/
  var justslange = "N/A";

  /*** Øreprop/ventilation ***/
  var justoereprop = "N/A"; 

  /*** Diagnoser ***/
  var Diagnose1 = "N/A";
  var Diagnose1add1 = "N/A";

  /*** Procedurer ***/
  var ProcedureCode1 = "BDDD";
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
  var skalsendes = "Ja";
  
  /*** Skabelon ends ****/
  /*** Final settings ***/
  
  /*** End with setting focus at predefined field ***/
  var lastfield = "Procedurer";
  
  /*** Run Flow motor ***/
  try {
    Flow.run('C Sub hoerenotat', {AOd: d, 
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
                                 AOlastfield: lastfield});
    
  } catch (e) {
    Dialog.warn('Advarsel', 'C Sub Hørenotat kan ikke kaldes. ' , { 'timeout': 5 });
  }
} catch (e) {
}
