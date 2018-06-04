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
/*var testdato = "07-01-2018";*/
var testtid = "";
/*var testtid = "10:45"; */
var timelog = false;

/* Variables used in flow */

var errmsg = "";
var kCpr = "CPR-nr.";
var kNavn = "Navn";
var kStatus = "Status";
var kTid = "Tid";
var kKliniker = "Kliniker";
var kStatus = "Status";

/* Status codes */
var booket = "154";
var ankommet = "165";
var igang = "151";
var udfoert = "155";
var makuleret = "160";

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
  Settings.CommandRetries = 1;
  try { Fields["Cave - Annullér knap"].click(); } catch (e) {}
  try { Fields["Cave - OK knap"].click(); } catch (e) {}
  Settings.CommandRetries = 6;
  try { Fields["Psy - Besøgsregistrering"].click(); } catch (e) {}
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
    /* If the patient has more than one bookings at the same day a dialogue will appear. This dialogue is closed */
    windowIsShown = Window.withTitleShown("Åbn besøg"); 
    if (windowIsShown) {
      Fields["Cave - Annullér knap"].click();
    }
    
    /* Check that selected patient is the right patient id */
    var ptread = Fields["Patientlinje - CPR"].read();
    if (ptread !== patientid) {
      Fields["Psy - Opdater"].click();
      throw "Patient-id forskellig fra valgt patient.";
    }
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
    if (timelog) Timer.log('PsykFlowTimer', 'Slut gem');
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
    Wait.forField(Fields['Ryd CPR'], 5);
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

function mapenhed(enhed) {
  var cosmicenhed = '';
  switch (enhed) {
    case "Affektivt Team": cosmicenhed = "PSY Affektivt Team (Odense)"; break;
    case "Akutteam for Demente": cosmicenhed = "PSY Akutteam for Demente (Odense)"; break;
    case "Almen Psykiatrisk Team": cosmicenhed = "PSY Almen Psykiatrisk Team (Odense)"; break;
    case "ATT": cosmicenhed = ""; break;
    case "Gerontopsykiatrisk Team": cosmicenhed = "PSY Gerontopsykiatrisk Team (Odense)"; break;
    case "Mobilteam": cosmicenhed = "PSY Mobilteam (Odense)"; break;
    case "Oligofrenipsykiatrisk Team": cosmicenhed = "PSY Oligofrenipsykiatrisk Team (Odense"; break;
    case "Opsøgende Psykoseteam": cosmicenhed = "PSY Opsøgende Psykoseteam (Odense)"; break;
    case "OPUS": cosmicenhed = "PSY OPUS (Odense)";      break;
    case "Psykoterapeutisk Team": cosmicenhed = "PSY Psykoterapeutisk Team (Odense)"; break;
    case "Team 1": cosmicenhed = ""; break;
    case "Team 2": cosmicenhed = ""; break;
    case "Team 3": cosmicenhed = ""; break;
    case "Team for Selvmordsforebyggelse": cosmicenhed = "PSY Team for Selvmordsforebyggelse (Odense)"; break;
    case "Team for Tjenesterelateret PTSD": cosmicenhed = "PSY Team for Tjenesterelateret PTSD (Odense)"; break;
    case "Udredningsteam": cosmicenhed = "PSY Udredningsteam (Odense)"; break;
  }
  return cosmicenhed;
}
//"PSY Psykiatrisk Akutmodtagelse (Odense)"
//"PSY Psykiatrisk amb. (Odense)"


/**************************************************/
/*                Start of flow                   */
/**************************************************/
Timer.start('PsykFlowTimer');
if (timelog) Timer.log('PsykFlowTimer', 'Start');

//Dialog.info('Params', patientid + ' ' + ptid + ' ' + pkliniker + ' ' + penhed, { });
if (notify) Notification.show('Kaldt med', patientid.slice(0,6) + ' ' + ptid, pkliniker + ' ' + penhed, {timeout: 30});
Log.warn('Psykiatri','Pt: ' + patientid.slice(0,6) + ' Tid: ' + ptid + ' Kliniker: ' + pkliniker + ' Enhed: ' + penhed);

try {
  LoginCosmic();
} catch (e) {} /* Do not return error in this 1st login attempt. */
if (timelog) Timer.log('PsykFlowTimer', 'After 1st login');
/* Call the cleanup function to clean up if Cosmic is in a wrong state */
cleanup();
if (timelog) Timer.log('PsykFlowTimer', 'After cleanup');
try {
  LoginCosmic();
} catch (e) {
  errmsg = e.message || e;
  Log.warn('PsykiatriWarn',errmsg);
  if (debug) Dialog.info("Login error", errmsg, {  });
  throw errmsg;
}

if (timelog) Timer.log('PsykFlowTimer', 'After 2nd login');

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
  } catch (e) {
    err = "Kunne ikke logge ind i kassen.";
    Log.warn('PsykiatriWarn', err);
    throw err;
  }
}

if (timelog) Timer.log('PsykFlowTimer', 'After Kasseadm');
/* Get date and time */
try {
  var da = new Date();
  var d = da.getDate();
  if (d < 10) {d = ("0" + d);} else {d = d + "";}
  var m = da.getMonth() + 1;
  if (m < 10) {m = ("0" + m);} else {m = m + "";}
  var y = da.getFullYear() + "";  var dato = d + "-" + m + "-" + y;

  /* Check for test date */
  if (testdato !== "") dato = testdato;
  
  /* If Cosmic was not already logged into "kassen" then wait for Cosmic to finish loggin into "kassen" */
  if (!ikasse) Wait.forSeconds(8);
  
  if (timelog) Timer.log('PsykFlowTimer', 'After lokalitet');
  if (true) lokalitet = "(Alle i udvalg)";
  var lres = Fields["Psy - Lokalitet2"].read();
  if (lres !== lokalitet) {
    Fields["Psy - Lokalitet2"].select("<<"+lokalitet+">>");
  }
  if (timelog) Timer.log('PsykFlowTimer', 'After lokalitet');
  
  /* Set today */
  var dres = Fields["Psy - Dato"].read();
  if (dres !== dato) {
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

if (timelog) Timer.log('PsykFlowTimer', 'Start loop');
/* Loop through "besøgstabellen" */
try {
  /* Read "besøgstabel" */
  
  var patientsAndGroups = Fields["Psyk - besoegstabel"].inspect();
  if (debug) Dialog.info('Tabel længde', patientsAndGroups.rows.length, {  });
  if (debug) Dialog.info('Søgt patient og tid', 'Patient ' + patientid + 'Tid ' + ptid, {  });
  
  
  /* Loop through list of patients and groups */
  for (var i=0; i<patientsAndGroups.rows.length && patientFound === false; i++) 
  { 
    if (debug) Dialog.ifo('Patientid: ->',patientsAndGroups.rows[i][kCpr] + "<- ->" + patientsAndGroups.rows[i][kNavn] +"<- Tid: ->" + patientsAndGroups.rows[i][kTid] + "<- Status: ->" + patientsAndGroups.rows[i][kStatus] + "<-", {  });
    /* If patient (not group) is found */
    if (patientsAndGroups.rows[i][kCpr] === patientid)
    {
      if (timelog) Timer.log('PsykFlowTimer', 'Patient found');
      if (patientsAndGroups.rows[i][kTid].replace("<colon>", ":") !== ptid) 
      {
        /* 
        Patient id found, CosmicTid is different from NoblyTid. 
        Can happend if eg. the connection btw Nobly Ankomst and Cosmic has been down and the user therefore has done manual registrations in Cosmic.
        The patient can have than one bookings. Only if all the patients bookings are marked as arrived (ankommet) "OK. Patient allerede registreret" is returned.
        Otherwise and error an this messages is returned: "Ikke-OK. Patient er booket til andet tidspunkt end kl. ”Nobly tid”. */
        
        PtFoundDiffTime = true;
        if (patientsAndGroups.rows[i][kStatus] !== ankommet) PtArrived = false; 
      } else {
        /* Patient found. Time correct */
        Fields["Psyk - besoegstabel"].doubleClickCell("<<"+patientsAndGroups.rows[i][kNavn]+">>",kNavn);
        /* Workaround for doubleclick issue. Check if the doubleclick worked */
        try {
          Wait.forField(Fields["Psy - Gem"], 3);
        } catch (e) {
          err = "DoubleClickfailed";
          Log.warn('PsykiatriWarn', err);
          throw err;
        }
        
        if (debug) Dialog.info('Patient found: ', patientsAndGroups.rows[i][kCpr], {  });
        /* SAVE */
        try {
          if (patientsAndGroups.rows[i][kStatus] === booket) /* If anything else but booket then dont save, just return ok */
            var gemresult = gem();
        } catch (e) {
          errmsg = e.message || e;
          throw errmsg; 
        }
        if (notify) Notification.show('Patient fundet',  'Patient gemt', patientsAndGroups.rows[i][kCpr].slice(0,6), {timeout: 15});
      
        /* Stop further loops */
        patientFound = true;
        /* Clean up and go back to "besøgsliste" */
        try { Fields["Ryd CPR"].click(); } catch (e) {}
        try { Fields["Psy - Ryd"].click(); } catch (e) {}
        try { Wait.forField(Fields["Psyk - besoegstabel"], 10); } catch (e) {} 
      }  
    }
    
    /* If the row is a group */
    
    if (patientsAndGroups.rows[i][kCpr] === "" && (patientsAndGroups.rows[i][kKliniker] === pkliniker || pkliniker === "Ukendt enhed") && patientFound === false)
    {
      if (debug) Dialog.info('I gruppe. ', 'Gruppetid: ' + patientsAndGroups.rows[i][kTid] + " Patienttid: " + ptid + 'Gruppenavn ->' + patientsAndGroups.rows[i]["Navn"] + "<- ", {  });
      if (timelog) Timer.log('PsykFlowTimer', 'Group found');
      
      try {   
        /* Open group */
        Fields["Psyk - besoegstabel"].doubleClickCell("<<"+patientsAndGroups.rows[i][kNavn]+">>",kNavn);
        /* Read group table */
        Wait.forField(Fields["Psyk - gruppe patient tabel"], 30);
        var group = Fields["Psyk - gruppe patient tabel"].inspect();
        if (debug) Dialog.info('Gruppelængde: ', group.rows.length, {  });
        
        /* Loop through table to search for patient */
        for (var j=0; j<group.rows.length; j++) 
        { 
          if (debug) Dialog.info('CPR', group.rows[j][kCpr], {  });
          if (group.rows[j][kCpr] === patientid) 
          {            
            var splitstr = group.rows[j]["Dato og tid"].split(" ");
            var gtid = splitstr[1].replace("<colon>", ":"); /* Cut dato ud af tid */
            if (gtid !== ptid) 
            {
              PtFoundDiffTime = true;
              if (group.rows[j][kStatus] !== ankommet) PtArrived = false; 
            } else { 
             
              /* Select patient */
              Fields["Psyk - gruppe patient tabel"].doubleClickCell(group.rows[j][kNavn],kNavn);
              /* Workaround for doubleclick. Check if the doubleclick worked */
              try {
                Wait.forField(Fields["Psy - Gem"], 3);
              } catch (e) {
                err = "DoubleClickfailed";
                Log.warn('PsykiatriWarn', err);
                throw err;
              }
              if (debug) Dialog.info('Patient found', group.rows[j][kCpr], {  });
              if (notify) Notification.show('Patient fundet', 'Patient gemt', group.rows[j][kCpr].slice(0,6), {timeout: 15});
              
              /* Patient found - set flag to stop further loops */
              patientFound = true;
              j = group.rows.length;
              i = patientsAndGroups.rows.length;
              
              /* SAVE besøgsregistrering */
              try {
                ingroup = true;
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
        if (debug) Dialog.info('Efter search i gruppe', "", {  });
        if (patientFound) {
          try { Fields["Ryd CPR"].click(); } catch (e) {}
          try { Fields["Psy - Ryd"].click(); } catch (e) {}
        }
        if (timelog) Timer.log('PsykFlowTimer', 'Clean group #1');
        try { var result = Fields["Psyk - gruppe tab"].select("P"); } catch (e) {
          if (debug) Dialog.warn('Fejl i select P', 'text', { });
        }
        try { Wait.forField(Fields["Psyk - besoegstabel"], 10); } catch (e) {}
        Wait.forSeconds(3);
        if (timelog) Timer.log('PsykFlowTimer', 'Clean group #2');
      } catch (e) {
        var err = e;
        if (err === "") err = "Kunne ikke læse tabel med gruppe";
        if (debug) Dialog.info(err, e, {  });
        throw err;
      }  /* End of double click on group */
    } /* End of group in Besøgslisten*/
  
  } /* End of loop through Besøgslisten */
  if (debug) Dialog.warn('Efter loop.', 'patientFound ' + patientFound + ' PtFoundDiffTime '+ PtFoundDiffTime, { });
  /* Return error message if patient is not found or patient found with another booking time that was not registered "arrived" */
  
  if (timelog) Timer.log('PsykFlowTimer', 'Save etc done');
  
  if (!patientFound && !PtFoundDiffTime)   
  {
    errmsg = "Patient ikke fundet.";
    if (debug) Dialog.info(errmsg, "", {  });
    var logtid = Timer.stop('PsykFlowTimer');
    Log.warn('PsykiatriWarn','Flowtid: ' + logtid);
    throw errmsg;  
  }

  if (!patientFound && PtFoundDiffTime && !PtArrived)
  {
    errmsg = "Patient er booket til anden tid end kl. " + ptid + ".";
    if (debug) Dialog.info(errmsg, "", {  });
    Log.warn('PsykiatriWarn',err);
    throw errmsg;  
  } 
 // if (notify) Notification.show('Patient fundet', 'patientFound: ' + patientFound + '\nPtFoundDiffTime: ' + PtFoundDiffTime + '\nPtArrived:' + PtArrived, {timeout: 15});  

} catch (e) {
  var err = e;
  if (err === "") { err = "Besøgstabel kunne ikke læses.";}
  Log.warn('PsykiatriWarn',err);
  try { Fields["Ryd CPR"].click(); } catch (e) {}
  try { Fields["Psy - Ryd"].click(); } catch (e) {}
  try { Fields["Psy - Opdater"].click(); } catch (e) {}
  Settings.CommandRetries = 1;
  /* Close Cosmic if crashed */
  try { Fields["Cave - Annullér knap"].click(); } catch (e) {}
  try { Fields["Cave - OK knap"].click(); } catch (e) {}
  Settings.CommandRetries = stdretry;
  Wait.forSeconds(1);
  if (debug) Dialog.info(err, e, {  });
  throw err;
}

var logtid = Timer.stop('PsykFlowTimer');
Log.warn('Psykiatri','Flowtid: ' + logtid);
