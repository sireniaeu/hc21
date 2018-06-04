// Flow to update Lægemiddelstyrelsens bivirkningsformular

// Input information about the Drug suspected for side effect
Fields['2MistænktMedicinKnap'].click();
//Wait.forSeconds(4);
Wait.forField(Fields['2MistænktMedicinNavn'], 10);
Fields['2MistænktMedicinNavn'].input("Tramadol");
Fields['2Dosis'].input("2 tabletter 3 gange dagligt");
Fields['2Styrke'].input("100 mg");
Fields['2Form'].select("Tablet");
Fields['2Administrationsvej'].select("Oral");
Fields['2DrugIntendedFor'].input("Smertestillende");
Fields['2DrugStartDate_Day'].select("^1$");
Fields['2DrugStartDate_Months'].select("Jan");
Fields['2DrugStartDate_Years'].select("2015");
//Fields["2fieldwrapper_ActionTaken"].highlightWithColor("blue");
Fields['2Label_ActionTaken'].highlightWithColor("red");

// Input information about other medicin

Fields['3AndenMedicinKnap'].click();
Wait.forField(Fields['3OtherDrugsYes'], 10);

Fields['3OtherDrugsYes'].click();

Wait.forSeconds(1);
Wait.forField(Fields['3AddOtherDrugButton'], 10);
Fields['3OtherDrugName'].input("Lansoprazol Medical Vally enterokapsler, hårde 30 mg");
Fields['3OtherDrugIntendedFor'].input("mod mavesyre i spise...");
Fields['3OtherDrugStartDate_Days'].select("^5$");
Fields['3OtherDrugStartDate_Months'].select("Jan");
Fields['3OtherDrugStartDate_Years'].select("2015");

Fields['3AddOtherDrugButton'].click();

Wait.forSeconds(1);
Wait.forField(Fields['3AddOtherDrugButton'], 10);
Fields['3OtherDrugName'].input("Pradaxa kapsler, hårde 150 mg");
Fields['3OtherDrugIntendedFor'].input("til forebyggelse af blo...");
Fields['3OtherDrugStartDate_Days'].select("^5$");
Fields['3OtherDrugStartDate_Months'].select("Feb");
Fields['3OtherDrugStartDate_Years'].select("2015");
Fields['3AddOtherDrugButton'].click();

Wait.forSeconds(1);
Wait.forField(Fields['3AddOtherDrugButton'], 10);
Fields['3OtherDrugName'].input("Centyl Mite med Kaliumklorid overtrukne tabletter");
Fields['3OtherDrugIntendedFor'].input("for blodtrykket");
Fields['3OtherDrugStartDate_Days'].select("^5$");
Fields['3OtherDrugStartDate_Months'].select("Jan");
Fields['3OtherDrugStartDate_Years'].select("2015");
Fields['3AddOtherDrugButton'].click();

Wait.forSeconds(1);
Wait.forField(Fields['3AddOtherDrugButton'], 10);
Fields['3OtherDrugName'].input("Simvastatin Sondoz filmovertrukne tabl. 40 mg");
Fields['3OtherDrugIntendedFor'].input("mod forhøjet kolester...");
Fields['3OtherDrugStartDate_Days'].select("^5$");
Fields['3OtherDrugStartDate_Months'].select("Jan");
Fields['3OtherDrugStartDate_Years'].select("2015");
Fields['3AddOtherDrugButton'].click();

Wait.forSeconds(1);
Wait.forField(Fields['3AddOtherDrugButton'], 10);
Fields['3OtherDrugName'].input("Allupurinol DAK tabletter 100 mg");
Fields['3OtherDrugIntendedFor'].input("mod urinsur gigt");
Fields['3OtherDrugStartDate_Days'].select("^5$");
Fields['3OtherDrugStartDate_Months'].select("Jan");
Fields['3OtherDrugStartDate_Years'].select("2015");
//Fields['3AddOtherDrugButton'].click();

// Information about the patient

Fields['4PatientKnap'].click();
Wait.forField(Fields['4CPR1'], 10);
Fields['4CPR1'].input("070635");
Fields['4CPR2'].input("0111");

Fields['4DateOfBirth_Days'].select("^7");
Fields['4DateOfBirth_Months'].select("Juni");
Fields['4DateOfBirth_Years'].select("1935");
Fields['4Age'].input("82");
Fields['4AgeUnit'].select("År");

Fields['4GenderMale'].click();
Fields['4Initial'].input("AM");

Fields['4Hight'].input("165");
Fields['4Weight'].input("68");

// Information about the reporter

Fields['5IndberetterKnap'].click();
Wait.forField(Fields['5FirstName'], 10);

Fields['5Doctor'].click();
Fields['5DoctorType'].select("Hospital");
Fields['5HospitalRegion'].select("Syd");

Fields['5FirstName'].input("James-57591921");
Fields['5LastName'].input("Pond");
Fields['5SKSnr'].input("6008310");

Fields['5HospitalName'].input("Sygehus Lillebælt");
Fields['5Department'].input("IT");
Fields['5StreetName'].input("Kabbeltoft 25");
Fields['5ZipCode'].input("7100 Vejle");
Fields['5City'].input("Vejle");
Fields['5Phone'].input("79 40 50 00");
Fields['5Email'].highlightWithColor("red");
Fields['5Email'].input("it@rsyd.dk");


