//Window.minimize();
var desktops = Desktop.all();
if (desktops.length > 1 && desktops[0] != Desktop.current()) {
  Desktop.switchLeft();
  Flow.run('Show bookplan', {});
} 