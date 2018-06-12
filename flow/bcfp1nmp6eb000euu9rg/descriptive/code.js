Fields["bnt_purchase"].click({});
Window.sendKeys("+^o");
Fields["table_datagrid"].highlight();
Wait.forMilliseconds(1000);
//Debug.ger(Fields["table_datagrid"]);



Wait.forField(Fields["btn_create_po"], 10);
Fields.btn_create_po.click();

PurOrderDataGridView
