"use strict";

const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');

router.get('/random', (req, res) => {
  jsonfile.readFile('./storage/unsplash.json', (err, obj) => {
    if (err) {
      res.send(500);
    }
    res.status(200).send(obj);
  });
});

module.exports = router;