var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

//Fields['Menu - Patientoversigt'].click();
//Fields['Menu - Patientoversigt - Patientoversigt'].click();
Fields['Patientoversigt - Opdater'].click();

var table = Fields['Patientoversigt - table'].read();
var timenul;
var timeraw;
var time;
var timecell;
var locationraw;
var location;
var locationcell;
var visitraw;
var visit;
var visiteye;
var visitcell;
var eye;
var booking;
var ii = 0;

//*** Op til 6 aftaler på kortet, læser tabellen fra nederste linje
for (var i=table.rows.length-1; i>=0 && i>=table.rows.length-6; i--)
{
//*** Sikring mod fremtidig booking uden mødetidspunkt
timenul = table.rows[i]["Book. dato"];
if (timenul !== "")
{  
ii = ii+1;
//*** Trækker mødetidspunkter ud, omdanner og opdaterer excell-ark.
timeraw = table.rows[i]["Book. dato"].match(/(.{2})(.{2})(.{1})(.{2})(.{1})(.{2})(.{1})(.{5})/);
time = timeraw[6] + "-" + timeraw[4] + "-" + timeraw[2] + " kl. " + timeraw[8];
timecell = "A" + (4+ii);  
Excel.updateCell('c:\\MødekortAmb2Ver2\\Mødekort.xlsm', 'Ark1', timecell, time);

//*** Danner info om lokalitet
locationraw = table.rows[i]["Lokalitet"];
if (locationraw === "OUH Øjenambulatorium E1 (Odense)")
{ 
location = "E1 - Ambulatorium 1. Indgang 132";
}
if (locationraw === "OUH Øjenambulatorium E2 (Odense)")
{ 
location = "E2 - Patienthotel 2. sal. Indgang 1";
}
if (locationraw === "OUH Øjenambulatorium E3 (Odense)")
{ 
location = "E3 - Ambulatorium 3. Indgang 130";
}
if (locationraw === "OUH Øjenambulatorium EO (Odense)")
{ 
location = "EO - Øjenoperation. Indgang 132";
}
locationcell = "B" + (4+ii);  
Excel.updateCell('c:\\MødekortAmb2Ver2\\Mødekort.xlsm', 'Ark1', locationcell, location);
  
//*** Omdanner Aktivitet i bookingen til Behandling eller Kontrol på mødekort
visitraw = table.rows[i]["Aktivitet"];
if (visitraw === "INJ" || visitraw[1] === "PDT")
{  
if (visitraw === "INJ")
{ 
visit = "Behandling";
}
if (visitraw === "PDT")
{ 
visit = "Laserbehand.";
}
}
else
{
visit = "Kontrol";  
}

//*** Afgør på baggrund af de 2 første tegn i bookinginformation om der er tale om højre, venstre eller begge øjne
bookingnul = table.rows[i]["Bookinginformation"];
if (bookingnul !== "")
{  
booking = table.rows[i]["Bookinginformation"].match(/(.{2})/);
if (booking[1] === "OU" || booking[1] === "OD" || booking[1] === "OS")
{ 
	if (booking[1] === "OD")
	{
	eye = " højre øje";
	}
	if (booking[1] === "OS")
	{
	eye = " venstre øje";
	}
	if (booking[1] === "OU")
	{
	eye = " begge øjne";
	}
}
else
{
eye = "";  
}
visiteye = visit + eye;
visitcell = "C" + (4+ii);  
Excel.updateCell('c:\\MødekortAmb2Ver2\\Mødekort.xlsm', 'Ark1', visitcell, visiteye);
}
}
}

//*** Læser navn og cpr fra patientlinjen og sender til Excelark
var cpr = Fields['Patientlinje - CPR'].read();
var fornavne = Fields['Patientlinje - Fornavne'].read();
var efternavn = Fields['Patientlinje - Efternavn'].read();
Excel.updateCell('c:\\MødekortAmb2Ver2\\Mødekort.xlsm', 'Ark1', 'B14', cpr);
Excel.updateCell('c:\\MødekortAmb2Ver2\\Mødekort.xlsm', 'Ark1', 'B15', fornavne);
Excel.updateCell('c:\\MødekortAmb2Ver2\\Mødekort.xlsm', 'Ark1', 'B17', efternavn);
Dialog.info("Kopiering slut", "Gå til mødekort og tryk ctrl + d\n\nCPR-nummer: " + cpr + "\nFornavn(e): " + fornavne + "\nEfternavn: " + efternavn, {});
