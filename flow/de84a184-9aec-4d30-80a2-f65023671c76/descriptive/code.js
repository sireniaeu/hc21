// Auto update ”ASA og NSAID” Cave

Settings.CommandRetries = 7;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var flowname = "ASA / NSAID";

try {
  Flow.run("Cave function - Initiation", {Prep: flowname});}
catch (e)
{
  throw "Flow standses.";
}
  
var ErrMsg = "";
var Err = 0;

var medications = [ 
  {Middel: "Hjertemagnyl", ATC: "B01AC06", ATCshort: "B01AC", Mtype: "Substans"},
  {Middel: "Treo", ATC: "xN02BA51", ATCshort: "xN02BA", Mtype: "Substans"},
  {Middel: "Kodimagnyl", ATC: "N02AJ07", ATCshort: "N02AJ", Mtype: "Substans"},
  {Middel: "Asasantin", ATC: "B01AC30", ATCshort: "B01AC", Mtype: "Substans"},
  {Middel: "Ibuprofen", ATC: "M01AE01", ATCshort: "M01AE", Mtype: "Farmakologisk gruppe"},
  {Middel: "Magnyl", ATC: "N02BA01", ATCshort: "N02BA", Mtype: "Substans"},
  {Middel: "Diclofenac", ATC: "S01BC03", ATCshort: "S01BC", Mtype: "Kemisk gruppe"},
  {Middel: "Diclofenac", ATC: "M02AA15", ATCshort: "M02AA", Mtype: "Kemisk gruppe"},
  {Middel: "Zyx", ATC: "xA01AD02", ATCshort: "xA01AD", Mtype: "Kemisk gruppe"}
];

for (var i = 0; i < medications.length; i++) {
  var r = Flow.run("Cave function - Update medication", medications[i]);
	if (r.result != "0") {
	//Log.warn(flowname,"Error in Update medication: " + medications[i].Middel + " " + medications[i].ATC);
    ErrMsg = ErrMsg + "\n" + r.result;
	Err = 1;
	}
}

Flow.run("Cave function - Completion", {IErr: Err, IErrMsg: ErrMsg});