for (var count = 0; count < 10; count++) {
  if(Fields["btn_Message_ok"].exists()){
    Fields["btn_Message_ok"].highlight();
    break;
  }
  //Flow.run("Cancel Record", {});
}
