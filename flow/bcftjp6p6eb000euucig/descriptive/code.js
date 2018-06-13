for (var count = 0; count < 10; count++) {
  if(Fields["btn_Message_ok"].exist()){
    break;
  }
  Flow.run("Cancel Record", {});
}
