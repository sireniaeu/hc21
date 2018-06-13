//Debug.ger(Fields["btn_Message_ok"].inspect());
//Fields["btn_Message_ok"].highlight();

for (var count = 0; count < 2; count++) {
  Notification.show('info', 'Its complicated', 'Round '+count, { severity: 'INFO', timeout: 5 });
  if(Fields["btn_Message_ok"].exists()){
    Notification.show('info', 'btn_Message_ok exists', '', { severity: 'INFO', timeout: 5 });
    Fields["btn_Message_ok"].highlight();
    break;
  }
  Flow.run("Cancel Record", {});
}
