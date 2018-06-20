var args = {};
args.scode = "AAS1878";
args.poref = "AW";
args.warehouse = "DEV";
args.product = "CONSTRUCT";
args.taxcode = "STD20";
args.price = "100";
args.quantity = "1";
args.glcode = "21.1018.110.32000";
args.cost = "120";
args.orderline = "PO1";


Fields["treeSearch"].click();
Window.sendKeys("Purchase Ordering Document Entry");
Wait.forMilliseconds(1000);
Fields["treeItem_PODE"].doubleClick();
Fields["btn_PO_Edit"].click();

Fields["input_scode"].click();
Window.sendKeys(args.scode);
Wait.forMilliseconds(2000);

Fields["input_po_ref"].click();
Window.sendKeys(args.poref);
Wait.forMilliseconds(2000);


Fields["btn_PO_Add"].click();
Wait.forMilliseconds(1000);
Window.sendKeys(args.warehouse);
Wait.forMilliseconds(1000);
Window.sendKeys("{TAB}");
Window.sendKeys(args.product);
Wait.forMilliseconds(1000);
Window.sendKeys("{TAB}");
Window.sendKeys(args.taxcode);
Wait.forMilliseconds(1000);
Window.sendKeys("{TAB 2}");
Window.sendKeys(args.price);
Wait.forMilliseconds(1000);
Window.sendKeys("{TAB}");
Window.sendKeys(args.quantity);
Wait.forMilliseconds(1000);
Window.sendKeys("{TAB}");
Window.sendKeys(args.glcode);

Fields["tableItem_OrderLine"].click();
Wait.forMilliseconds(1000);
Fields["tableItem_OrderLine_form"].click();
Window.sendKeys("{BACKSPACE 40}", {focus:false});
Wait.forMilliseconds(500);
Window.sendKeys(args.orderline, {focus:false});
Fields["btn_PO_OK"].click();
Fields["btn_PO_Generate"].click();
Wait.forMilliseconds(500);

Fields["btn_PO_Close"].click();