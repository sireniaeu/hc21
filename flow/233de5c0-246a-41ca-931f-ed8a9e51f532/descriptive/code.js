var r = Dialog.inputHtml(
  "HTML", "Input, input, input", {
    maxWidth: 300,
    source: "http://sirenia.eu/tutorial/form.html",
    embed: true
  }
);

Debug.ger();

Debug.showDialog(JSON.stringify(r));
