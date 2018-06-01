(function() {
  if (App.location().indexOf("ListPage") >= 0) {
    return Fields["First in patient list"].read();
  } else {
    return "-";
  }
})();