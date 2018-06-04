try {
  var res = Flow.run('Skift skabelon', {
    'nyskab': "Diagnoser og procedurer"
  });
} catch (e) {
  Dialog.warn('result', res.result, {}
             );
}
Dialog.info(res.result, '', {});
