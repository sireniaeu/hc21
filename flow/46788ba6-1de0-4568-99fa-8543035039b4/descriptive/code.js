try {
  Flow.run('Indberet bivirkning', { 'BiMed': "BivirkMed"});
} catch (e) {
Dialog.info("Fra Cosmic flow", "I catch");
}