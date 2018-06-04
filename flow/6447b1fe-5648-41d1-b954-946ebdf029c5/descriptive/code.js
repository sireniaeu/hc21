/* This flow is called from Nobly Ankomst.                                 */
/* It register the patients arrival in Cosmic i "kassen"                   */
/*                                                                         */
/* Input parameters:                                                       */
/*   Patientid: [eu.sirenia]Action.In.PsykAR.Cpr                           */
/*   Booking tid: [eu.sirenia]Action.In.PsykAR.Tid                         */

/* Test og debug settings */
var test = false;
var debug = false;
var debug2 = false;
var notify = true;
var testdato = ""; 
var testdato = "28-12-2017";
var testtid = "";
/*var testtid = "10:45"; */

/*var patientid = "270892-0UE1 *";
var patientid = "111057-0BP1 *";
var patientid = "280596-0SH0 *";
var patientid = "060398-0EE0 *";
var patientid = "051173-0SA0 *";*/

var patientid = Inputs['[eu.sirenia]Action.In.PsykAR.Cpr'];
var ptid = Inputs['[eu.sirenia]Action.In.PsykAR.Tid'];

/* Variable brugt i flow */

var errmsg = "";
var kCpr = "CPR-nr.";
var kNavn = "Navn";
var kStatus = "Status";
var kTid = "Tid";
var kStatus = "Status";

var patientFound = false;
var igruppe = false;

var stdretry = 10;
Settings.CommandRetries = stdretry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];


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
  try { Wait.forField(Fields["Psyk - besoegstabel"], 5); } catch (e) {} 
  Settings.CommandRetries = stdretry;
}

function gem() 
{
  /* Gem */
  if (test) {
    Dialog.info('Information', 'Der køres i testmode. Der gemmes ikke.', {  });
  } else {
    try {      
      Wait.forField(Fields["Psy - Gem"], 15);
      Wait.forField(Fields["Psy - Betalingsregistrering"], 15);
      Fields["Psy - Gem"].click();
      if (igruppe) {
        Wait.forSeconds(8); /* It takes time for Cosmic to register the payment and returning from a gruop to fast prevent the payment registration */
      } else {
        Wait.forSeconds(2);
      }
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
}

/* Start of flow */

cleanup();

/* Log in i kassen, hvis "Kasseadministration"-knap ikke findes,  */
var ikasse = false;
try {
  Wait.forField(Fields["Psy - Kasseadministration"], 10);
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

/* Sæt Besøgsdato til dags dato */
try {
  var da = new Date();
  var d = da.getDate();
  if (d < 10) {d = ("0" + d);} else {d = d + "";}
  var m = da.getMonth() + 1;
  if (m < 10) {m = ("0" + m);} else {m = m + "";}
  var y = da.getFullYear() + "";
  var dato = d + "-" + m + "-" + y;
 
  /* Check om der anvendes testdato */
  if (testdato !== "") dato = testdato;
  
  if (!ikasse) Wait.forSeconds(3);  
  
  /* Lokalitet skal sendes som parameter fra Nobly Ankomst */
  var lokalitet = "PSY Psykoterapeutisk Team (Odense)";
  Fields["Psy - Lokalitet2"].select("<<"+lokalitet+">>");
  
  /* Sæt dags dato */
  Fields["Psy - Dato"].click();
  Fields["Psy - Dato"].inputNative(dato);
  Fields["Psy - Opdater"].click();
  Wait.forSeconds(3);
  
} catch (e) {
  err = "Kunne ikke sætte dato eller lokalitet.";
  Log.warn('PsykiatriWarn', err);
  throw err;
}

/* Loop gennem besøgstabellen */
try {
  /* Læs besøgstabel */
  var patientsAndGroups = Fields["Psyk - besoegstabel"].inspect();
  if (debug) Dialog.info('Tabel længde', patientsAndGroups.rows.length, {  });
  if (debug) Dialog.info('Patient', patientid, {  });
  if (debug) Dialog.info('Tid', ptid, {  });
  
  
  /* Spol gennem listen af patienter */
  for (var i=0; i<patientsAndGroups.rows.length && patientFound === false; i++) 
  { 
    if (debug) Dialog.info('Patientid',patientsAndGroups.rows[i][kCpr] + "<- ->" + patientsAndGroups.rows[i][kNavn] +"<- Tid: ->" + patientsAndGroups.rows[i][kTid] + "<- Status: ->" + patientsAndGroups.rows[i][kStatus] + "<-", {  });
    
    /* Hvis enkelt-patient fundet og tid er korrekt */
    if (patientsAndGroups.rows[i][kCpr] === patientid && patientsAndGroups.rows[i][kTid] === ptid) 
    {
      /* Hvis patient allerede er registreret ankommet returneres */
      if (patientsAndGroups.rows[i][kStatus] !== "Ankommet") {
        Fields["Psyk - besoegstabel"].doubleClickCell("<<"+patientsAndGroups.rows[i][kNavn]+">>",kNavn);
        /* Workaround for doubleclick. Check if the doubleclick worked or try twice more */
        try {
          Wait.forField(Fields["Psy - Gem"], 3);
        } catch (e) {
          err = "DoubleClickfailed 1";
          Log.warn('PsykiatriWarn', err);
          Fields["Psyk - besoegstabel"].doubleClickCell("<<"+patientsAndGroups.rows[i][kNavn]+">>",kNavn);
        }
        try {
          Wait.forField(Fields["Psy - Gem"], 3);
        } catch (e) {
          err = "DoubleClickfailed 2";
          Log.warn('PsykiatriWarn', err);
          Fields["Psyk - besoegstabel"].doubleClickCell("<<"+patientsAndGroups.rows[i][kNavn]+">>",kNavn);   
        }
        try {
          Wait.forField(Fields["Psy - Gem"], 3);
        } catch (e) {
          err = "DoubleClickfailed 3";
          throw err;
        }  
        
        if (debug) Dialog.info('Patient found', patientsAndGroups.rows[i][kCpr], {  });
        
        /* GEM */
        try {
          var gemresult = gem();
        } catch (e) {
          errmsg = e.message || e;
          throw errmsg; 
        }
        if (notify) Notification.show('Patient fundet', patientsAndGroups.rows[i][kCpr], '', {timeout: 60});
      }  
      /* Stop videresøgning */
      patientFound = true;

      /* Ryd op og gå tilbage til besøgsliste */
      try { Fields["Ryd CPR"].click(); } catch (e) {/* Fjern fejl hvis CPR knap ikke findes */}
      try { Fields["Psy - Ryd"].click(); } catch (e) {/* Fjern fejl hvis CPR knap ikke findes */}
      try { Wait.forField(Fields["Psyk - besoegstabel"], 10); } catch (e) {/* Fjern fejl hvis CPR knap ikke findes */} 
    }
    
    /* Hvis gruppe */
    
    if (patientsAndGroups.rows[i][kCpr] === "" && patientFound === false)
    {
      if (debug) Dialog.info('I group', patientsAndGroups.rows[i][kTid] + " " + ptid, {  });
      if (debug) Dialog.info('', 'Gruppenavn ->' + patientsAndGroups.rows[i]["Navn"] + "<- ", {  });
      
      igruppe = true;
      try {   
        /* Open group */
        Fields["Psyk - besoegstabel"].doubleClickCell("<<"+patientsAndGroups.rows[i][kNavn]+">>",kNavn);

        /* Læs gruppetabel */
        Wait.forField(Fields["Psyk - gruppe patient tabel"], 10);
        var group = Fields["Psyk - gruppe patient tabel"].inspect();
        if (debug) Dialog.info('INSPECT', group.rows.length, {  });
        
        /* Søg efter patient i gruppe */
        for (var j=0; j<group.rows.length; j++) { 
          if (debug) Dialog.info('CPR', group.rows[j][kCpr], {  });
          
          var splitstr = group.rows[j]["Dato og tid"].split(" ");
          var gtid = splitstr[1];
      
          if (group.rows[j][kCpr] === patientid && gtid === ptid) 
          {
            /* Patient fundet - vælg patient */
            if (debug) Dialog.info('', 'Tid på patient i gruppe:' + gtid + ' Patienttid: ' + ptid, {  });
            
            if (group.rows[j][kStatus] !== "Ankommet") { 
              Fields["Psyk - gruppe patient tabel"].doubleClickCell(group.rows[j][kNavn],kNavn);
              
              /* Workaround for doubleclick. Check if the doubleclick worked or try twice more */
              try {
                Wait.forField(Fields["Psy - Gem"], 3);
              } catch (e) {
                err = "DoubleClickfailed 1";
                Log.warn('PsykiatriWarn', err);
                Fields["Psyk - gruppe patient tabel"].doubleClickCell(group.rows[j][kNavn],kNavn);
              }
              try {
                Wait.forField(Fields["Psy - Gem"], 3);
              } catch (e) {
                err = "DoubleClickfailed 2";
                Log.warn('PsykiatriWarn', err);
                Fields["Psyk - gruppe patient tabel"].doubleClickCell(group.rows[j][kNavn],kNavn);
              }
              try {
                Wait.forField(Fields["Psy - Gem"], 3);
              } catch (e) {
                err = "DoubleClickfailed 3";
                throw err;
              }
              
              if (debug) Dialog.info('Patient found', group.rows[j][kCpr], {  });
              if (notify) Notification.show('Patient fundet', group.rows[j][kCpr], '', {timeout: 15});
              
              /* Gem besøgsregistrering */
              try {
                igruppe = true;
                var gemresult = gem();
              } catch (e) {
                errmsg = e.message || e;
                throw errmsg; 
              }
            }
                       
            /* Stop videre søgning */
            patientFound = true;
            j = group.rows.length;
            i = patientsAndGroups.rows.length;
          }
        }
        
        /* Gå tilbage til besøgsliste */
        if (debug) Dialog.info('Efter search i gruppe', "", {  });
        if (patientFound) {
          try { Fields["Ryd CPR"].click(); } catch (e) {}
          try { Fields["Psy - Ryd"].click(); } catch (e) {}
        }
        
        try { var result = Fields["Psyk - gruppe tab"].select("P"); } catch (e) {
          if (debug) Dialog.warn('Fejl i select P', 'text', { });
        }
        try { Wait.forField(Fields["Psyk - besoegstabel"], 10); } catch (e) {}
        Wait.forSeconds(3);
      } catch (e) {
        var err = e;
        if (err === "") err = "Kunne ikke læse tabel med gruppe";
        if (debug) Dialog.info(err, e, {  });
        throw err;
      }
    } /* Slut på gruppe */
  
  }
  
  if (patientFound !== true) 
  {
    errmsg = "Patient ikke fundet.";
    if (debug) Dialog.info(errmsg, "", {  });
    throw errmsg;  
  }
  
} catch (e) {
  var err = e;
  if (err === "") { err = "Besøgstabel kunne ikke læses.";}
  Log.warn('PsykiatriWarn',err);
  if (debug) Dialog.info(err, e, {  });
  throw err;
}