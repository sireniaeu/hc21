Sticky.open(
  'mySticky', 
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
        source: '<h2>Flow is running ...</h2>',
        height: 50
      }
    ]
  }
);
