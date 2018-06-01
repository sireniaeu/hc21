/* To start the flow cosmic must be at Booking - Planlagte aktiviteter. */
/* Selection criteria to find bookings must be set and run */
/* sdlkfsdlfj - self*/

var commandline = true;
if (commandline) {
    // We are running off the commandline for development
    /*	var unirest = require('unirest');
        var Http = {
            post: function(url, data, auth, opts) {unirest.post(url).header('Accept', 'application/json').auth({user:auth.credentials.username, pass:auth.credentials.password, sendImmediately:true}).send(JSON.parse(data)).end(function (response) {console.log(response.body);});}, 
            put:function() {console.log("Dialog: "+JSON.stringify(arguments));}
            }; */
    var request = require('sync-request');
    var Http = {
        post: function (url, data, auth, opts) {
            result = request('POST', url, {
                headers: { authorization: 'Basic ' + Buffer.from('demo3' + ':' + 'demo', 'ascii').toString('base64'), },
                json: data,
            });
            returnObj = {
                status: result.statusCode,
                body: result.getBody(),
            }
            return returnObj;
        },
        put: function () { console.log("Dialog: " + JSON.stringify(arguments)); }
    };
    var Dialog = { info: function () { console.log("Dialog: " + JSON.stringify(arguments)); }, warn: function () { console.log("Dialog: " + JSON.stringify(arguments)); } };
    var Notification = { show: function () { console.log("Notification: " + JSON.stringify(arguments)); }, warn: function () { console.log("Notification: " + JSON.stringify(arguments)); } };

    //system exit
    //return false;

    var b0 = {
        "CPR-nr.": "101010-1010",
        "Navn": "John Doe",
        "Køn": "Male",
        "Lokalitet": "DK_Stue 1",
        "Aktivitet": "Højre Knæ",
        "Book. dato": Date.now(),
    };

    /*
        var b1 = {
            "CPR-nr." :  "121212-1212",
            "Navn": "Jane Doe",
            "Køn" : "Female",
            "Lokalitet" : "DK_Stue 1",
            "Aktivitet" : "Venstre Arm",
            "Book. dato" : Date.now(),
        };
    */

    var rows = [b0];
    var bookingtable = { rows: rows, cols: 1 };

} else {
    //We are running of the Manatee program	
    var bookingtable = Fields["Booking table"].inspect();
    Debug.ger();

}

/* Loop through list of bookings */
for (var i = 0; i < bookingtable.rows.length; i++) {

    try {
        Dialog.info('Række #' + i, JSON.stringify(bookingtable.rows[i]));

        // Extract data
        var inputPatient = extractPatientData(bookingtable);
        // Extract data
        var inputSurgery = extractSurgeryData(bookingtable);
        // Find or create Patient
        var patientLookupResponse = findOrCreatePatient(inputPatient);
        // Create Surgery 
        createSurgery(inputSurgery, patientLookupResponse);

    } catch (e) {
        Dialog.info('Exception at row# ' + i, JSON.stringify(bookingtable[i]));
        Dialog.info(e.toString());
    }
}

function extractPatientData(bookingtable) {
    var inputPatient = new Object();
    inputPatient.cprNumber = bookingtable.rows[i]["CPR-nr."].replace(/-/, ''); // Strip - from cpr
    var nameseg = bookingtable.rows[i]["Navn"].split(",");
    inputPatient.firstName = nameseg[1]; // Only used in case of pt creation
    inputPatient.familyName = nameseg[0]; // Only used in case of pt creation
    inputPatient.gender = "Unknown"; //  Only used in case of pt creation. Can be 'Female', 'Male' or 'Unknown'
    if (bookingtable.rows[i]["Køn"] === "Man") {
    inputPatient.gender = "Male"; // Map COSMIC gender. Can be 'Man', 'Kvinna'. Maybe some form of unknown?
    } else {
        if (bookingtable.rows[i]["Køn"] === "Kvinna") {
        inputPatient.gender = "Female";
        } else {
            Dialog.warn('Advarsel', 'Køn ukendt', {});
        }
    }
    return inputPatient;
}

function extractSurgeryData(bookingtable) {
    var inputSurgery = new Object();
    inputSurgery.anaesthesiaType = "225"; // TODO: Must be set to unknown as per solution description
    var gmtOffset = '+01:00'; // TODO: Summertime issue should be handled
    inputSurgery.start = new Date(bookingtable.rows[i]["Book. dato"] + 'T04:00:00' + gmtOffset).getTime(); //TODO: Must be 'Book dato' as per solution description
    inputSurgery.stop = new Date(bookingtable.rows[i]["Book. dato"] + 'T04:30:00' + gmtOffset).getTime(); //TODO: Must be 'Book dato' as per solution description
    inputSurgery.organization = "99"; // TODO: Must be mapped
    inputSurgery.patientStatusValue = "317"; //TODO: Must be '1 Booket' as per solution description
    inputSurgery.surgeryRoom = "111"; // TODO: Must be mapped
    inputSurgery.surgeryTask = "254"; // TODO: Must be looked up on the basis of the string value from COSMIC as per solution description
    return inputSurgery;
}

function findOrCreatePatient(inputPatient) {
    Notification.show('Info1', 'Info', 'Henter patient id i Cetrea', { timeout: 15 });

    // Search for patient in CCL
    var reply = Http.post(
        'http://anywhere.c3a.dk/json/addpatienttoactivitylist/searchPatientsUsingFilters',
        JSON.stringify({ identifier: inputPatient.cprNumber }), { credentials: { username: 'demo3', password: 'demo', auth: 'basic' }, contenttype: 'application/json' });
    Dialog.info('Search call executed');

    Dialog.info('reply.statu******s: ' + reply.status);

    if (reply.status !== 200) {
        // Search call failed. Propagate exception
        Dialog.info('Search call failed. Propagate exception');
        throw 'Patient opslag fejlede med status code: ' + reply.status;
    }

    var replyData = JSON.parse(reply.data);
    Notification.show("Reponse from HTTP post: " + replyData);
    var patientLookupResponse;
    if (replyData.Data.Patients.length === 0) {
        // No patient(s) were found in CCL
        // Create a new patient
        Notification.show('Info3', 'Info', 'Patient blev ikke fundet. Opretter patient og OP...', { timeout: 15 });
        patientLookupResponse = [{
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
        Notification.show('Info4', 'Info', 'Fandt patient. Opretter OP...', { timeout: 15 });
        Dialog.info('header', 'Fandt patient. Opretter OP...', {});

        patientLookupResponse = replyData.Data.Patients[0].rawParameters;
        return patientLookupResponse;
    }
}

function findOrCreateSurgery(inputSurgery, patientLookupResponse) {
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
        JSON.stringify(postBody), { credentials: { username: 'demo3', password: 'demo', auth: 'basic' }, contenttype: 'application/json' });

    if (reply.status !== 200) {
        throw "OP oprettelse fejlede: " + reply.status;
    }

    Notification.show('Info5', 'Success', 'OP oprettet for ' + cprNumber, { timeout: 15 });
    Dialog.info('OP oprettet', "CPR-nr.: " + bookingtable.rows[i]["CPR-nr."], {});
}
