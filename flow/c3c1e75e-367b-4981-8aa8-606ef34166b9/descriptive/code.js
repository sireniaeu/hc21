(function DxtSin (x) {
  var i = 0;
  while (i === 0) {
    var eye = Dialog.input(Procedure, " ", 
              {"a": { "type": "SELECT", "prompt": "Øje", "selectBetween":["O.dxt","O.sin"]}});
    if (eye.a !== undefined) {
      i = 1;
  }  
  }
  return eye.a;
})();