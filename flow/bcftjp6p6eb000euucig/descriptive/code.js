//Debug.ger(Fields["btn_Message_ok"].inspect());
//Fields["btn_Message_ok"].highlight();

Fields["list_select_status"].select("Canceled");
Wait.forMilliseconds(1000);
Fields["btn_displayReport_optic"].click();
Notification.show('info', 'Dispaly Report Clicked', '', { severity: 'INFO', timeout: 5 });
Wait.forMilliseconds(500);


for (var count = 0; count < 1000; count++) {
  Notification.show('info', 'Canceling Records', 'Round '+count, { severity: 'INFO', timeout: 5 });
  if(Fields["btn_Message_ok"].exists()){
    Notification.show('info', 'All POs have been cancelled', '', { severity: 'INFO', timeout: 5 });
    //Fields["btn_Message_ok"].highlight();
    Fields["btn_Message_ok"].click();
    
    break;
  }
  Flow.run("Cancel Record", {});
}
