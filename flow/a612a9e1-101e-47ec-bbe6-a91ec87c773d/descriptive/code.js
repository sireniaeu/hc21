Sticky.open(
  "hello",
  { 
    embed: true,
    movable: false,
    resizable: false,
    searchable: false,
    showFooter: false,
    location: 
      { type: "absolute",
       top: 200,
       left: 900,
       width: 320,
       height: 500
      },
    items: [
      { type: "GIF", source: "http://www.catgifpage.com/gifs/320.gif" },
      { type: "ACTION", height: 100, name: "Show befordring", header: "Vis befordring", body: "Klik!" }
    ]
  }
);