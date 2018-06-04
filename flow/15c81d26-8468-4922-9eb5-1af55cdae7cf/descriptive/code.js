//*********************************************//
//*** Input types of standard subscriptions ***//
//*********************************************//

var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

//***  'skabelonname' must be written exactly as the 'Skabelonnavn' is in Cosmic ***//
var grupper = ["Steroid og/eller antibiotika","Tryksænkende dråber + Diamox","Øvrige"];
//var grupper = ["Steroid og/eller antibiotika","Tryksænkende dråber + Diamox","Øvrige","Ordination - recept - seponering"];
var medicinskabelongrp0 = {
  "Maxidex x 3 o.dx. efter kat.                 " : {skabelonname: "Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt efter kat.operation i højre øje i 3 uger"},
  "Maxidex x 3 o.sin. efter kat.                " : {skabelonname: "Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt efter kat.operation i venstre øje i 3 uger"},
  "Maxidex x 3 o.dx. + o.sin. efter kat.        " : {skabelonname: "Maxidex x 3 o.u. efter kat."},
  "Tobradex x 3 o.dx. i 3 uger efter vitrektomi " : {skabelonname: "Tobradex øjendrb. 1+3 mg/ml 1 dråbe 3 gange dagligt i højre øje efter glaslegemeopr. i 3 uger"},
  "Tobradex x 3 o.sin. i 3 uger efter vitrektomi" : {skabelonname: "Tobradex øjendrb. 1+3 mg/ml 1 dråbe 3 gange dagligt i venstre øje efter glaslegemeopr. i 3 uger"},
  "Tobrex Depot x 2 o.dx. i 4 dage              " : {skabelonname: "Tobrex Depot (=Tobramycin) depotøjendrb. 3  mg/ml 1 dråbe 2 gange dagligt i højre øje i 4 dage"},
  "Tobrex Depot x 2 o.sin. i 4 dage             " : {skabelonname: "Tobrex Depot (=Tobramycin) depotøjendrb. 3  mg/ml 1 dråbe 2 gange dagligt i venstre øje i 4 dage"}
};
var medicinskabelongrp1 = {
  "Azopt x 2 o.dx.                              " : {skabelonname: "Azopt øjendrb 10 mg/ml 1 dråbe 2 gange dagligt i højre øje"},
  "Azopt x 2 o.sin.                             " : {skabelonname: "Azopt øjendrb 10 mg/ml 1 dråbe 2 gange dagligt i venstre øje"},
  "Azopt x 2 o.u.                               " : {skabelonname: "Azopt øjendrb. 10  mg/ml 1 dråbe 2 gange dagligt i begge øjne"},
  "Cosopt x 2 o.dx.                             " : {skabelonname: "Dorzolamid/Timolol (=Cosopt,Costad) øjendrb 5+20 mg/ml 1 dråbe 2 gange dagligt i højre øje"},
  "Cosopt x 2 o.sin.                            " : {skabelonname: "Dorzolamid/Timolol (=Cosopt,Costad) øjendrb 5+20 mg/ml 1 dråbe 2 gange dagligt i venstre øje"},
  "Cosopt x 2 o.u.                              " : {skabelonname: "Dorzolamid/Timolol (=Cosopt,Costad) øjendrb.  5+20 mg/ml 1 dråbe 2 gange dagligt i begge øjne"},
  "Cosopt ukons. x 2 o.dx.                      " : {skabelonname: "Cosopt Ukons. øjendrb. endos.   5+20 mg/ml 1 dråbe 2 gange dagligt i højre øje"},
  "Cosopt ukons. x 2 o.sin.                     " : {skabelonname: "Cosopt Ukons. øjendrb. endos.   5+20 mg/ml 1 dråbe 2 gange dagligt i venstre øje"},
  "Cosopt ukons. x 2 o.u.                       " : {skabelonname: "Cosopt Ukons. øjendrb.,opl.,endos.   5+20 mg/ml 1 dråbe 2 gange dagligt  i begge øjne"},
  "Iopidine 5% x 3 o.dx. i 3 uger               " : {skabelonname: "Iopidine øjendrb.  5  mg/ml 1 dråbe 3 gange dagligt i højre øje i 3 uger"},
  "Iopidine 5% x 3 o.sin. i 3 uger              " : {skabelonname: "Iopidine øjendrb.  5  mg/ml 1 dråbe 3 gange dagligt i venstre øje i 3 uger"},
  "Iopidine 5% x 3 o.u. i 3 uger                " : {skabelonname: "Iopidine øjendrb. 5  mg/ml 1 dråbe 3 gange dagligt i begge øjne i 3 uger"},
  "Timosan Depot x 2 o.dx.                      " : {skabelonname: "Timosan Depot (=Timogel) øjengel 1  mg/g 1 dråbe til morgen i højre øje"},
  "Timosan Depot x 2 o.sin.                     " : {skabelonname: "Timosan Depot (=Timogel) øjengel 1  mg/g 1 dråbe til morgen i venstre øje"},
  "Timosan Depot x 2 o.u.                       " : {skabelonname: "Timosan Depot (=Timogel) øjengel 1  mg/g 1 dråbe til morgen i begge øjne"}
};
var medicinskabelongrp2 = {
//  "Nevanac x 4 o.dx. i 6 uger                   " : {skabelonname: ""},
//  "Nevanac x 4 o.sin. i 6 uger                  " : {skabelonname: ""},
//  "Nevanac x 4 o.u. i 6 uger                    " : {skabelonname: ""},
//  "Opatanol x 2 o.dx.                           " : {skabelonname: "Opatanol øjendrb. 1  mg/ml 1 dråbe 2 gange dagligt i højre øje"},
//  "Opatanol x 2 o.sin.                          " : {skabelonname: "Opatanol øjendrb. 1  mg/ml 1 dråbe 2 gange dagligt i venstre øje"},
//  "Opatanol x 2 o.u.                            " : {skabelonname: "Opatanol øjendrb. 1  mg/ml 1 dråbe 2 gange dagligt i begge øjne"},
  "SMILE-pakke                                  " : {skabelonname: "SMILE-pakke"}
//  "Viscotears PN OU                             " : {skabelonname: "Viscotears Ukons. øjengel, endosisbeh. 2  mg/g 1 dråbe PN i begge øjne"}
};
var medicinskabelongrp3 = {
  "Maxidex x 3 o.dx. + o.sin. efter kat.        " : {skabelonname: "Maxidex x 3 o.u. efter kat."}
//  "Viscotears PN OU                             " : {skabelonname: "Viscotears Ukons. øjengel, endosisbeh. 2  mg/g 1 dråbe PN i begge øjne"}
};
var skabelon1;
var atc = 0;

//*****************************************//
//*** Test to see if FMK login is valid ***//
//*****************************************//

Settings.CommandRetries = 4;
  try
{
Fields["FMK - Ordinationsliste FMK kan ikke hentes"].click();
Dialog.warn("Log på FMK", "Flow afsluttes", { 'timeout': 10 });
 }
 catch (e) 
  { 

try {  

//*** ordination = false means that flow is not called from another flow with a prescribtion included ***//  
if (ordination === "False")
{    
//*******************************************************************//
//*** Create menu for selection of standard subscriptions         ***//
//*******************************************************************//
  var w = true;
  while (w) {
      var Standard = Dialog.input("Region Syddanmark - OUH Øjenafdeling E", "Standard ordinationer", 
                                  {maxDialogWidth: 410, buttons: [{ 'value': 'Cancel', 'isCancel': true }, {'value': 'Ok'}], 
                                   'submitOnValidation': false,
  //                                 "eye": {"type": "RADIO", 
  //                                               "prompt": "Vælg øje",
  //                                               "selectBetween": eyes,
  //                                               "validation": {'isRequired': true, 'message': "Vælg øje"}},
                                   "gruppe": {"type": "RADIO", 
                                                 "prompt": "Vælg gruppe",
                                                 "value": grupper[0], 
                                                 "selectBetween": grupper},
                                   "skabeloner0": {"type": "RADIO", 
                                                 "prompt": "Vælg ordination", 
                                                 "selectBetween": Object.keys(medicinskabelongrp0), "dependsOn": "gruppe=Steroid og/eller antibiotika"},
                                   "skabeloner1": {"type": "RADIO", 
                                                 "prompt": "Vælg ordination", 
                                                 "selectBetween": Object.keys(medicinskabelongrp1), "dependsOn": "gruppe=Tryksænkende dråber + Diamox"},
                                   "skabeloner2": {"type": "RADIO", 
                                                 "prompt": "Vælg ordination", 
                                                 "selectBetween": Object.keys(medicinskabelongrp2), "dependsOn": "gruppe=Øvrige"},
                                   "skabeloner3": {"type": "RADIO", 
                                                 "prompt": "Vælg ordination", 
                                                 "selectBetween": Object.keys(medicinskabelongrp3), "dependsOn": "gruppe=Ordination - recept - seponering"}
                                  } );
    w = false; 
  }

//******************************//
//*** Subscription procedure ***//
//******************************//
	if (Standard.gruppe === grupper[0])
	{
	skabelon1 = medicinskabelongrp0[Standard.skabeloner0].skabelonname;
	}
	if (Standard.gruppe === grupper[1])
	{
	skabelon1 = medicinskabelongrp1[Standard.skabeloner1].skabelonname;
	}
	if (Standard.gruppe === grupper[2])
	{
	skabelon1 = medicinskabelongrp2[Standard.skabeloner2].skabelonname;
	}
	if (Standard.gruppe === grupper[3])
	{
	skabelon1 = medicinskabelongrp3[Standard.skabeloner3].skabelonname;
	}
}
//*** If flow is run with a specific subscription (ordination) from another flow ***//  
else
{
  skabelon1 = ordination;
}  
  
//*** Check for subscription bundles ***//
 
if (skabelon1 === "Maxidex x 3 o.u. efter kat.")
	{
    var eyes = "ou";  
    Flow.run('Ordinationspakke E - Katarakt', {fmk1: fmk, eye1: eyes} );
	}
else if (skabelon1 === "SMILE-pakke")
	{
	Flow.run('Ordinationspakke E - SMILE', {fmk1: fmk} );
	}
else
//*** Single subscription ***//
{
if (fmk === "True")
{  
Fields["FMK - Ny ordination i FMK"].click();
}
else
{
Fields["FMK - Ny ordination i Cosmic"].click();
}
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Søgefelt"].input(skabelon1);
Fields["FMK - Ny FMK ordination - Søgefelt"].inputNativeAsync("<enter>");
Wait.forField(Fields["FMK - Søgeresultater - Filtrering"], 10);
Fields["FMK - Søgeresultater - Table"].select(".*");
Fields["FMK - Søgeresultater - Ok button"].click();
if (fmk === "True")
{  
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Signer"].click();
Settings.CommandRetries = 5;
  try
{
Wait.forField(Fields["FMK - Advarsel - Samme ATC i FMK"], 10);
atc = 1;
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
}  
catch (e)
{}
Settings.CommandRetries = StdRetry;
}
else
{  
Settings.CommandRetries = 5;
try
{
Wait.forField(Fields["FMK - Advarsel - Samme ATC i Cosmic"], 10);
atc = 1;
Fields["FMK - Advarsel - Fortsæt"].click();
}  
catch (e)
{}  
Settings.CommandRetries = StdRetry;
//Dialog.info("Pause", "pause", { timeout: 7 });
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
//var enhed = Fields["FMK - Ny FMK ordination - Enhed"].read();
//Dialog.info("Pause", enhed, {});
//if (enhed === "<Vælg>")
//{
//Fields["FMK - Ny FMK ordination - Enhed"].select(".*OUH Øjenambulatorium E (Odense).*");  
//}
Fields["FMK - Ny FMK ordination - Signer"].click();
}  
}
if (atc === 1)
{
Dialog.info("Opmærksomhed", "Ordination gennemført, men der var i forvejen én eller flere ordinationer i FMK med samme ATC-kode.", {});
}  
} catch (e) {
// *** Catch User cancel  ***/
}
}