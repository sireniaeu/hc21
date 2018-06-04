var cprNumber = "121214-1337".replace(/-/, ''); // Lad os holde denne 'dash-fri' for en sikkerheds skyld
var firstName = "O'Henry";     // Bliver kun brugt, hvis patienten ikke var kendt i CCL
var familyName = "O'Leary";    // Bliver kun brugt, hvis patienten ikke var kendt i CCL
var gender = "Male";           // Kan også være 'Female' eller 'Unknown' - bliver kun brugt, hvis patienten ikke var kendt i CCL
var anaesthesiaType = "225";   // Skal måske mappes mellem systemerne?

var gmtOffset = '+01:00';      // Mangler muligvis håndtering af sommertid
var start = new Date('2018-02-21T03:24:00' + gmtOffset).getTime();
var stop = new Date('2018-02-21T04:24:00' + gmtOffset).getTime();

var organization = "99";       // Skal måske mappes mellem systemerne?
var patientStatusValue = "317";// Skal måske mappes mellem systemerne?
var surgeryRoom = "111";       // Skal måske mappes mellem systemerne?
var surgeryTask = "254";       // Er ikke sikker på præcist hvad denne er afhængig af .. måske typen af kirurgi?

// ----- PATIENT IDENTIFICATION ------
var reply = Http.post(
  'http://anywhere.c3a.dk/json/addpatienttoactivitylist/searchPatientsUsingFilters', 
  JSON.stringify({ identifier: cprNumber }),
  { credentials: { username: 'demo3', password: 'demo', auth: 'basic'}, contenttype: 'application/json' }
);

if (reply.status !== 200) {
  throw 'Patient opslag fejlede: ' + reply.status;
}

var replyData = JSON.parse(reply.data);
var patientLookupResponse;
if (replyData.Data.Patients.length === 0) {
  Notification.show('Info', 'Info', 'Patient blev ikke fundet. Opretter patient og OP...', { timeout: 5 });
  patientLookupResponse = [
                {
                    "@@type": "Parameter",
                    "Key": "identifier",
                    "Value": cprNumber
                },
                {
                    "@@type": "Parameter",
                    "Key": "gender",
                    "Value": gender
                },
                {
                    "@@type": "Parameter",
                    "Key": "givenName",
                    "Value": firstName
                },
                {
                    "@@type": "Parameter",
                    "Key": "familyName",
                    "Value": familyName
                }
            ];
} else {
  Notification.show('Info', 'Info', 'Fandt patient. Opretter OP...', { timeout: 5 });
  patientLookupResponse = replyData.Data.Patients[0].rawParameters;
}
// ----- PATIENT IDENTIFICATION ------

var postBody = {
  "creationModel": {
        "surgery-component": {
            "anaesthesiaType": anaesthesiaType,
            "duration": stop - start,
            "organization": organization,
            "patientStatusValue": patientStatusValue,
            "start": start,
            "stop": stop,
            "surgeryRoom": surgeryRoom,
            "surgeryTask": surgeryTask,
            "surgeryAcute": false
        },
        "hints-component": {
            "Fields": {}
        },
        "encounter-component": {
            "encounter": {}
        },
        "patient-component": {
            "Parameters": patientLookupResponse
        }
    },
    "listType": "Surgery"
};

reply = Http.post(
  'http://anywhere.c3a.dk/json/genericlists/addToList',
  JSON.stringify(postBody),
  { credentials: { username: 'demo3', password: 'demo', auth: 'basic'}, contenttype: 'application/json' }
);

if (reply.status !== 200) {
  throw "OP oprettelse fejlede: " + reply.status;
}

Notification.show('Info', 'Success', 'OP oprettet for ' + cprNumber, { timeout: 5 });
