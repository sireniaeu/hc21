//Ensure that the user is logged in
Wait.forField(Fields["btn_pt_search"], 20);
Fields["btn_pt_search"].click();
Wait.forField(Fields["input_ssn_search"], 3);
Wait.forMilliseconds(3000);
Fields["input_ssn_search"].input("121212-1212");
Fields["input_ssn_search"].inputNative(" ");