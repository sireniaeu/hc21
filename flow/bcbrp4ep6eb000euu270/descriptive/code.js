Fields["list_list"].highlightWithColor("blue");
//Debug.ger(Fields["list_list"].inspect());
Fields["list_list"].select("Menus");
Wait.forMilliseconds(1000);
Fields["list_list"].select("Options");
Wait.forMilliseconds(1000);
Window.sendKeys(" ");
Wait.forMilliseconds(1000);
