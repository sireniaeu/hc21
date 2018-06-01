Notification.show("hello", "Hello", "I should be around for ~5 seconds", { timeout: 5 });
Wait.forSeconds(6);
Notification.show("hello", "Hello again", "This is my initial text", {});
Wait.forSeconds(3);
Notification.update("hello-embed", "Hello again", "This is some other text", { severity: "ERROR", embed: true });
Wait.forSeconds(2);
Notification.update("hello-embed-another", "Hello again", "This is some other text", { severity: "WARN", embed: true });
Notification.show("hello-another", "Hello again", "This is my initial text", {});
//Notification.close("hello");