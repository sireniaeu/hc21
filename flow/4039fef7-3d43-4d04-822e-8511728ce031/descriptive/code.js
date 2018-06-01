Sticky.open(
  "hello",
  { 
    embed: false,
    movable: true,
    resizable: true,
    searchable: true,
    showFooter: true,
    title: "StickyOne " + Inputs["arg"],
    location: 
      { type: "absolute",
       top: 300,
       left: 300,
       width: 200
      },
    items: [
      { type: "HTML", source: "<h4>hello</h4>", height: 50 },
      { type: "LINK", text: "ksdjhf sdkfh sd sdfsdf sdf sdf sdf sdf  sdfsf sdkfjhdskjh", link: "http://sirenia.eu", prefix: "sdksdf dsf sf fj sdkh  skdjfh skdfhsldfj", suffix: "kdfkh" },
      { type: "PDF", height: 500, source: "https://www.irs.gov/pub/irs-pdf/fw4.pdf", header: "Foo", body: "bar", collapsible: true, link: "http://dr.dk", printable: true },
      { type: "PDF", source: "https://www.irs.gov/pub/irs-pdf/fw4.pdf", header: "Foo", body: "bar", collapsible: true, collapsed: true, link: "http://dr.dk", focus: true },
      { type: "ACTION", name: "Show sticky rec", header: "Sticky recursive", inputs: { arg: (parseInt(Inputs["arg"], 10) || 1) + 1 }, body: "yessir" }
    ]
  }
);