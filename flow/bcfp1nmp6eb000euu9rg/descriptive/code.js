Fields["bnt_purchase"].highlight();
Fields["bnt_purchase"].click({});
Window.sendKeys("+^o");
Fields["table_datagrid"].highlight();
Wait.forMilliseconds(1000);
//Debug.ger(Fields["table_datagrid"]);



Wait.forField(Fields["btn_create_po"], 10);
Fields.btn_create_po.highlight();
Fields.btn_create_po.click();

Fields["table_po_datagrid"].highlight();
Debug.ger(Fields["table_po_datagrid"]);

