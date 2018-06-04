var treeField = Fields['Behandlingsoversigt - Treeview'];
//var treeField = Fields['Behandlingsoversigt'];

var inspectObj = treeField.inspect({ reflectionDepth: 3, includeChildren: true, useFieldCache: false });

//Debug.showDialog(JSON.stringify(inspectObj));
Fs.write('C:\\Users\\ban9er\\Desktop\\lpr\\inspect.txt', JSON.stringify(inspectObj, null, 2));

treeField.select('**/^.*year=2014.*^', { expand: true, reflectionDepth: 3 });
//treeField.select('**/^.*failed description.*^', { expand: true, reflectionDepth: 3 });

