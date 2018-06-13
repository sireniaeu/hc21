for (var count = 0; count < 10; count++) {
  Notification.show('info', 'Its complicated', 'Round '+count, { severity: 'INFO', timeout: 5 });
  if(Fields["btn_Message_ok"].exists()){
    Fields["btn_Message_ok"].highlight();
    break;
  }
  //Flow.run("Cancel Record", {});
}
