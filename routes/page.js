const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/new-download', (req, res) => {
  fs.readFile('./count.json', (err, data) => {
    if (err) throw err;

    let newCount;

    if (data) {
      newCount = JSON.parse(data) + 1;
    } else {
      newCount = 1;
    }

    fs.writeFile('./count.json', JSON.stringify(newCount), err => {
      if (err) {
        res.end();
      }

      res.status(200).end();
    });
  });
});

router.get('/count', (req, res) => {
  fs.readFile('./count.json', (err, data) => {
    if (err) throw err;

    let count;

    if (data) {
      count = JSON.parse(data);
    } else {
      count = 0;
    }

    res.send(`<h1>Download count is: ${count}</h1>`);
  });
});

router.delete('/count', (req, res) => {
  fs.writeFile('./count.json', null, err => {
    if (err) {
      res.end();
    }

    res.status(200).end();
  });
});

module.exports = router;
