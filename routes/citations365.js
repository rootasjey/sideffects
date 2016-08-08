"use strict";

const express = require('express');
const router = express.Router();
const phantom = require('phantom');
const jsdom	= require('jsdom');
const later = require('later');
const request = require('request');

const BG_PHONE_NAME = 'phone.png';
const BG_PHONE_PATH = getRoot() + '\\public\\modules\\citations365\\walls\\phone.png';

const BG_PC_NAME = 'pc.png';
const BG_PC_PATH = getRoot() + '\\public\\modules\\citations365\\walls\\pc.png';

// Schedule
const wallpaperSched = later.parse.recur().every(1).hour();
const wallTimer = later.setInterval(generateWallpapers, wallpaperSched);

function generateWallpapers() {
  console.log('screen!');
  screenshot('phone');
  screenshot('pc');
}

function screenshot(device) {
  // var url = 'http://www.sideffects.fr/api/365/screenshot?device=' + device;
  var url = 'http://localhost:3003/api/365/screenshot?device=' + device;
  request(url);
}

/**
  * Return the root folder path
  * @return {string} the current folder path
  */
function getRoot() {
	return __dirname.substr(0, __dirname.lastIndexOf('\\'));
}

// ///////////
// ::ROUTES ::
// ///////////
router.get('/screenshot', function (req, res) {
	var sitepage = null;
	var phInstance = null;

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var lockscreenURL = fullUrl.substr(0, fullUrl.lastIndexOf('/')) + '/preview';

  var device = req.query.device;
  var backgroundPath = device === 'pc' ? BG_PC_PATH : BG_PHONE_PATH;

  if (device === 'pc') lockscreenURL += '?device=pc';

	phantom.create()
    .then(instance => {
      phInstance = instance;
      return instance.createPage();
    })
    .then(page => {
      sitepage = page;
      return page.open(lockscreenURL);
    })
    .then(status => {
      // console.log(status);
  		if(status === "success") {
		    sitepage.render(backgroundPath);
  		}

      return sitepage.property('content');
    })
    .then(content => {
      // console.log(content);
      sitepage.close();
      phInstance.exit();
      res.status(200).send('done');
    })
    .catch(error => {
      console.log(error);
      phInstance.exit();
      res.status(500).send(error);
    });
})

.get('/preview', function (req, res) {
  res.render('../public/modules/citations365/index', {
    device: req.query.device
  });
})

.get('/wallpaper', function (req, res) {
  var backgroundPath = req.query.device === 'pc' ? BG_PC_PATH : BG_PHONE_PATH;
  res.sendFile(backgroundPath);
})

.get('/quote', function (req, res) {
  jsdom.env({
    url: "http://evene.lefigaro.fr/citations/citation-jour.php",
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      var quote;
      var author;
      var ref;

      var $ = window.$;
      var articles = $('article');

      for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var artContent = $(article).html();
        var quote = $(artContent).find('a').html();
        var authorAndRef = $(artContent).find('.figsco__fake__col-9').text();

        if (!authorAndRef) continue;

        var slash = authorAndRef.indexOf('/');

        if (slash > 0) {
          author = authorAndRef.substr(0, slash);
          ref = authorAndRef.substr(slash + 2, authorAndRef.length - 1);
        } else {
          author = authorAndRef;
        }

        quote = quote;
        author = author.replace(/\s{2}/g, '').replace(/Vos avis(.)*:/g, '').substr(4);
        ref = ref ? ref.replace(/\s{2}/g, '') : '';

        break;
      }

      res.status(200).send({content: quote, author: author, ref: ref});
    }
  });
})

module.exports = router;
