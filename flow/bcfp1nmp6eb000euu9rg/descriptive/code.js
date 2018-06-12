Fields["bnt_purchase"].click({});
Window.sendKeys("+^o");
Fields["table_datagrid"].highlight();
Wait.forMilliseconds(1000);
Debug.ger(Fields["table_datagrid"]);
