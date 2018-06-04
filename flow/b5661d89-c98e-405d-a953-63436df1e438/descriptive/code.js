Settings.CommandRetries = 9;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

(function SkeleXtropi (x) {
  
  var proc = Procedure.trim();
  if (proc === "Skeleoperation - Esotropi") 
  {
    t1 = "medialis";
    t2 = "lateralis";
    }
  else 
  { //*** exotropi ***//
    t1 = "lateralis";
    t2 = "medialis";
  }
  
  
  var oculus = ["O.sin", "O.dxt"];
  var anaest = ["Peribulbær anæstesi                         ", 
                "Retrobulbær anæstesi                        ", 
                "Generel anæstesi                            "];
  var skele = Dialog.input(
    Procedure, "Angiv målinger",{
      "Eye": { "type": "RADIO", "prompt": "Øje:", "value": oculus[0], "selectBetween": oculus},
      "Anaestesi": { "type": "RADIO", "prompt": "Anæstesi", "value": anaest[0], "selectBetween": anaest},
      "l1": {"type": "MULTITEXT", "prompt": "Operation:", 'texts': [
        {'name': 'tilbage',"prefix": "Rectus " + t1 + " lægges", "suffix": "(mm) tilbage.", 'validation': {'isRequired': true, 'message': "Længde skal angives"}}]},
      "l2": {"type": "MULTITEXT", "prompt": " ", 'texts': [
        {'name': 'forkortes', 'prefix': "Rectus " + t2 + " forkortes", 'suffix': "(mm).", 'validation': {'isRequired': true, 'message': "Længde skal angives"}} ]}
    });
  
  try {
    /**************************/
    /*** Set type of note   ***/
    /**************************/
    Fields['Notat - Skabelon'].select("Ambulant operationsnotat");
  } catch (e) {
    return "Det er ikke muligt at vælge notatskabelonen."; }
  
  /*** Anaestesia ***/

  try {
    Fields['Notat - NavigatorTree'].select("Anæstesitype");
    Fields['Notat - Anæstesitype - Text'].input(skele.Anaestesi);
  } catch (e) {
    return "'Anæstesitype' kan ikke opdateres."; }
  
  /******************/
  /*** Procedurer ***/
  /******************/
  var ProcedureCode = "KCEC10";
  try {
    
    Fields['Notat - NavigatorTree'].select("rocedurer");
    Fields['Notat - Find Koder - Kodetype Kopier'].select("Procedurer");
    Fields['Notat - Find Koder - Text'].input(ProcedureCode);
    Fields['Notat - Find Koder - Søg'].click();
    Fields['Notat - Find Koder - Resultat'].select(ProcedureCode);
    /*** Set Date and Time ***/
    Flow.run('Eye subfunction - set data and time',{});
    Fields['Notat - Find Koder - Tilføj'].click();
  } catch (e) {
    return "'Procedure' kan ikke opdateres.";
  }
  
  /************************/
  /*** Set Tillægskoder ***/
  /************************/
  
  try {
    Flow.run('Eye subfunction - TUL12', {pcode: ProcedureCode, Ods: skele.Eye, offset: '0', skip: '0'});
  } 
  catch (e) {
    return "'Tillægskode' kan ikke opdateres.";
  }
  
  /*****************************/
  /*** Operationsbeskrivelse ***/
  /*****************************/
  
  try {
    Fields['Notat - NavigatorTree'].select("Operationsbeskrivelse");
    Fields['Notat - Operationsbeskrivelse - Text'].input("Musculus rectus " + t1 + " lokaliseres. Denne lægges " + skele.l1.tilbage + " mm tilbage. Sutureres til sclera med Vicryl 6-0. Conjunctivaadapteret med Vicryl 7-0.<newline>Musculus rectus " + t2 + " lokaliseres. Denne forkortes " + skele.l2.forkortes + " mm. Sutureres til sclera ved muskelhæftet med Vicryl 6-0. Conjunctivaadapteret med Vicryl 7-0.");
  } catch (e) {
    return "'Operationsbeskrivelse' kan ikke opdateres. Vær opmærksom på, om det samlede notat er korrekt."; }
  
  /***********************/
  /*** Behandlingsplan ***/
  /***********************/
  try {
    Fields['Notat - NavigatorTree'].select("Konklusion og plan");
    Fields['Notat - Konklusion og plan - Text'].input("Kontrol ved egen øjenlæge om 1 uge.<newline>Kontrol i Skeleklinikken + operatør om 6 - 8 uger.");
    Fields['Notat - NavigatorTree'].select("Ordinationer, øvrige");
    Fields['Notat - Konklusion og plan - Text'].input("rp. Tobradex 1 x 3 i det opererede øje i 3 uger.");                                                 
  } catch (e) {
  Dialog.warn("Advarsel", "'Konklusion og plan' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); }

  return "0";
})();