/* This flow is called from Nobly Ankomst.                                 */
/* It register the patients arrival in Cosmic "i kassen"                   */
/*                                                                         */
/* Input parameters:                                                       */
/*   Patientid: [eu.sirenia]Action.In.PsykAR.Cpr                           */
/*   Booking tid: [eu.sirenia]Action.In.PsykAR.Tid                         */

/* MISSING FOR FINAL MULTI SITE PRODUCTION VERSION           

1) Get location / enhed from Nobly. Probably requires lookup in SOR.
2) Use virtual PC's.
3) Find way to load balance. Flemming Lauemøller say there is 1000 visits pr day.

*/

var patientid = Inputs['[eu.sirenia]Action.In.PsykAR.Cpr'];
var ptid = Inputs['[eu.sirenia]Action.In.PsykAR.Tid'];
var pkliniker = Inputs['[eu.sirenia]Action.In.PsykAR.Kliniker'];
var penhed = Inputs['[eu.sirenia]Action.In.PsykAR.Enhed'];
/* Location / enhed must be provided by Nobly. To be updated in final multi-location version */
var lokalitet = "PSY Psykoterapeutisk Team (Odense)";

/* Cosmic Log in information */
var iUser = "ankomstpsyk";
var iPass = "ankomstpsyk1234";
var iAfd = "PSY Psykiatrisk Afdeling (Odense)";

var testiUser = "testlaege40";
var testiPass = "abcd1234";
var testiAfd = "PSY Psykiatrisk Afdeling (Odense)";

var sys = "Prod"; /* "Prod" or "Test" */

/* Test og debug settings */
var test = false;
var debug = false;
var debug2 = false;
var notify = true;
var testdato = ""; 
//var testdato = "01-03-2018";
var testtid = "";
/*var testtid = "10:45"; */
var testpc = false;
var timelog = false;
var timelog2 = false;

/* Variables used in flow */


var memoryTable = [];
var errmsg = "";
var kCpr = "CPR-nr.";
var kNavn = "Navn";
var kStatus = "Status";
var kTid = "Tid";
var kBesoegsart = "Besøgsart";

/* Status codes */
var booket = "154";
var ankommet = "165";
var igang = "151";
var udfoert = "155";
var makuleret = "160";

var andentid = "Patient er booket til anden tid end kl. ";

var patientFound = false;
var ingroup = false;

var PtArrived = true; /* Flag used to set that a patient is found with a different booking time, and the current booking is registered Arrived (ankommet) */
var PtFoundDiffTime = false; /* Flag used to set that the patient is found but with a different booking time */

var stdretry = 10;
Settings.CommandRetries = stdretry;
Settings.CommandRetryDelays = [50, 50, 50, 200, 400, 800, 1600];

/* Functions called by the flow */

function cleanup(c) 
{
  /* Claenup before start */
  Settings.CommandRetries = 3;  
  try { Fields["Cave - Annullér knap"].click(); } catch (e) {}
  try { Fields["Cave - OK knap"].click(); } catch (e) {}
  try { Fields["Psy - Besøgsregistrering"].click(); } catch (e) {}
  Settings.CommandRetries = 6;
  try { var result = Fields["Psyk - gruppe tab"].select("P"); } catch (e) {}
  try { Fields["Ryd CPR"].click(); } catch (e) {}
  try { Fields["Psy - Ryd"].click(); } catch (e) {}
  try { Wait.forField(Fields["Psyk - besoegstabel"], 8); } catch (e) {} 
  Settings.CommandRetries = stdretry;
}

function gem() 
{
  /* This function "saves the patient". 
  Due to internal timing in Cosmic it's not possible to just hit save (Gem) and then return to "Besøgslisten" 
  because some function in Cosmic will then not be performed */
  try {      
    Wait.forField(Fields["Psy - Gem"], 15);
    Log.info('Psykiatri','I gem');
    /* Check that selected patient is the right patient id */
    var ptread = Fields["Patientlinje - CPR"].read();
    if (ptread !== patientid) {
      Fields["Psy - Opdater"].click();
      Log.info('Psykiatri','Efter opdater klik');
      throw "Patientid forskellig fra valgt patient.";
    }
    Log.info('Psykiatri','Før besøgsregistrering');
    try {
      Wait.forField(Fields["Psy - Betalingsregistrering"], 20);
    } catch (e) {
      throw "Manglende betalingsinformation på patienten.";
    }
    Fields["Psy - Gem"].click();
    
    Wait.forSeconds(1);
    if (ingroup) {
      Wait.forSeconds(7); /* It takes time for Cosmic to register the payment so returning from a group to fast prevents the payment registration */
    }
    
    /* If the patient has more than one bookings at the same day a dialogue will appear. This dialogue is closed */
    windowIsShown = Window.withTitleShown("Åbn besøg"); 
    if (windowIsShown) {
      Fields["Cave - Annullér knap"].click();
    }
    
    /* If certain information on the patients booking is missing a dialogue is shown. 
    The dialogue is "ok'ed" and a error/information message is returned from the flow */
    windowIsShown = Window.withTitleShown("Gem besøg");    
    if (windowIsShown) {
      Fields["OK button"].click();
      errmsg = "Startvilkår eller anden information på aftale mangler.";
      throw errmsg;
    }
    
    return "Gem ok";
    
  } catch (e) {
    var err = e;
    if (err === "") err = "Kunne ikke gemme.";
    if (debug) Dialog.info('Catch i gem', err, { 'timeout': 10 });
    try { Fields["Ryd CPR"].click(); } catch (e) {}
    throw err;
  }
}

function LoginCosmic() 
{
  /* Setlogin id for test and prod */
  if (sys === "Test") {
    iUser = testiUser;
    iPass = testiPass;
    iAfd = testiAfd;
  }

  try {
    Wait.forField(Fields['Ryd CPR'], 10);
    Settings.CommandRetries = 9;
    return 0;
  } catch (e) { }
  
  Settings.CommandRetries = 3;
  /* Check if user is logged in and screen saver login is active. If so then log out */
  try { 
    Wait.forField(Fields['Cosmic password indlogget'], 3);
    Fields["Cosmic Log ud"].click();
    Fields["Ja"].click();
    Wait.forSeconds(5);
  } catch (e) { 
    /* Check if login field appears. If not then Cosmic is already logged ind, so return and have cleanup bring Cosmic back to Besøgslisten */
     try { 
       Wait.forField(Fields['Cosmic password'], 3);
     } catch (e) { 
       Settings.CommandRetries = 9;
       return 0;
     }
  }
  
  Settings.CommandRetries = stdretry;  
  /* Call a sub-flow that does the login */
  try {
    Flow.run('Psyk - Restart Cosmic', { Usr: iUser, Pas: iPass, Af: iAfd });
    /* Wait for Cosmic to load - usually appx. 20 sec. */
    Wait.forField(Fields["Ryd CPR"], 180);
  } catch (e) {
    /* Login sub-flow failed. Clean-up if message is shown by pressing OK button and then retur errmsg */
    try {Fields["OK button"].click(); } catch (e) {}
    errmsg = "Fejl i login.";
    throw errmsg;
  }
}

function createMemTable() 
{
  
  Timer.start('myTimer');
  /* Loop through "besøgstabellen" */
  try {
    /* Read "besøgstabel" */
    var mpatientsAndGroups = Fields["Psyk - besoegstabel"].inspect();
    var memTable = [];
    memTable[0] = {'cpr': 'CPR', 'tid': 'Tid', 'group': 'Group', 'status': 'Status'};
    var memRow = 0;
    /* Loop through list of patients and groups */
    for (var i=0; i<mpatientsAndGroups.rows.length; i++) 
    { 
      if (mpatientsAndGroups.rows[i][kCpr] === "") {
        /* It's agroup. Read group table  */
        Fields["Psyk - besoegstabel"].doubleClickCell("<<"+mpatientsAndGroups.rows[i][kNavn]+">>",kNavn);
        Wait.forField(Fields["Psyk - gruppe patient tabel"], 30);
        var group = Fields["Psyk - gruppe patient tabel"].inspect();
        /* Loop through table to search for patient */
        for (var j=0; j<group.rows.length; j++) 
        { 
          /* Tid contains date and time. Remove date */
          var splitstr = group.rows[j]["Dato og tid"].split(" ");
          var gtid = splitstr[1]; /* Cut dato ud af tid */
          /* Check if Makuleret patient should  be excluded from table */
          memTable[memRow++] = {'cpr': group.rows[j][kCpr], 'tid': gtid.replace("<colon>", ":"), 'group': mpatientsAndGroups.rows[i][kNavn], 'status': mpatientsAndGroups.rows[i][kStatus]};
        }
        /* Go back from group */
        try { 
          Fields["Psyk - gruppe tab"].select("P"); 
        } catch (e) {Log.warn('PsykiatriWarn', 'Fejl i select P. Return from group: ' + mpatientsAndGroups.rows[i][kNavn]);}
        try { 
          Wait.forField(Fields["Psyk - besoegstabel"], 30);
        } catch (e) {Log.warn('Fejl i wait for Psyk - besoegstabel. Return from group: ' + mpatientsAndGroups.rows[i][kNavn]);}
        Wait.forSeconds(8);
        
      } else {
        /* It's a patient. Inset patient in list */
        memTable[memRow++] = {'cpr': mpatientsAndGroups.rows[i][kCpr], 'tid': mpatientsAndGroups.rows[i][kTid].replace("<colon>", ":"), 'group': "", 'status': mpatientsAndGroups.rows[i][kStatus]};
      }
    }
    
    var logtid = Timer.stop('myTimer');
    if (notify) Notification.show('Memory table', 'Memory table build time and length' , 'Build time: ' + logtid + ' Length: ' +  memTable.length, {timeout: 15});
   Log.info('Psykiatri','Build time: ' + logtid + ' Length: ' +  memTable.length); 
  /* var tx = '';
    for (x=0; x < memTable.length; x++) {
      tx = tx + memTable[x].cpr + " " + memTable[x].tid + " " + memTable[x].group + " " + memTable[x].status + " " + memTable[x].Besoegsart + "\n";
    }
    Dialog.info('', tx, { });*/
  
    return (memTable);
    
  } catch (e) {
    var err = e;
    if (err === "") { err = "Besøgstabel kunne ikke oprettes.";}
    Log.warn('PsykiatriWarn',err);
    if (debug) Dialog.info(err, e, {  });
    throw err;
  }
}


/**************************************************/
/*                Start of flow                   */
/**************************************************/
Timer.start('Flow');

try {
  LoginCosmic();
} catch (e) {} /* Do not return error in this 1st login attempt. */

/* Call the cleanup function to clean up if Cosmic is in a wrong state */
cleanup();

try {
  LoginCosmic();
} catch (e) {
  errmsg = e.message || e;
  Log.warn('PsykiatriWarn',errmsg);
  if (debug) Dialog.info("Login error", errmsg, {  });
  throw errmsg;
}

/* Login "i kassen", if "Kasseadministration" button does not exist  */
var ikasse = false;
try {
  Wait.forField(Fields["Psy - Kasseadministration"], 30);
  ikasse = true;
} catch (e) {
  try {
    Fields["Psy - Besøgsregistrering"].click();
    Fields["Psy - Log ind i kasse"].click();
    Fields["Psy - Log ind"].click();
    Wait.forSeconds(8);
  } catch (e) {
    err = "Kunne ikke logge ind i kassen.";
    Log.warn('PsykiatriWarn', err);
    throw err;
  }
}

if (notify) Notification.show('Patient', patientid.slice(0,6) + 'x',  ptid, {timeout: 15});
  
/* Set location and date */
try {
  var da = new Date();
  var d = da.getDate();
  if (d < 10) {d = ("0" + d);} else {d = d + "";}
  var m = da.getMonth() + 1;
  if (m < 10) {m = ("0" + m);} else {m = m + "";}
  var y = da.getFullYear() + "";
  var dato = d + "-" + m + "-" + y;
 
  if (testdato !== "") dato = testdato;
  if (true) lokalitet = "(Alle i udvalg)";
  
  /* Set lokalitet if not already set */
  var lres = Fields["Psy - Lokalitet2"].read();
  if (lres !== lokalitet) 
    Fields["Psy - Lokalitet2"].select("<<"+lokalitet+">>");

  /* Set date if not already set */
  readDate = Fields["Psy - Dato"].read();
  if (readDate !== dato) {
    /* Set today */
    Fields["Psy - Dato"].click();
    Fields["Psy - Dato"].inputNative(dato);
    Fields["Psy - Opdater"].click();
    Wait.forSeconds(3);
  } 
} catch (e) {
  err = "Kunne ikke sætte dato eller lokalitet.";
  Log.warn('PsykiatriWarn', err);
  throw err;
}

/*for (y=0;y<100;y++) {
  Timer.start('T2');
  createMemTable();
  var logtid = Timer.stop('T2');
  Notification.show('Flow time', 'Run # ' + y + ' Flow time: ' , logtid, {timeout: 15});
  Log.warn('PsykiatriLog',  'Run # ' + y + ' Flow time: ' + logtid);
  
}
throw Slut;*/

/* Create memory table if not already created for todays date */
try {
  var doTable = false;
  var v = App.session().read('PsykAR date');
  if (v === null || v !== dato) {
    doTable = true;
    App.session().write('PsykAR date', dato);
  }
  memoryTable = App.session().read('PsykAR table');
  if (memoryTable === null || doTable) {
    memoryTable = createMemTable();
    App.session().write('PsykAR table', memoryTable);
  } 
} catch (e) {
  err = "Fejl i oprettelse af memory tabel.";
  Log.warn('PsykiatriWarn', err);
  throw err;
}
/* Find patient and whether patient is in a group to be able to select right group when looping besøgstabel */
var groupname = "";
try {
  for (m=0; m < memoryTable.length; m++) {
    if (memoryTable[m].cpr === patientid){
      patientFound = true;
      if (memoryTable[m].tid === ptid ) {
        groupname = memoryTable[m].group;
        if (groupname !== "")  {
          ingroup = true; }
        PtFoundDiffTime = false;
        m = memoryTable.length;
      } else {
        PtFoundDiffTime = true;
      }
    }
  }
} catch (e) {
  err = "Fejl i søgning i memory tabel.";
  Log.warn('PsykiatriWarn', err);
  throw err;
}

if (!patientFound) {
  err = "Patient ikke fundet.";
  Log.warn('PsykiatriWarn', err);
  throw err;
}
if (PtFoundDiffTime) {
  err = andentid + ptid + ".";
  Log.warn('PsykiatriWarn', err);
  throw err;
}

/* Loop through "besøgstabellen" */
try {
  /* Read "besøgstabel" */
  var patientsAndGroups = Fields["Psyk - besoegstabel"].inspect();
  
  /* Loop through list of patients and groups */

  for (var i=0; i < patientsAndGroups.rows.length; i++) 
    if (!ingroup) {
      if (patientsAndGroups.rows[i][kCpr] === patientid)
      {
        if (patientsAndGroups.rows[i][kTid].replace("<colon>", ":") !== ptid) 
        {
          /* 
          Patient id found, CosmicTid is different from NoblyTid. 
          Can happend if eg. the connection btw Nobly Ankomst and Cosmic has been down and the user therefore has done manual registrations in Cosmic.
          The patient can have more than one bookings. Only if all the patients bookings are marked as arrived (ankommet) "OK. Patient allerede registreret" is returned.
          Otherwise and error an this messages is returned: "Ikke-OK. Patient er booket til andet tidspunkt end kl. ”Nobly tid”. */   
          PtFoundDiffTime = true;
          if (patientsAndGroups.rows[i][kStatus] !== ankommet ) PtArrived = false; 
        } else {
          /* Patient found. Time correct */
          
          Fields["Psyk - besoegstabel"].doubleClickCell("<<"+patientsAndGroups.rows[i][kNavn]+">>",kNavn);
          /* Check if doubleclick worked */
          try {
            Wait.forField(Fields["Psy - Gem"], 6);
          } catch (e) {
            err = "DoubleClickfailed";
            Log.warn('PsykiatriWarn', err);
            throw err;
          }
          
          /* SAVE */
          try {            
            var gemresult = gem();
          } catch (e) {
            errmsg = e.message || e;
            throw errmsg; 
          }
          
          /* Stop further loops */
          patientFound = true;
          i = patientsAndGroups.rows.length;
          /* Clean up and go back to "besøgsliste" */
          try { Fields["Ryd CPR"].click(); } catch (e) {}
          try { Fields["Psy - Ryd"].click(); } catch (e) {}
          try {Wait.forField(Fields["Psyk - besoegstabel"], 10); } catch (e) {} 
        }  
      }
    } else  {
      /* If patient is in a group */
      
      if (patientsAndGroups.rows[i][kNavn] === groupname)
      {
        try {   
          /* Open group */
          Fields["Psyk - besoegstabel"].doubleClickCell("<<"+patientsAndGroups.rows[i][kNavn]+">>",kNavn);
          /* Read group table */
          Wait.forField(Fields["Psyk - gruppe patient tabel"], 30);
          var group = Fields["Psyk - gruppe patient tabel"].inspect();
          
          /* Loop through table to search for patient */
          for (var j=0; j<group.rows.length; j++) 
          { 
            if (group.rows[j][kCpr] === patientid) 
            {            
              var splitstr = group.rows[j]["Dato og tid"].split(" ");
              var gtid = splitstr[1].replace("<colon>", ":"); /* Cut dato ud af tid */
              if (gtid !== ptid) 
              {
                PtFoundDiffTime = true;
                if (group.rows[j][kStatus] !== ankommet) PtArrived = false; 
              } else               
              {                 
                /* Select patient */
                Fields["Psyk - gruppe patient tabel"].doubleClickCell(group.rows[j][kNavn],kNavn);
                /* Workaround for doubleclick. Check if the doubleclick worked */
                try {
                  Wait.forField(Fields["Psy - Gem"], 6);
                } catch (e) {
                  err = "DoubleClickfailed";
                  Log.warn('PsykiatriWarn', err);
                  throw err;
                }
                if (notify) Notification.show('Patient fundet', group.rows[j][kCpr], '', {timeout: 15});
                
                /* Patient found - set flag to stop further loops */
                patientFound = true;
                j = group.rows.length;
                i = patientsAndGroups.rows.length;
                
                /* SAVE besøgsregistrering */
                try {
                  if (group.rows[j][kStatus] === booket) /* If anything else but booket then dont save, just return ok */
                    var gemresult = gem();
                } catch (e) {
                  errmsg = e.message || e;
                  throw errmsg; 
                }              
              } /* Patient found with correct time in group */
            } /* End of patient found in group*/
          } /* End of loop through group */ 
          
          /* Clean up from the Cosmic group page and go back to besøgsliste */
          if (patientFound) {
            try { Fields["Ryd CPR"].click(); } catch (e) {}
            try { Fields["Psy - Ryd"].click(); } catch (e) {}
          }
          try { 
            Fields["Psyk - gruppe tab"].select("P"); } catch (e) {Log.warn('Fejl i select P.');
          }
          try { Wait.forField(Fields["Psyk - besoegstabel"], 10); } catch (e) {}
          Wait.forSeconds(3);
          
        } catch (e) {
          var err = e;
          if (err === "") err = "Kunne ikke læse tabel med gruppe";
          if (debug) Dialog.info(err, e, {  });
          throw err;
        }  /* End of double click on group */
      } /* End of group in Besøgslisten*/
    }
 /* End of loop through Besøgslisten */

/* Return error message if patient found with another booking time that was not registered "arrived" */

  if (!patientFound && PtFoundDiffTime && !PtArrived)
  {
    errmsg = andentid + ptid + ".";
    if (debug) Dialog.info(errmsg, "", {  });
    Log.warn('PsykiatriWarn',err);
    throw errmsg;  
  } 
  
} catch (e) {
  var err = e;
  if (err === "") { err = "Besøgstabel kunne ikke læses.";}
  Log.warn('PsykiatriWarn',err);
  if (debug) Dialog.info(err, e, {  });
  throw err;
}

var logtid = Timer.stop('Flow');
Log.info('Psykiatri','Flow time' + logtid);
if (notify) Notification.show('Flow time', 'Flow time' , logtid, {timeout: 15});
  