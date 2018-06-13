//Debug.ger(Fields["btn_Message_ok"].inspect());
//Fields["btn_Message_ok"].highlight();

Fields["list_select_status"].select("Canceled");
Wait.forMilliseconds(1000);
Fields["btn_displayReport"].click();
Wait.forMilliseconds(500);

for (var count = 0; count < 2; count++) {
  //Notification.show('info', 'Its complicated', 'Round '+count, { severity: 'INFO', timeout: 5 });
  if(Fields["btn_Message_ok"].exists()){
    Notification.show('info', 'All POs have been cancelled', '', { severity: 'INFO', timeout: 5 });
    //Fields["btn_Message_ok"].highlight();
    break;
  }
  Flow.run("Cancel Record", {});
}
