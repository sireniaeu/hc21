//My test flow
Fields["tree_sln_explorer"].highlight();
Fields["tree_sln_explorer"].click();
Window.sendKeys("{LEFT 10}");
Window.sendKeys("{ENTER}");
Wait.forMilliseconds(1000);
Window.sendKeys("flow");
Window.sendKeys("{ENTER}");
Wait.forMilliseconds(100);
Window.sendKeys("bcb54");
Window.sendKeys("{ENTER}");
Wait.forMilliseconds(1000);
Window.sendKeys("descript");
Window.sendKeys("{ENTER}");
Wait.forMilliseconds(1000);
Window.sendKeys("app");
Wait.forMilliseconds(500);
Window.sendKeys("{ENTER}");

//Wait.forMilliseconds(2000);
Debug.ger(Fields["tree_sln_explorer"].inspect({ reflectionDepth: 2 }));
