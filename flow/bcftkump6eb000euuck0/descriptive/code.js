
//Flow.run('showSticky', {});
Notification.show('info', 'Creating 10 POs', 'Round '+count, { severity: 'INFO', timeout: 500000 });

for (var count = 0; count < 10; count++) {
  Flow.run("Create PO", {});
}
//Flow.run('hideSticky', {});