Sticky.open(
  'mySticky', 
  { 
    embed: true,
    location: {
      type: 'absolute',
      top: 100,
      left: 100
    },
    items: [
      { 
        type: 'GIF',
        source: 'http://gifs.com/cat' 
      },
      { 
        type: 'ACTION', 
        name: 'SomeOtherAction',
        header: 'Some other action',
        body: 'Click to run'
      }, 
      {
        type: 'PDF',
        source: 'http://pdfworld.com/arandompdf.pdf',
        link: 'http://pdfworld.com/aboutarandompdf',
        height: 100,
        collapsible: true,
        collapsed: false,
        saveable: false,
        focus: true
      },
      {
        type: 'HTML',
        source: '<h1>Big header</h1><h2>Smaller header</h2>',
        height: 50
      },
      {
        type: 'LINK',
        link: 'http://sirenia.eu',
        prefix: 'Go to ', text: 'Sirenia', suffix: ' now'
      }
    ]
  }
);
