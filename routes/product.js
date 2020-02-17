const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Product model
require('../models/Product');
const Product = mongoose.model('product');

router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();

    products.sort(function(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    if (products) {
      res.status(200).send({ products });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get('/search', async (req, res) => {
  const { product } = req.query;

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: product, $options: 'i' } },
        { keywords: { $regex: product, $options: 'i' } }
      ]
    });

    products.sort(function(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    if (products.length > 0) {
      res.status(200).send({ products });
    } else {
      res.status(400).send({ message: 'Product is not registered yet' });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
