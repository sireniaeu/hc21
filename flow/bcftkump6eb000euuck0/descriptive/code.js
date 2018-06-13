
//Flow.run('showSticky', {});
Notification.show('info', 'Its complicated', 'Round '+count, { severity: 'INFO', timeout: 5 });

for (var count = 0; count < 10; count++) {
  Flow.run("Create PO", {});
}
//Flow.run('hideSticky', {});