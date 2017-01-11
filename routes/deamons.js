/**
 * Get a random quote from evene
 * and save it to /storage/quote.json
 * @param {Object} libs - This object must contain jsdom node module in order to work
 */
function quote(jsdom, jsonfile) {
  let number = Math.floor(Math.random() * (339 - 0)) + 0;

  jsdom.env({
    url: "http://evene.lefigaro.fr/citations/citation-jour.php?page=" + number,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      let quote, author, ref;
      let $ = window.$, articles = $('article');

      for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        let artContent = $(article).html();
        quote = $(artContent).find('a').html();
        let authorAndRef = $(artContent).find('.figsco__fake__col-9').text();

        if (!authorAndRef) continue;

        let slash = authorAndRef.indexOf('/');

        if (slash > 0) {
          author = authorAndRef.substr(0, slash);
          ref = authorAndRef.substr(slash + 2, authorAndRef.length - 1);
        } else {
          author = authorAndRef;
        }

        author = author.replace(/\s{2}/g, '').replace(/Vos avis(.)*:/g, '').substr(4);
        ref = ref ? ref.replace(/\s{2}/g, '').replace(/Vos avis(.)*:/g, '') : '';

        break;
      }

      let quoteResult = {content: quote, author: author, ref: ref};
      jsonfile.writeFile('./storage/quote.json', quoteResult, function(err, obj) {
          if (err) {
            console.error(err);
          }
          // console.log('quote file saved successfully.');
      });
    }
  });
}

/**
 * Get a random picture from unsplash
 * and save it as an objet to /storage/unsplash.json
 * @param {Object} libs - Must contain a reference to node-fetch and jsonfile modules
 */
function unsplash(fetch, jsonfile) {
  fetch('https://api.unsplash.com/photos/random', {
    headers: {
        'Authorization': 'Client-ID ' + process.env.UNSPLASH_CLIENT_ID
      }
    })
  .then(function(res) {
      return res.json();
  })
  .then(function(json) {
    jsonfile.writeFile('./storage/unsplash.json', json, function(err, obj) {
      if (err) {
        console.error(err);
      }
      // console.log('unsplash file saved successfully.');
    });
  });
}

/**
 * Start deamons periodically
 * @param {Object} libs - required librairies
 */
function start(libs) {
  let jsonfile = libs.jsonfile;

  setInterval(function () {
    quote(libs.jsdom, jsonfile);
    unsplash(libs.fetch, jsonfile);
}, 1000 /*ms*/ * 60 /*sec*/ * 60 /*min*/);
}

module.exports = start;