//Input params
args = {};
args.ref_no = Date.now();
args.add_to_address = true;
args.remarks = "Something here. "



//Click po menu
Fields["bnt_purchase"].highlight();
Fields["bnt_purchase"].click({});

//Open po window
Window.sendKeys("+^o");

//Select Account
Fields["table_datagrid"].highlight();
Wait.forMilliseconds(1000);
//Debug.ger(Fields["table_datagrid"]);

//Click create po
Fields.btn_create_po.highlight();
Fields.btn_create_po.click();

//Add item lines
Fields["table_po_datagrid"].highlight();
Debug.ger(Fields["table_po_datagrid"]);

//Execute po

