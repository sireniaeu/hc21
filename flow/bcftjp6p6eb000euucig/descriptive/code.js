for (var count = 0; count < 10; count++) {
  if(Fields["btn_Message_ok"].exists()){
    break;
    Fields["btn_Message_ok"].highlight();
  }
  //Flow.run("Cancel Record", {});
}
