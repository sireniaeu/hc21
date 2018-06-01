Notification.show("hello-embed", "Hello again embed 1", "This is some other text", { severity: "ERROR", embed: true });
Wait.forSeconds(1);
Notification.show("hello-embed-another", "Hello again embed", "This is some other text.\nMore lines.\nMore lines. More text, text, text, text, text, text, text.", { severity: "WARN", embed: true });
Wait.forSeconds(1);
Notification.show("hello-embed-another-another", "Hello again embed", "This is some other text", { severity: "INFO", embed: true });
Wait.forSeconds(1);
Notification.show("hello", "Hello again embed", "This is some other text.\nMore lines.\nMore lines. More text, text, text, text, text, text, text.", { severity: "ERROR", embed: false });
Wait.forSeconds(1);
Notification.show("hello-another", "Hello again embed", "This is some other text", { severity: "WARN", embed: false });
