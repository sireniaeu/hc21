if (Sticky.isShowing("muse")) {
  Flow.run('Show sticky MUSE', {
    'cpr': Inputs["User.Id.[org.dk]Cpr.Number"], 
    'shouldFocus': 'no' 
   });
} 