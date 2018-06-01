// Get cpr from either input or state
var cpr = Inputs["cpr"] || Inputs["User.Id.[org.dk]Cpr.Number"]; //"251248-9996";
var shouldFocus = Inputs["shouldFocus"] === "yes" || !Inputs["shouldFocus"];

// Max number of items to display
var maxItems = parseInt(Inputs["maxItems"], 10) || 20;

// Indices for table
var cprIdx = 0;
var lastNameIdx = 1;
var firstNameIdx = 2;
var timeIdx = 3;
var genderIdx = 4;
var dobIdx = 5;
var typeIdx = 6;
var statusIdx = 7;

// Parse a single page and return a list of pdf preview sticky items
function parsePage(p, allCollapsed) {
  var pdfs = p.xpath("//tr[contains(@class, 'odd') or contains(@class, 'even')]");
  var previews = [];
  if (pdfs !== null && pdfs.length > 0) {

    // Get list of all pdfs
    for (var i=0; i<pdfs.length; i++) {

      var row = pdfs[i];
      var anchor = row.xpath("//a")[0];
      var pdfUrl = "http://srvesbappmus07v.rsyd.net/" + anchor.attrs.href.replace("Preview", "Detail");

      previews.push({ 
        type: "PDF", 
        source: pdfUrl, 
        header: row.children[typeIdx].innerText, 
        body: row.children[timeIdx].innerText,
        height: 200,
        linkText: "",
        link: "preview://",
        collapsible: true,
        saveable: false,
        collapsed: allCollapsed || i !== 0
      });
    }
  }
  return previews;
}

// Recursive function to follow pagination, pushing new items onto the array given
function followPagination(url, pdfs, max) {
  var r = Http.get("http://srvesbappmus07v.rsyd.net" + url.replace("&amp;", "&"), {});
  if (r.status === 200) {
    var page = Html.load(r.data);
    var previews = parsePage(page, true);
    var currentLength = pdfs.length;
    for (var i=0; i<previews.length && i+currentLength <= max; i++) {
      pdfs.push(previews[i]);
    }
    
    // recursive step
    var nextPageAnchor = page.xpath("//a[contains(@class, 'paginationNext')]");
    if (pdfs.length < maxItems && nextPageAnchor && nextPageAnchor.length > 0) {
      followPagination(nextPageAnchor[0].attrs.href, pdfs, max);
    }
  }
}

var reply = Http.post(
  "http://srvesbappmus07v.rsyd.net/Patients/SearchByID","PatientID="+cpr,
  { "contenttype": "application/x-www-form-urlencoded", "accept": "*/*" }
);

// Now follow redirects
while(reply.status === 302) {
  var url = reply.headers["Location"];
  reply = Http.get(url, {});
  Debug.showDialog(url + "-" + reply.status);
}

// If we get an OK back we start parsing, and construction of the sticky to show
if (reply.status === 200) {
  var d = Html.load(reply.data);
  
  var pdfs = d.xpath("//tr[contains(@class, 'odd') or contains(@class, 'even')]");
  var stickyItems = [];
  if (pdfs === null || pdfs.length === 0) {
    stickyItems.push({
      type: "LINK",
      //link: "http://srvesbappmus07v.rsyd.net/TestPage.asp?PID="+cpr+"&LastName=&FirstName=&Server1=on",
      prefix: !cpr || cpr === "-" || cpr === "undefined" ? "Ingen patient valgt." : "Ingen resultater fundet for "+cpr+"."
    });
    
  } else {
  
    // Get information about patient from 1st line in table
    var ln = pdfs[0].children[lastNameIdx].innerText;
    var fn = pdfs[0].children[firstNameIdx].innerText;
    var c = pdfs[0].children[cprIdx].innerText;
    var g = pdfs[0].children[genderIdx].innerText;
    
    stickyItems.push({
      type: "HTML",
      source: "<h4>"+ln+", "+fn+"</h4><p><span style=\"float: left;\">"+c + "</span><span style=\"float: right;\">" +(g === "Kvinde" ? "♀" : "♂") +"<span></p>",
      height: 100
    });

    // Get 1st page results
    var previews = parsePage(d, false);
    for (var i=0; i<previews.length; i++) {
      stickyItems.push(previews[i]);
    }
    
    // If < max then try to follow pages
    var nextPageAnchor = d.xpath("//a[contains(@class, 'paginationNext')]");
    if (stickyItems.length - 1 < maxItems && nextPageAnchor && nextPageAnchor.length > 0) {
      followPagination(nextPageAnchor[0].attrs.href, stickyItems, maxItems);
    }
    
    // If there are more than <maxItem> items, add link to open MUSE
    if (pdfs.length === maxItems) {
      stickyItems.push({
       type: "ACTION",
       name: "Show sticky MUSE",
       header: "Der var >"+maxItems+" resultater.",
       inputs: { maxItems: maxItems + 20 },
       body: "Klik for at hente flere"
     });
    }
  }
  Sticky.open(
    "muse",
    { 
      embed: false,
      focusOnUpdate: shouldFocus,
      title: "MUSE",
      location: 
      { type: "absolute",
       top: 100,
       left: 500,
       width: 400,
       height: 600
      },
      items: stickyItems
    });
} else {
  Dialog.warn("Fejl", "Kunne ikke hente data fra MUSE");
}