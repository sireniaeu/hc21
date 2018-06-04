// Befordring is on the left desktop
//Window.focus();
//Window.maximize();
var desktops = Desktop.all();
var leftDesktop = desktops[0];
var rightDesktop = null;
if (desktops.length < 2) {
  rightDesktop = Desktop.add();
} else {
  rightDesktop = desktops[1];
}

// Move bookplan window to right desktop
if (Desktop.current() != rightDesktop) {
  Desktop.moveWindow(rightDesktop);
}

Desktop.switchTo(rightDesktop);
App.navigate("http://roosbefordring.rsyd.net//1");
//Fields["To befordring"].click();

//Sticky.hide("hello");