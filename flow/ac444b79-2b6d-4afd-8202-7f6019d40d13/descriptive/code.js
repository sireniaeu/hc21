/****************************************/
/*** Set TUL1 / TUL2 (tillægskoder)   ***/
/*** Input: pcode = procedure         ***/
/***        Ods = O.dx or O.sin       ***/
/***        offset = offset from skip ***/
/***        skip = skip to            ***/
/****************************************/

Fields['Notat - Find Koder - Valgte koder'].selectWithOffsetAndSkip(pcode, offset, skip);
Fields['Notat - Find Koder - Kodetype'].select("Tillægskoder");

if (Ods === "O.dx") {
  //*** O.dx ***//
  Fields['Notat - Find Koder - Text'].input("TUL1");  
  Fields['Notat - Find Koder - Søg'].click();
  Fields['Notat - Find Koder - Resultat'].select("TUL1");
}
if (Ods === "O.sin") {
  //*** O.sin ***//
  Fields['Notat - Find Koder - Text'].input("TUL2");
  Fields['Notat - Find Koder - Søg'].click();
  Fields['Notat - Find Koder - Resultat'].select("TUL2");
}
if (Ods === "O.u") {
  //*** O.u ***//
  Fields['Notat - Find Koder - Text'].input("TUL3");
  Fields['Notat - Find Koder - Søg'].click();
  Fields['Notat - Find Koder - Resultat'].select("TUL3");
}
Fields['Notat - Find Koder - Tilføj'].click();
