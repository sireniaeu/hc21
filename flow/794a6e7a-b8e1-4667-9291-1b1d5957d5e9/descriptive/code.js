//*** Cosmic sub-flow to capture OR Procedure information and creation of outpatient OR note ***///

//*** Function for Eylea, Lucentis and Ozurdex ***//

(function DxtSin (x) {
  
  Procedure = Procedure.trim(); //** Remove spaces after procedure name **//
  
//  if (Peye !== undefined) {
//      var eye.e = Peye; }
//  else {
    /**************************************/
    /*** Prompt user for OR information ***/
    /**************************************/
    var oculus = ["O.dx","O.sin"];
    var w = 0;
    while (w === 0) {
      var eye = Dialog.input(Procedure, " ", {"e": { 
        "type": "RADIO", 
        "prompt": "Øje",
        "selectBetween": oculus }});
      if (eye.e === undefined) {
        Dialog.warn("Advarsel", "Øje skal angives.");
      } else { w = 1; }
    }
  //}
  
  try {
    /**************************/
    /*** Set type of note   ***/
    /**************************/
    Fields['Notat - Skabelon'].select("Ambulant operationsnotat");
  } catch (e) {
    return "Det er ikke muligt at vælge notatskabelonen."; }
  
  /******************/
  /*** Anaestesia ***/
  /******************/
  try {
    Fields['Notat - NavigatorTree'].select("Anæstesitype");
    Fields['Notat - Anæstesitype - Text'].input("Dråbeanæstesi");
  } catch (e) {
    return "'Anæstesitype' kan ikke opdateres."; }

  /******************/
  /*** Procedurer ***/
  /******************/
  try {
    Fields['Notat - NavigatorTree'].select("rocedurer");
    var ProcedureCode = "KCKD05C";
    if (Procedure === "Ozurdex") {
      Fields['Notat - Find Koder - Text'].input(ProcedureCode);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(ProcedureCode);
    } else {
      
      //*** Set procedure code for Eylea and Lucentis
      ProcedureCode = "KCKD05B";
      Fields['Notat - Find Koder - Text'].input(ProcedureCode);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(ProcedureCode);
    }
    /*** Set Date and Time ***/
    Flow.run('Eye subfunction - set data and time',{});
    Fields['Notat - Find Koder - Tilføj'].click();
  } catch (e) {
    return "'Procedurer' kan ikke opdateres.";
  }
  
  // Now, select the added code and start adding additional codes
  // ||select:**/Registrerede koder/**/*ClinicalCodeTree*;KCK
  
  /***************/
  /*** Set TUL and other 'Tillægskoder' ***/
  /***************/
  try {
    Flow.run('Eye subfunction - TUL12', {pcode: ProcedureCode, Ods: eye.e, offset: '0', skip: '0'});
    //*** and MS01LA05 ***//
    Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
    if (Procedure === "Eylea") {
      Fields['Notat - Find Koder - Text'].input("MS01LA05");
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select("MS01LA05");
    } else {
      if (Procedure === "Lucentis") {
        Fields['Notat - Find Koder - Text'].input("MS01LA04");
        Fields['Notat - Find Koder - Søg'].click();
        Fields['Notat - Find Koder - Resultat'].select("MS01LA04");
      }
    }  //*** or it was Ozurdex and no further codes ***///
    Fields['Notat - Find Koder - Tilføj'].click();
  } catch (e) {
    return "'Tillægskode' kan ikke opdateres.";
  }
  
  /*****************************/
  /*** Operationsbeskrivelse ***/
  /*****************************/
  var ee;
  if (eye.e === "O.dx") {ee = "o.dx";}
  if (eye.e === "O.sin") {ee = "o.sin";}
  try {
    Fields['Notat - NavigatorTree'].select("Operationsbeskrivelse");
    if (Procedure === "Eylea") {
      Fields['Notat - Operationsbeskrivelse - Text'].input("Anti-VEGF-injektion med Eylea " + ee + ".<newline>Der injiceres 0,05 ml Eylea 40 mg/ml, 3,5 mm bag limbus, ukompliceret.");
    } else {
      if (Procedure === "Lucentis") {
        Fields['Notat - Operationsbeskrivelse - Text'].input("Anti-VEGF-injektion med Lucentis " + ee + ".<newline>Der injiceres 0,05 ml Lucentis 10 mg/ml, 3,5 mm bag limbus, ukompliceret.");
      } else {
        Fields['Notat - Operationsbeskrivelse - Text'].input("Pt. møder som aftalt til implantation af Ozurdex-stav " + ee + ".<newline><newline>Der implanteres Ozurdex 700 µg 3,5 mm bag limbus, ukompliceret.<newline><newline>Afslutningsvis 1 dråbe Kloramfenikol.");
      }}
  } catch (e) {
    return "'Operationsbeskrivelse' kan ikke opdateres. Vær opmærksom på, om det samlede notat er korrekt."; }
  
  /*****************************/
  /*** Behandlingsplan       ***/
  /*****************************/
  try {
    if (Procedure === "Ozurdex") {
      Fields['Notat - NavigatorTree'].select("Konklusion og plan");
      Fields['Notat - Konklusion og plan - Text'].input("Trykkontrol hos egen øjenlæge om 2 - 3 uger.<newline>Kontrol i øjenambulatoriet som aftalt."); 
      Fields['Notat - NavigatorTree'].select("Ordination af medicin");
      Fields['Notat - Ordination af medicin - Text'].input("Øjendr. Tobrex Depot x 2 dagligt i 4 dage.");
    }
  } catch (e) {
    Dialog.warn("Advarsel", "'Konklusion og plan' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); }

  /*****************************/
  /*** Slut nøgleord         ***/
  /*****************************/
 lastfield = "Operationsbeskrivelse";
  
  return "0";
}
)();