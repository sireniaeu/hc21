function findDiagnosis(searchTerm) {
  // The service returns results in the following form:
  // [
  //  {
  //    "code": "KKK",
  //    "description": "Operationer på retroperitonealt væv",
  //    "type": "opr"
  //  }, ... ]
  var result = Http.get("http://diagnosekoder.dk/search/all/" + searchTerm, {});
  if (result.status != 200) {
    return [];
  }
  return JSON.parse(result.data) || [];
}

// Test the function
var dr = Dialog.input("Search diagnosekoder.dk", "Enter search term below", { searchTerm: { type: 'TEXT', prompt: 'Search for', isRequired: true }});
var codes = findDiagnosis(dr.searchTerm);
if (codes.length > 0) {
  Debug.showDialog("First result is code=" + codes[0].code + ", desc=" + codes[0].description + ", type=" + codes[0].type);
} else {
  Debug.showDialog("No results");
}
