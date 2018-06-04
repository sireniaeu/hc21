//*********************************************//
//*** Input types of standard subscriptions ***//
//*********************************************//

var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

//***  'skabelonname' must be written exactly as the 'Skabelonnavn' is in Cosmic ***//
var eyes = ["o.dx.","o.u.","o.sin."];
//var grupper = ["Steroid og/eller antibiotika","Tryksænkende dråber + Diamox","Øvrige"];
var grupper = ["Steroid og/eller antibiotika","Tryksænkende dråber + Diamox","Øvrige","Ordinationspakker"];
var medicinskabelongrp0 = {
  "Maxidex x 3                                  " : {skabelonname: "Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt i begge øjne"},
  "Maxidex x 6                                  " : {skabelonname: "Maxidex øjendrb. 1 mg/ml 1 dråbe 6 gange dagligt i begge øjne"},
  "Maxidex x 3 i 3 uger efter katarakt op.      " : {skabelonname: "Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt efter kat.operation i højre øje i 3 uger"},
  "Monopex ukons. x 3                           " : {skabelonname: "Monopex Ukons.øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt i begge øjne"},
  "Monopex ukons. x 6                           " : {skabelonname: "Monopex Ukons.øjendrb. 1 mg/ml 1 dråbe 6 gange dagligt i begge øjne"},
  "Spersadex Comp. x 4                          " : {skabelonname: "Spersadex Comp. øjendrb. 1+5 mg/ml 1 dråbe 4 gange dagligt i begge øjne"},
  "Tobradex x 3 i 3 uger efter vitrektomi       " : {skabelonname: "Tobradex øjendrb. 1+3 mg/ml 1 dråbe 3 gange dagligt i højre øje efter glaslegemeopr. i 3 uger"},
  "Tobrex Depot x 2 i 4 dage                    " : {skabelonname: "Tobrex Depot (=Tobramycin) depotøjendrb. 3  mg/ml 1 dråbe 2 gange dagligt i begge øjne i 4 dage"},
  "Tobrex Depot x 2                             " : {skabelonname: "Tobrex Depot (=Tobramycin) depotøjendrb. 3  mg/ml 1 dråbe 2 gange dagligt i begge øjne"},
  "Ultracortenol salve x 1 nocte                " : {skabelonname: "Ultracortenol øjensalve 0.5  % 1 dosis til nat i begge øjne"}
  
};
var medicinskabelongrp1 = {
  "Azopt x 2                                    " : {skabelonname: "Azopt øjendrb. 10  mg/ml 1 dråbe 2 gange dagligt i begge øjne"},
  "Cosopt x 2                                   " : {skabelonname: "Dorzolamid/Timolol (=Cosopt,Costad) øjendrb.  5+20 mg/ml 1 dråbe 2 gange dagligt i begge øjne"},
  "Cosopt ukons. x 2                            " : {skabelonname: "Cosopt Ukons. øjendrb.,opl.,endos.   5+20 mg/ml 1 dråbe 2 gange dagligt  i begge øjne"},
  "Iopidine 5% x 3 i 3 uger                     " : {skabelonname: "Iopidine øjendrb. 5  mg/ml 1 dråbe 3 gange dagligt i begge øjne i 3 uger"},
  "Iopidine 10% x 3 i 3 dage                    " : {skabelonname: "Iopidine øjendrb. 10  mg/ml 1 dråbe 3 gange dagligt i begge øjne i 3 dage"},
  "Optimol x 2                                  " : {skabelonname: "Optimol (=Timolol) øjendrb. 5  mg/ml 1 dråbe 2 gange dagligt i begge øjne"},
  "Timosan Depot x 1                            " : {skabelonname: "Timosan Depot (=Timogel) øjengel 1  mg/g 1 dråbe til morgen i begge øjne"}
};
var medicinskabelongrp2 = {
  "Nevanac x 4 i 6 uger                         " : {skabelonname: "Nevanac øjendrb. 1 mg/ml 1 dråbe 4 gange dagligt i begge øjne i 6 uger"},
  "Oculac x 2                                   " : {skabelonname: "Oculac øjendrb. 50  mg/ml 1 dråbe PN i begge øjne"},
  "Oculac ukons. x 2                            " : {skabelonname: "Oculac Ukons. øjendrb. endos. 50  mg/ml 1 dråbe PN i begge øjne"},
  "Opatanol x 2                                 " : {skabelonname: "Opatanol øjendrb. 1  mg/ml 1 dråbe 2 gange dagligt i begge øjne"},
  "Viscotears PN                                " : {skabelonname: "Viscotears øjengel 2  mg/g 1 dråbe PN i begge øjne"},
  "Viscotears ukons. PN                         " : {skabelonname: "Viscotears Ukons. øjengel, endosisbeh. 2  mg/g 1 dråbe PN i begge øjne"},
  "Viskøse øjendråber PN                        " : {skabelonname: "Viskøse Øjendråber 3.5 mg/ml 1-2 dråber PN i begge øjne"},
  "Øjensalve neutral x 1 nocte                  " : {skabelonname: "Øjensalve Neutral 200  mg/g 1 dosis til nat i begge øjne"}
  
  
};
var medicinskabelongrp3 = {
  "Maxidex x 3 i 3 uger efter kat.              " : {skabelonname: "Katarakt-pakke"}
//  "SMILE-pakke                                  " : {skabelonname: "SMILE-pakke"}
};
var skabelon1;
var atc = 0;
var eyestext;

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
      var Standard = Dialog.input("Region Syddanmark - OUH Øjenafdeling E", "TEST - Standard ordinationer", 
                                  {maxDialogWidth: 410, buttons: [{ 'value': 'Cancel', 'isCancel': true }, {'value': 'Ok'}], 
                                   'submitOnValidation': false,
                                   "eye": {"type": "RADIO", 
                                                 "prompt": "Vælg øje",
                                                 "selectBetween": eyes,
                                                 "validation": {'isRequired': true, 'message': "Vælg øje"}},
                                   "gruppe": {"type": "RADIO", 
                                                 "prompt": "Vælg gruppe",
                                                 "selectBetween": grupper, "orientation": "vertical"},
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
//                                                 "selectBetween": Object.keys(medicinskabelongrp3), "dependsOn": "gruppe=Ordination - recept - seponering"}
                                                 "selectBetween": Object.keys(medicinskabelongrp3), "dependsOn": "gruppe=Ordinationspakker"}
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
  // ** mangler øje (eyes) fra andet flow
}  

//*** Adjustment of dosage text (irrelevant for subscription bundles)
  
	if (Standard.eye === eyes[1])
	{
	if (skabelon1 === "Tobradex øjendrb. 1+3 mg/ml 1 dråbe 3 gange dagligt i højre øje efter glaslegemeopr. i 3 uger")
       {
        eyestext = "efter glaslegemeop. i begge øjne";
       } 
	else if (skabelon1 === "Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt efter kat.operation i højre øje i 3 uger")
       {
        eyestext = "efter grå stær operation i beg. øjne";
       } 
	else 
       {
        eyestext = "i begge øjne";
       } 
	}
	if (Standard.eye === eyes[0])
    {  
	if (skabelon1 === "Tobradex øjendrb. 1+3 mg/ml 1 dråbe 3 gange dagligt i højre øje efter glaslegemeopr. i 3 uger")
       {
        eyestext = "efter glaslegemeop. i højre øje";
       } 
	else if (skabelon1 === "Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt efter kat.operation i højre øje i 3 uger")
       {
        eyestext = "efter grå stær operation i hø. øje";
       } 
	else 
       {
         eyestext = "i højre øje";
       }
    }
    if (Standard.eye === eyes[2])
    {  
	if (skabelon1 === "Tobradex øjendrb. 1+3 mg/ml 1 dråbe 3 gange dagligt i højre øje efter glaslegemeopr. i 3 uger")
       {
        eyestext = "efter glaslegemeop. i venstre øje";
       } 
	else if (skabelon1 === "Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt efter kat.operation i højre øje i 3 uger")
       {
        eyestext = "efter grå stær operation i ve. øje";
       } 
	else 
       {
         eyestext = "i venstre øje";
       }
    }  
  
//*** Check for subscription bundles ***//
 
if (skabelon1 === "Katarakt-pakke")
	{
//    var eyes = "ou";  
    Flow.run('Ordinationspakke E - Katarakt new', {fmk1: fmk, eye1: Standard.eye} );
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
Fields["FMK - Ny FMK ordination - Dosering button"].click();
Wait.forField(Fields["FMK - Dosering - Varighed"], 10);
try {  
Fields["FMK - Dosering 1x3 - Bemærkning"].input(eyestext);
} catch (e) {Dialog.warn("Sideangivelse ikke rettet", "", {});} 
Fields["FMK - Dosering - OK button"].click();
if (fmk === "True")
{  
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
//Fields["FMK - Ny FMK ordination - Signer"].click();
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