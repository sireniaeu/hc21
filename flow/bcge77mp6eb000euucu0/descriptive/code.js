Sticky.open(
  'running', 
  { 
    embed: true,
    location: {
      type: 'absolute',
      top: 100,
      left: 1000
    },
    items: [
      {
        type: 'HTML',
        source: '<h3>Flow is running ...</h3>',
        height: 50
      }
    ]
  }
);
