var result = Dialog.input('Excel!', 'Choose an excel-file to parse', { file: { 'prompt': 'Choose file', 'type': 'FILE' }});
var data = Excel.load(result.file, { 'table': { 'header': true, 'index': true, 'range': 'A1:D3' } });


Debug.showDialog(data['Pr Car']['Apples']);

