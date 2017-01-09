"use strict";

const express = require('express');
const router = express.Router();
const jsdom	= require('jsdom');
const jsonfile = require('jsonfile');

router
.get('/random', (req, res) => {
  jsonfile.readFile('./storage/quote.json', (err, obj) => {
    if (err) {
      res.send(500);
    }
    res.status(200).send(obj);
  });
})
.get('/last', (req, res) => {
  jsdom.env({
    url: "http://evene.lefigaro.fr/citations/citation-jour.php",
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      let quoteResult, author, ref;

      let $ = window.$;
      let articles = $('article');

      for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        let artContent = $(article).html();
        let quote = $(artContent).find('a').html();
        let authorAndRef = $(artContent).find('.figsco__fake__col-9').text();

        if (!authorAndRef) continue;

        let slash = authorAndRef.indexOf('/');

        if (slash > 0) {
          author = authorAndRef.substr(0, slash);
          ref = authorAndRef.substr(slash + 2, authorAndRef.length - 1);
        } else {
          author = authorAndRef;
        }

        quoteResult = quote;
        author = author.replace(/\s{2}/g, '').replace(/Vos avis(.)*:/g, '').substr(4);
        ref = ref ? ref.replace(/\s{2}/g, '') : '';

        break;
      }

      res.status(200).send({content: quoteResult, author: author, ref: ref});
    }
  });
});

module.exports = router;