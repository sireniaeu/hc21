//Ensure that the user is logged in
App.navigate("");
Wait.forField(Fields["btn_pt_search"], 3);
Fields["btn_pt_search"].click();
