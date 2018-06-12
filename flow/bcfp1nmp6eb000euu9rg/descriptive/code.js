//Input params
args = {};
args.ref_no = Date.now();
args.add_to_address = true;
args.remarks = "Something here. " + Date.now();

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
Fields["table_po_datagrid"].highlight();
//Debug.ger(Fields["table_po_datagrid"]);
Fields["table_po_datagrid"].click();
Window.sendKeys("{TAB}");
Window.sendKeys("One of these");
Window.sendKeys("{TAB}");
Window.sendKeys("1");
Window.sendKeys("{TAB}");
Window.sendKeys("100");
Window.sendKeys("{ENTER}");

Window.sendKeys("Two of these");
Window.sendKeys("{ENTER}");
Window.sendKeys("Some of those");

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
