for (var count = 0; count < 10; count++) {
  Notification.show('warn', 'Its complicated', 'Something broke down', { severity: 'WARN', timeout: 5 });
  if(Fields["btn_Message_ok"].exists()){
    Fields["btn_Message_ok"].highlight();
    break;
  }
  //Flow.run("Cancel Record", {});
}
