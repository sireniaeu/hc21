//Click po menu
Fields["bnt_purchase"].highlight();
Fields["bnt_purchase"].click({});

Window.sendKeys("+^o");
Fields["table_datagrid"].highlight();
Wait.forMilliseconds(1000);
//Debug.ger(Fields["table_datagrid"]);

Fields.btn_create_po.highlight();
Fields.btn_create_po.click();

Fields["table_po_datagrid"].highlight();
Debug.ger(Fields["table_po_datagrid"]);

