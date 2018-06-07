//Ensure that the user is logged in
Wait.forField(Fields["btn_pt_search"], 20);
Fields["btn_pt_search"].click();
//Wait.forField(Fields["input_ssn_search"], 3);
Fields["input_ssn_search"].input("");
Fields["input_ssn_search"].inputNative("121212-1212");