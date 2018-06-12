//Input params
args = {};
args.ref_no = Date.now();
args.add_to_address = true;
args.remarks = "Something here. " + Date.now();
args.items = [{
  name: "One of these",
  amount: 1,
  price: 100
}, {
  name: "Two of these",
  amount: 2,
  price: 50
}, {
  name: "Some of those",
  amount: 1337,
  price: 33
}];


//Click po menu
//Fields["bnt_purchase"].highlight();
//Fields["bnt_purchase"].click({});

//Open po window
Window.sendKeys("+^o");

//Select Account. TODO:
//Fields["table_datagrid"].highlight();
//Wait.forMilliseconds(1000);
//Debug.ger(Fields["table_datagrid"]);

//Click create po
//Fields.btn_create_po.highlight();
Fields.btn_create_po.click();

//Add item lines. TODO:
//Fields["table_po_datagrid"].highlight();
//Debug.ger(Fields["table_po_datagrid"]);
Fields["table_po_datagrid"].click();
Window.sendKeys("{TAB}");

for (var item in args.items) {
  Window.sendKeys(args.items[item.name]);
  Window.sendKeys("{TAB}");
  Window.sendKeys(args.items[item.name]);
  Window.sendKeys("{TAB}");
  Window.sendKeys(args.items[item.name]);
  Window.sendKeys("{TAB 3}");
  Wait.forMilliseconds(1000);
}

//Add ref
//Fields["input_RefNotextBox"].highlight();
Fields["input_RefNotextBox"].input(args.ref_no);

//Add Add to another add
//Fields["input_checkBox_Add_Address"].highlight();
if (args.add_to_address) {
  Fields["input_checkBox_Add_Address"].click();
}

//Add remarks
//Fields["input_CommentstextBox"].highlight();
Fields["input_CommentstextBox"].input(args.remarks);

//Execute po
//Fields["btn_ok"].highlight();
Fields["btn_ok"].click();

//No, don't print
Fields["bnt_cancel"].click();

//Go to list of PO
Window.sendKeys("^%o");
