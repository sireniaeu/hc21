var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

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

/*** Skabelon starter ***/

/*** Anamnese ***/
var anamnese = "N/A";
var anamnesetekst = "N/A";

/*** Alkohol  ***/
var alkohol = "N/A";
var alkoholtekst = "N/A";

/*** Tobak  ***/
var tobak = "N/A";
var tobaktekst = "N/A";

/*** Objektiv undersøgelse ***/
/*** Øjen objektiv undersøgelse ***/
var pupiller = "N/A";
var spaltelampe = "N/A";
var oftalmoskopi = "N/A";

/*** Undersøgelser/procedurer ***/
var undersoegproc = "N/A";

/*** Skopier ***/
var skopier = "N/A";
      
/*** Ultralydskanning ***/
var ultralyd = "N/A";

/*** Undersøgelse ***/
var undersoegelse = "N/A";

/*** Konklusion og plan ***/
var konklusionogplan = "N/A";

/*** Procedurer ***/
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

/*** Procedurer - set Ressource ***/
var Ressource = "N/A";  
  
/*** Ordination af medicin ***/
var ordinationafmedicin = "N/A";

/*** Ordinationer, øvrige ***/
var ordinationer2 = "N/A";

/*** Information/accept ***/
var information = "N/A";

/*** Trin 2 ***/
var trin2 = "N/A";
var trin2tekst = "N/A";

/*** Skabelon ends ****/
/*** Final settings ***/
  
/*** Create entry on dictation list ***/
var dictate = "N/A";  
var message = "N/A";  
  
/*** End with setting focus at predefined field ***/
var lastfield = "N/A";

/*** Save draft ***/
var gemkladde = "N/A";

/*** Run Flow motor ***/
 try {
    Flow.run('C Sub Assistance E', {ASSd: d, ASSm: m, ASSy: y, ASSh: h, ASSi: i, ASSanamnese: anamnese, ASSanamnesetekst: anamnesetekst, ASSalkohol: alkohol, ASSalkoholtekst: alkoholtekst, ASStobak: tobak, ASStobaktekst: tobaktekst, ASSpupiller: pupiller, ASSspaltelampe: spaltelampe, ASSoftalmoskopi: oftalmoskopi, ASSundersoegproc: undersoegproc, ASSskopier: skopier, ASSultralyd: ultralyd, ASSundersoegelse: undersoegelse, ASSkonklusionogplan: konklusionogplan, ASSProcedureCode1: ProcedureCode1, ASSProcedureCode1add1: ProcedureCode1add1, ASSProcedureCode1add2: ProcedureCode1add2, ASSProcedureCode1add3: ProcedureCode1add3, ASSProcedureCode2: ProcedureCode2, ASSProcedureCode2add1: ProcedureCode2add1, ASSProcedureCode3: ProcedureCode3, ASSProcedureCode4: ProcedureCode4, ASSProcedureCode5: ProcedureCode5, ASSProcedureCode6: ProcedureCode6, ASSRessource: Ressource, ASSordinationafmedicin: ordinationafmedicin, ASSordinationer2: ordinationer2, ASSinformation: information, ASStrin2: trin2, ASStrin2tekst: trin2tekst, ASSdictate: dictate, ASSmessage: message, ASSlastfield: lastfield, ASSgemkladde: gemkladde} );
  } 
  catch (e) {
    Dialog.warn('Advarsel', 'Subflow kan ikke kaldes.', { 'timeout': 5 });
  }
