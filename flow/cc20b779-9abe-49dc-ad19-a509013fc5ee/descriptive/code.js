var result = Fields["Psyk - Åbn besøg vindue"].inspect();
Dialog.info('Åbn besøg', JSON.stringify(result), { });

throw 1;
var i = Fields["Psy - Tid"].inspect().enabled;
if (i === false) {
  Dialog.info('Disabled', i, {  });
} else {
  Dialog.info('Enabled', i, {  });
}

if (i === 'false') {
  Dialog.info('Disabled string', i, {  });
} else {
  Dialog.info('Enabled string', i, {  });
}
