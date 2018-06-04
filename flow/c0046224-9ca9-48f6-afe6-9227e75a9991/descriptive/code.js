var result = Dialog.input(
  "Input your choices", 
  "SELECT and TEXT supported. Make your selection, then write some text.", 
  {
    "a": { "type": "SELECT", "prompt": "Select 1 or 2", "selectBetween": ["1","2"]},
    "b": { "type": "TEXT", "prompt": "Write something" }
  }
);

var text = result.b;