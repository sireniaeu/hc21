(function() {
  try {
    Wait.forField(Fields['CPR'], 5);
    //if(Fields["Login"].exists()) { return "-"; }
    var cpr = Fields["CPR"].read();
    if (cpr !== null && cpr !== "") return cpr;
    return "-";
  } catch(err) {
    return "-";
  }
})();