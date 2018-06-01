Settings.CommandRetries = 9;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

(function KataraktTorisk () {
  var oculus = ["O.sin", "O.dxt"];
  var anaest = ["Dråbeanæstesi                               ",
                "Peribulbær anæstesi                         ", 
                "Retrobulbær anæstesi                        ", 
                "Generel anæstesi                            "];
  var phenyl = ["Nej", "Ja"];
  
  var katarakttorisk = Dialog.input(
    "Katarakt operation - Torisk", "Angiv målinger",{
      "Eye": { "type": "RADIO", "prompt": "Øje:", "value": oculus[0], "selectBetween": oculus},
      "Anaestesi": { "type": "RADIO", "prompt": "Anæstesi", "value": anaest[0], "selectBetween": anaest},
      "Phenylephrin": { "type": "RADIO", "prompt": "Phenylephrin intrakameralt", "value": phenyl[0], "selectBetween": phenyl},
      "Akse": {"type": "MULTITEXT", "prompt": "Akse:", 
               'texts': 
               [{'name': 'akse', 
                 'suffix': "°",
                 'validation': {'regex': '^[0-9]{1,3}$', 'message': "Akse skal angives og skal være et tal"} 
                } ] },
      "Linse": {"type": "MULTITEXT", "prompt": "Linse:", 
                'texts': 
                [{'name': 'linse', 
                  'suffix': "(Øverste kode fra æskens bagside)", 'validation': {'isRequired': true, 'message': "Linse skal angives"} 
                 } ] }
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
    Fields['Notat - Anæstesitype - Text'].input(katarakttorisk.Anaestesi);
  } catch (e) {
    return "'Anæstesitype' kan ikke opdateres."; }
  
  /******************/
  /*** Procedurer ***/
  /******************/

  try {
    var ProcedureCode = "KCJE20";
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
    Flow.run('Eye subfunction - TUL12', {pcode: ProcedureCode, Ods: katarakttorisk.Eye, offset: '0', skip: '0'});
    var GenAnCode = "NAAC3";
    if (katarakttorisk.Anaestesi === anaest[3]) {
      Fields['Notat - Find Koder - Valgte koder'].select(ProcedureCode);
      Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");
      Fields['Notat - Find Koder - Text'].input(GenAnCode);
      Fields['Notat - Find Koder - Søg'].click();
      Fields['Notat - Find Koder - Resultat'].select(GenAnCode);
      Fields['Notat - Find Koder - Tilføj'].click(); 
    }
  } 
  catch (e) {
    return "'Tillægskode' kan ikke opdateres.";
  }
  
  /*****************************/
  /*** Operationsbeskrivelse ***/
  /*****************************/
  try {
    Fields['Notat - NavigatorTree'].select("Operationsbeskrivelse");
    Fields['Notat - Operationsbeskrivelse - Text'].input("Linse: " + katarakttorisk.Linse.linse + " Akse: " + katarakttorisk.Akse.akse + "<newline><newline>Korneal tunnel- og hjælpeincision. Under DiscoVisc forreste capsulorrhexis. Kernen løsnes med vand og fakoemulsificeres. Resterende corticalis fjernes med sug/skyl. Bagre kapsel poleres. Under DiscoVisc implanteres bagkammerlinse i kapslen.<newline>DiscoVisc fjernes med sug/skyl.<newline>Cefuroxim 1 mg i kammeret og vand til normotension. Cikatricen er tæt.<newline>Dryppes med øjendr. Maxidex x 1.<newline><newline>Pt. møder til kontrol i morgen, ugekontrol hos optiker og 3 mdr. optikerkontrol efter 2. øje (SKAL BOOKES).");
  } catch (e) {
    return "'Operationsbeskrivelse' kan ikke opdateres. Vær opmærksom på, om det samlede notat er korrekt."; }
  
  /*************************************/
  /*** Operationsbeskrivelse forsat ***/
  /*************************************/
  try {
    Fields['Notat - NavigatorTree'].select("Operationsbeskrivelse forsat");
    Fields['Notat - Operationsbeskrivelse - Text'].input("Der er anvendt Phenylephrin intrakameralt.");
  } catch (e) {
    return "'Operationsbeskrivelse fortsat' kan ikke opdateres. Vær opmærksom på, om det samlede notat er korrekt."; }
  
  /***********************/
  /*** Behandlingsplan ***/
  /***********************/
  try {
    Fields['Notat - NavigatorTree'].select("Konklusion og plan");
    Fields['Notat - Konklusion og plan - Text'].input("Møde til kontrol i øjenambulatoriet som aftalt.<newline><newline>Efterbehandling: Maxidex x 3 i 3 uger.");
  } catch (e) {
  Dialog.warn("Advarsel", "'Konklusion og plan' kan ikke opdateres. Feltet findes muligvis ikke i notatskabelonen."); }
  
  return "0";
})();