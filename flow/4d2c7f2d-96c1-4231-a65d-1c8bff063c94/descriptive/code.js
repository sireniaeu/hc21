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

try {
  var procedurer = Dialog.input(
    "OUH Afdeling F", 
    "Vælg procedurer",
    {buttons: [{ 'value': buttontypes[0] }, { 'value': buttontypes[1], 'isCancel': true }],
     "Teknisk": { "type": "CHECKBOX", 
                 "prompt": "Teknisk afdeling:", 
                 "orientation": 'vertical',
                 "options": [
                   {'name': T1[0].name + T1[0].pad + T1[0].txt, value: "0"}]
                }
    });

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
  Flow.run('Detect clinician', {} );
  // Debug.showDialog("Personnel details; name = "+clinician.name+", title = "+clinician.title+", username = "+clinician.username+", initials = "+clinician.initials);

  /*** Skabelon starter ***/
  
  
  /*** Kontaktperson   ***/
  var kontaktperson = "Ja";
  var kontaktpersontekst = "Kontaktperson tekst indsat";
  
  /*** Visitkort   ***/
  var visitkort = "Ja";
  var visitkorttekst = "Visitkort tekst indsat";
  
  var samtykke = "Samtykke tekst indsat";

  /*** Objektivundersoegelse   ***/
  var objektivundersoegelse = "N/A";

  /*** Audiometri   ***/
  var audiometri = "Audi tekst indsat";

  /*** Angivelsesnøjagtighed   ***/
  var angivelsesnoejagtighed = "God";
  var angivelsesnoejagtighedtekst = "Angivelsesnøj tekst indsat";

  /*** Frifeltsaudiometri   ***/
  var frifeltsaudiometri = "Tekst i frifeltsaudio"; 
  
   /*** Behandlingsforslag ***/
  var behandlingsforslag = "Tekst i behandlingsforslag";

  /*** Farve ***/
  var farve = "Tekst i farve under behandlingsforslag"; 

  /*** Øreprop/ventilation ***/
  var behoereprop = "Tekst i øreprop under behandlingsforslag"; 

  /*** Tilpasning ***/
  var tilpasning = "Co.*";
  var tilpasningtekst = "Tekst i tilpasning";

  /*** Fabrikat / Type / Farve ***/
  var tilpfabrikat = "Teksti tilpasning fabrikat";

  /*** Programvalg ***/
  var tilpprogramvalg = "P1: <newline>P2: <newline>P3: <newline>P4: <newline><newline>Volumenkontrol: <newline>Programomskifter: ";

  /*** Slangestørrelse / Øretip ***/
  var tilpslange = "Receiver/Slange: <newline>Domes: ";

  /*** Øreprop/ventilation ***/
  var tilpoereprop = "ØP-type: <newline>Ventilation: "; 

  /*** Justering ***/
  var justering = "BAHA.*";
  var justeringtekst = "Tekst i justering";

  /*** Fabrikat / Type / Farve ***/
  var justfabrikat = "Tekst i justering fabrikat";

  /*** Programvalg ***/
  var justprogramvalg = "Tekst i programvalg justering";
  
  /*** Slangestørrelse / Øretip ***/
  var justslange = "Tekst i slangestørrelse justering";

  /*** Øreprop/ventilation ***/
  var justoereprop = "Tekst i Øreprop justering"; 

  /*** Diagnoser ***/
  var Diagnose1 = "DH90";
  var Diagnose1add1 = "TUL1";

  /*** Procedurer ***/
  var ProcedureCode1 = "BDDD";
  var ProcedureCode1add1 = "TUL1";
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
