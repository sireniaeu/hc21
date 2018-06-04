
/*
Notification.show("Info", "Info", "Inspecting..", {
  timeout: 5
});
Wait.forMilliseconds(200); // Notification won't show otherwise :/

var jsonInspect = JSON.stringify(Fields.Treeview.inspect({
  reflectionDepth: 1
}), null, 2);

var inspectFile = "Z:\\Desktop\\inspect.json";
Fs.write(inspectFile, jsonInspect);

Notification.show("Info", "Info", "Inspection complete. Result written to " + inspectFile, {
  timeout: 5
});

Fields.Treeview.select("month=17", {
  reflectionDepth: 1
});

*/

var field = Fields['Treeview'];

field.select('**/^.*Implementers.*^', { expand: true, reflectionDepth: 3 });
field.select('**/^.*Lvl2.*^', { expand: true, reflectionDepth: 3 });
field.select('**/^.*Lvl3.*^', { expand: true, reflectionDepth: 3 });
