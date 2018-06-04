var result = Dialog.input('Excel!', 'Choose an excel-file to parse', { file: { 'prompt': 'Choose file', 'type': 'FILE' }});
Debug.showDialog(result.file);
var table = Excel.load(result.file, { table: { range: 'A1:B3'} });

var data = table[1][1];
Debug.showDialog(data);