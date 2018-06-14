Notification.show('info', 'Subflow', '', { severity: 'INFO', timeout: 5 });
//Debug.ger(Fields["list_select_status"].inspect());
Fields["list_select_status"].select("Canceled");
Wait.forMilliseconds(1000);
//Fields["btn_displayReport"].click();
//Fields["btn_displayReport_optic"].highlight();
Fields["btn_displayReport_optic"].click();
Notification.show('info', 'Display Report Clicked', '', { severity: 'INFO', timeout: 5 });

Wait.forMilliseconds(3000);
Fields["btn_displayRecord"].click();

Notification.show('info', 'Display Record Clicked', '', { severity: 'INFO', timeout: 5 });


Wait.forMilliseconds(500);
Fields["btn_cancelRecord"].click();
Wait.forMilliseconds(1500);
Window.sendKeys("{ENTER}", {focus:false});
Wait.forMilliseconds(500);
Window.sendKeys("{ENTER}", {focus:false});
Fields["btn_displayReport_optic"].click();
Notification.show('info', 'Display Report Clicked - DONE', '', { severity: 'INFO', timeout: 5 });
