Fields["mainTreeView"].highlight();
//Debug.ger(Fields["mainTreeView"].inspect());
//Fields["treeItem_QL"].click();
Fields["treeSearch"].click();
Window.sendKeys("Purchase Ordering Document Entry");
Wait.forMilliseconds(1000);
Fields["treeItem_PODE"].doubleClick();
Fields["btn_PO_Edit"].