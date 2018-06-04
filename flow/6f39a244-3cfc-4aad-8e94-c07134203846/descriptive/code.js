// Helper function to loop through list and if predicate returns true then return the item
function find(items, predicate) {
  for(var i=0; i<items.length; i++) {
    if(predicate(items[i])) return items[i];
  }
  return {};
}

// Send request to Anywhere
var reply = Http.post(
  'http://anywhere.c3a.dk/json/addpatienttoactivitylist/searchPatientsUsingFilters', 
  '{"identifier":"010666-2318"}',
  { credentials: { username: 'demo3', password: 'demo', auth: 'basic'}, contenttype: 'application/json' }
);

var result = JSON.parse(reply.data);

// Find the CCL_ID item in raw parameters
var id = find(result.Data.Patients[0].rawParameters, function(p) { return p.Type === 'CCL_ID'; }).Value;
Debug.showDialog("Id was "+id);