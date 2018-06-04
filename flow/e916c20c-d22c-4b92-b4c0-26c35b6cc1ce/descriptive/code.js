var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

if (fmk1 === "True")
{  
Fields["FMK - Ny ordination i FMK"].click();
}
else
{
Fields["FMK - Ny ordination i Cosmic"].click();
}
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Søgefelt"].input("Tobradex øjendrb. 1+3 mg/ml 1 dråbe 3 gange dagligt i højre øje");
Fields["FMK - Ny FMK ordination - Søgefelt"].inputNativeAsync("<enter>");
Wait.forField(Fields["FMK - Søgeresultater - Filtrering"], 10);
Fields["FMK - Søgeresultater - Table"].select(".*");
Fields["FMK - Søgeresultater - Ok button"].click();
Fields["FMK - Ny FMK ordination - Dosering button"].click();
Wait.forField(Fields["FMK - Dosering - Varighed"], 10);
Fields["FMK - Dosering - Doseringstype"].select("Efter særlig ordination");
Wait.forField(Fields["FMK - Dosering - Tekstfelt ESO"], 10);
Fields["FMK - Dosering - Tekstfelt ESO"].input("Dryppes efter operation i højre øje efter skema");
Fields["FMK - Dosering - Bemærkning"].input(" ");
Fields["FMK - Dosering - Varighed ESO"].select("Uger");
Fields["FMK - Dosering - Varighed ESO number"].input("2");
Fields["FMK - Dosering - OK button"].click();
if (fmk1 === "True")
{  
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Signer"].click();
Fields["FMK - Ny FMK ordination - Advarsel Doseringstype"].select("fast");
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
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
Fields["FMK - Ny FMK ordination - Advarsel Doseringstype"].select("fast");
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
Settings.CommandRetries = 5;
try
{
Wait.forField(Fields["FMK - Advarsel - Samme ATC i Cosmic"], 10);
atc = 1;
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
}  
catch (e)
{}  
Settings.CommandRetries = StdRetry;
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Signer"].click();
}

Wait.forField(Fields["FMK - Ny ordination i Cosmic"], 10);
if (fmk1 === "True")
{  
Fields["FMK - Ny ordination i FMK"].click();
}
else
{
Fields["FMK - Ny ordination i Cosmic"].click();
}
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Søgefelt"].input("Tobradex øjendrb. 1+3 mg/ml 1 dråbe 3 gange dagligt i venstre øje");
Fields["FMK - Ny FMK ordination - Søgefelt"].inputNativeAsync("<enter>");
Wait.forField(Fields["FMK - Søgeresultater - Filtrering"], 10);
Fields["FMK - Søgeresultater - Table"].select(".*");
Fields["FMK - Søgeresultater - Ok button"].click();
Fields["FMK - Ny FMK ordination - Dosering button"].click();
Wait.forField(Fields["FMK - Dosering - Varighed"], 10);
Fields["FMK - Dosering - Doseringstype"].select("Efter særlig ordination");
Wait.forField(Fields["FMK - Dosering - Tekstfelt ESO"], 10);
Fields["FMK - Dosering - Tekstfelt ESO"].input("Dryppes efter operation i venstre øje efter skema");
Fields["FMK - Dosering - Bemærkning"].input(" ");
Fields["FMK - Dosering - Varighed ESO"].select("Uger");
Fields["FMK - Dosering - Varighed ESO number"].input("2");
Fields["FMK - Dosering - OK button"].click();
if (fmk1 === "True")
{  
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Signer"].click();
Wait.forField(Fields["FMK - Advarsel - Samme ATC i FMK"], 10);
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
Wait.forSeconds(1);
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
Wait.forField(Fields["FMK - Ny FMK ordination - Advarsel Doseringstype"], 10);
Fields["FMK - Ny FMK ordination - Advarsel Doseringstype"].select("fast");
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
}
else
{
Wait.forField(Fields["FMK - Advarsel - Samme ATC i Cosmic"], 10);
Fields["FMK - Advarsel - Fortsæt"].click();
Wait.forField(Fields["FMK - Ny FMK ordination - Advarsel Doseringstype"], 10);
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
Fields["FMK - Ny FMK ordination - Advarsel Doseringstype"].select("fast");
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Signer"].click();
}
