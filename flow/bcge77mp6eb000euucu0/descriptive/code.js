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
