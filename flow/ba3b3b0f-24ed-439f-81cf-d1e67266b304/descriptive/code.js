var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

if (eye1 === "o.u." || eye1 === "o.dx.")
{
if (fmk1 === "True")
{  
Fields["FMK - Ny ordination i FMK"].click();
}
else
{
Fields["FMK - Ny ordination i Cosmic"].click();
}
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Søgefelt"].input("Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt efter kat.operation i højre øje i 3 uger");
Fields["FMK - Ny FMK ordination - Søgefelt"].inputNativeAsync("<enter>");
Wait.forField(Fields["FMK - Søgeresultater - Filtrering"], 10);
Fields["FMK - Søgeresultater - Table"].select(".*");
Fields["FMK - Søgeresultater - Ok button"].click();
if (fmk1 === "True")
{  
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Signer"].click();
//Settings.CommandRetries = 5;
try
{
Wait.forField(Fields["FMK - Advarsel - Samme ATC i FMK"], 10);
atc = 1;
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
}  
catch (e)
{}  
//Settings.CommandRetries = StdRetry;
}
else
{  
//Settings.CommandRetries = 5;
try
{
Wait.forField(Fields["FMK - Advarsel - Samme ATC i Cosmic"], 10);
atc = 1;
Fields["FMK - Advarsel - Fortsæt"].click();
}  
catch (e)
{}  
//Settings.CommandRetries = StdRetry;
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Signer"].click();
}
}

if (eye1 === "o.u." || eye1 === "o.sin.")
{
if (fmk1 === "True")
{  
Wait.forField(Fields["FMK - Ny ordination i FMK"], 10);
Fields["FMK - Ny ordination i FMK"].click();
}
else
{
Wait.forField(Fields["FMK - Ny ordination i Cosmic"], 10);
Fields["FMK - Ny ordination i Cosmic"].click();
}
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Søgefelt"].input("Maxidex øjendrb. 1 mg/ml 1 dråbe 3 gange dagligt efter kat.operation i venstre øje i 3 uger");
Fields["FMK - Ny FMK ordination - Søgefelt"].inputNativeAsync("<enter>");
Wait.forField(Fields["FMK - Søgeresultater - Filtrering"], 10);
Fields["FMK - Søgeresultater - Table"].select(".*");
Fields["FMK - Søgeresultater - Ok button"].click();
if (fmk1 === "True")
{  
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Signer"].click();
Wait.forField(Fields["FMK - Advarsel - Samme ATC i FMK"], 10);
Fields["FMK - Ny FMK ordination - Advarsel OK"].click();
}
else
{  
Wait.forField(Fields["FMK - Advarsel - Samme ATC i Cosmic"], 10);
Fields["FMK - Advarsel - Fortsæt"].click();
Wait.forField(Fields["FMK - Ny FMK ordination - Søgefelt"], 10);
Fields["FMK - Ny FMK ordination - Signer"].click();
}
}

//** Recepter **//

if (eye1 === "o.u." || eye1 === "o.dx.")
{
Wait.forField(Fields["FMK - Ordinationsliste - Table"], 10);
Fields["FMK - Ordinationsliste - Table"].select(".*stær.*hø..*");
Fields["FMK - Ordinationsliste - Table"].rightClickCell(".*stær.*hø..*", "Dosering");
Fields["FMK - Recept"].click();
Fields["FMK - Recept reitereret"].click();
Fields["FMK - Recept genudleveres"].input("2");
Fields["FMK - Recept genudleveres hver"].input("1");
Fields["FMK - Recept genudleveres uge"].click();
Fields["FMK - Recept Opret Recept"].click();
}

if (eye1 === "o.u." || eye1 === "o.sin.")
{
Wait.forField(Fields["FMK - Ordinationsliste - Table"], 10);
Fields["FMK - Ordinationsliste - Table"].select(".*stær.*ve..*");
Fields["FMK - Ordinationsliste - Table"].rightClickCell(".*stær.*ve..*", "Dosering");
Fields["FMK - Recept"].click();
Fields["FMK - Recept reitereret"].click();
Fields["FMK - Recept genudleveres"].input("2");
Fields["FMK - Recept genudleveres hver"].input("1");
Fields["FMK - Recept genudleveres uge"].click();
Fields["FMK - Recept Opret Recept"].click();
}

Wait.forSeconds(2);

//** Seponering **//
if (eye1 === "o.u." || eye1 === "o.dx.")
{
Wait.forField(Fields["FMK - Ordinationsliste - Table"], 10);
Fields["FMK - Ordinationsliste - Table"].select(".*stær.*hø..*");
Fields["FMK - Ordinationsliste - Table"].rightClickCell(".*stær.*hø..*", "Dosering");
Fields["FMK - Seponer i FMK"].click();
Fields["FMK - Bevar recepter og Seponer"].click();
Fields["JournalCPRinput"].simulateClick();  //** Makes Cosmic right-click menu disappear **
Wait.forSeconds(2);  
}
if (eye1 === "o.u." || eye1 === "o.sin.")
{
Wait.forField(Fields["FMK - Ordinationsliste - Table"], 10);
Fields["FMK - Ordinationsliste - Table"].select(".*stær.*ve..*");
Fields["FMK - Ordinationsliste - Table"].rightClickCell(".*stær.*ve..*", "Dosering");
Fields["FMK - Seponer i FMK"].click();
Fields["FMK - Bevar recepter og Seponer"].click();
Fields["JournalCPRinput"].simulateClick();  //** Makes Cosmic right-click menu disappear **
}


