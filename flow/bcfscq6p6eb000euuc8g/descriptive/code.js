list

Fields["btn_displayReport"].click();
Wait.forMilliseconds(500);
Fields["btn_displayRecord"].click();
Wait.forMilliseconds(500);
Fields["btn_cancelRecord"].click();
Wait.forMilliseconds(1500);
Window.sendKeys("{ENTER}", {focus:false});
Wait.forMilliseconds(500);
Window.sendKeys("{ENTER}", {focus:false});
Fields["btn_displayReport"].click();
