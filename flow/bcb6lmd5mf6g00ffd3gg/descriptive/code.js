//My test flow
Fields["tree_sln_explorer"].highlight();
Fields["tree_sln_explorer"].click();
Window.sendKeys("{LEFT 10}");
Window.sendKeys("flow");
Window.sendKeys("{ENTER}");
Window.sendKeys("bcb54");
Window.sendKeys("{ENTER}");
Window.sendKeys("descript");
Window.sendKeys("{ENTER}");
Window.sendKeys("type");
Window.sendKeys("{ENTER}");

//Wait.forMilliseconds(2000);
Debug.ger(Fields["tree_sln_explorer"].inspect({ reflectionDepth: 2 }));
