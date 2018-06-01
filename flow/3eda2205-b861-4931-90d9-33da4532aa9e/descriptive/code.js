var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];


Sticky.open(
  'AntiVEGF menu', 
  { 
    embed: false,
    location: {
      type: 'absolute',
      top: 100,
      left: 100
    },
    items: [
      { type: 'GIF', source: 'https://media.giphy.com/media/citBl9yPwnUOs/giphy.gif' },
      { type: 'ACTION', name: 'Eylea o.dx.' },
      { type: 'ACTION', name: 'Eylea o.sin.' },
      { type: 'ACTION', name: 'Lucentis o.dx.' },
      { type: 'ACTION', name: 'Lucentis o.sin.' }    ]
  }
);

