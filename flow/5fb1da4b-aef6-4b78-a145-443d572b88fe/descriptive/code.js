// This structure translates from Cosmic login (ad) to extra information if the correct information is missing or differs from Cosmic, 
// e.g. the person with username 'jpv42' has initials "jv" and name "Jesper Pindbo Vestergaard". It's also possible to define title

var StdRetry = 15;
Settings.CommandRetries = StdRetry;
Settings.CommandRetryDelays = [50, 100, 150, 200, 400, 800, 1600];

var extras = {
 // *** Speciallæger ***//
  "jpv42": { 
    initials: "jv",
    name: "Jesper Pindbo Vestergaard"
      },
  "nil42": { 
    initials: "nlø"
      },
  "kam3yv": { 
    initials: "ml"
  },
  "ked3ad": { 
    initials: "jw"
  },
  "ven1ur": { 
    initials: "gm",
    name: "Gerda Nørrelykke Møller"
      },
  "kat3ti": { 
    initials: "dn"
      },
  "nel42": { 
    initials: "ne"
  },
  "vup1py": { 
    initials: "pr"
  },
  "idi8dy": { 
    initials: "ng"
      },
  "mkj42": { 
    initials: "mk"
  },
  "amy8if": { 
    initials: "db"
  },
  "niv6hy": { 
    initials: "lm"
      },
  "nly42": { 
    initials: "nly"
  },
 // *** Reservelæger ***//
  "peg3nu": { 
    initials: "mm",
    name: "Mette Borg Madsen",
    title: "1. reservelæge"
  },
  "ify2an": { 
    initials: "mp",
    title: "Lægevikar"
  },
  "naf7pe": { 
    initials: "kl",
    title: "Læge"
  },
  "put8da": { 
    initials: "st",
    title: "Lægevikar"
  },
 // *** Fotografer/optikere ***//
  "yng6gi": { 
    initials: "me"
  },
  "mef7ni": { 
    initials: "hp"
  },
  "pyt1ym": { 
    initials: "ce"
  },
  "kyk8an": { 
    initials: "cm"
  },
 // *** Amb. sygeplejersker ***//
  "lje42": { 
    initials: "lj"
  },
  "saf9ev": { 
    initials: "bp",
    name: "Britta Berg Philipsen"
  },
  "dah42": { 
    initials: "dh"
  },
  "isi4ih": { 
    initials: "tvc"
  },
  "kin4ne": { 
    initials: "ahr"
  },
  "alj42": { 
    initials: "al"
  },
  "eku4em": { 
    initials: "af",
    name: "Anne Fink"
  },
  "hun4et": { 
    initials: "ahs"
  },
  "bco42": { 
    initials: "bvc"
  },
  "heh42": { 
    initials: "he"
  },
  "rar1as": { 
    initials: "hh"
  },
  "lvp42": { 
    initials: "lvp"
  },
  "put2ud": { 
    initials: "mr"
  },
  "nik9ed": { 
    initials: "mkl"
  },
  "fyn2se": { 
    initials: "mas"
  },
  "vyk8id": { 
    initials: "mka"
  },
  "ymy7uf": { 
    initials: "mss"
  },
  "YMY7UF": { 
    initials: "mss"
  },
  "mnn42": { 
    initials: "mnn"
  },
  "bli3mi": { 
    initials: "rvc"
  },
  "ruv7vi": { 
    initials: "vtl"
  },
  "beh8dy": { 
    initials: "sks"
  },
// *** OP sygeplejersker ***//
  "udu1in": { 
    initials: "ah"
  }
};

// OLD VERSION
// Return original or extra-enhanced clinician
/*function getClinicianDetails(c) {
  var extraInfo = extras[c[3]];
  return {
    name: (extraInfo && (extras[c[3]].name || c[1])) || c[1],
    title: (extraInfo && (extras[c[3]].title || c[2])) || c[2],
    username: c[3],
    initials: extraInfo && extras[c[3]].initials || ""
  };
}


// Read the kliniker field - expects a format like "Jonathan Bunde-Pedersen (Some title goes here) jonathan",
// then use a regular expression to extract the name, title and username
//var c = Fields["Notat - Kliniker"].read().items[0].match(/([^\(]+)\s+\(([^\)]+)\)\s*(.*)/);
var c;
Settings.CommandRetries = 5;
try {
  c = Fields["Notat - kliniker 2"].read().match(/([^\(]+)\s+\(([^\)]+)\)\s*(.*)/);
} catch(err) {
  var t = Window.title().match(/[^.,]+[.,]\s*([^,]+)[.,]\s*\((.*)\)/);
  c = ["",t[1],"",t[2]];
}*/

// NEW VERSION 22/11 2017
// Return original or extra-enhanced clinician
function getClinicianDetails(c) {
  var extraInfo = extras[c[4]];
  return {
    name: (extraInfo && (extras[c[4]].name || c[1])) || c[1],
    title: (extraInfo && (extras[c[4]].title || c[3])) || c[3] || "",
    username: c[4],
    initials: extraInfo && extras[c[4]].initials || ""
  };
}

// Read the kliniker field - expects a format like "Jonathan Bunde-Pedersen (Some title goes here) jonathan",
// then use a regular expression to extract the name, title and username
var c;
try {
  c = Fields["Notat - kliniker 2"].read().match(/([^\(]+)\s+(\(([^\)]+)\))?\s*(.*)/);
} catch(err) {
  var t = Window.title().match(/[^.,]+[.,]\s*([^,]+)[.,]\s*\((.*)\)/);
  c = ["",t[1],"","",t[2]];
}

Settings.CommandRetries = StdRetry;

// Put the clinician into a handy object, get initials by using the extras structure 
var clinician = getClinicianDetails(c);

// Now use the information somehow
//Debug.showDialog("Personnel details; name = "+clinician.name+", title = "+clinician.title+", username = "+clinician.username+", initials = "+clinician.initials);
