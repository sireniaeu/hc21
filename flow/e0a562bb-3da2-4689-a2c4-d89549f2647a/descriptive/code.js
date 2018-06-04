/* This flow retry the Ankomst Psyk v1 flow a number of time due to periodic errors in executiin in Cosmic  */
var Lpatientid = Inputs['[eu.sirenia]Action.In.PsykAR.Cpr'];
var Lptid = Inputs['[eu.sirenia]Action.In.PsykAR.Tid'];
var Lenhed = Inputs['[eu.sirenia]Action.In.PsykAR.Enhed'];
var Lkliniker = Inputs['[eu.sirenia]Action.In.PsykAR.Kliniker'];

var loops = 3;
for (ia=1;ia<=loops;ia++) {
  try {    
    Flow.run('Psykiatri ankomst', {'[eu.sirenia]Action.In.PsykAR.Tid': Lptid, '[eu.sirenia]Action.In.PsykAR.Cpr': Lpatientid , '[eu.sirenia]Action.In.PsykAR.Enhed': Lenhed , '[eu.sirenia]Action.In.PsykAR.Kliniker': Lkliniker });
    //Flow.run('Ankomst InMem', {'[eu.sirenia]Action.In.PsykAR.Tid': Lptid, '[eu.sirenia]Action.In.PsykAR.Cpr': Lpatientid , '[eu.sirenia]Action.In.PsykAR.Enhed': Lenhed , '[eu.sirenia]Action.In.PsykAR.Kliniker': Lkliniker });
    ia = loops; /* Execution was ok, so complete the flow */ 
  } catch(e) {
    if (e.message === 'Patient ikke fundet.' || e.message === 'Startvilkår eller anden information på aftale mangler.' || e.message.slice(0,39) === "Patient er booket til anden tid end kl.") {
      throw e.message;
    }
    if (ia === loops) {
      Log.warn('PsykiatriWarn',e.massage);
      throw e.message;
    }
    Log.warn('PsykiatriWarn',"Loop error #" + ia + " Err msg: " + e.message);
  }
}