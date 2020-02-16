const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const verifyPermission = require('../middlewares/verifyPermission');

// Load Admin model
require('../models/Admin');
const Admin = mongoose.model('admin');

// Load Product model
require('../models/Product');
const Product = mongoose.model('product');

router.post('/login', async (req, res) => {
  try {
    const admin = await Admin.findOne();
    const isMatch = await bcrypt.compare(req.body.password, admin.password);

    if (isMatch) {
      const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
      });

      res
        .header('auth-token', token)
        .status(200)
        .send({ message: 'You are now logged in' });
    } else {
      res.status(400).send({
        message:
          'There has been an error with your authentication. Please, try again'
      });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post('/add-products', verifyPermission, async (req, res) => {
  const { products } = req.body;

  try {
    const productsRes = await Product.insertMany(products);

    if (productsRes) {
      res.status(200).send({
        message: 'Products successfully added!',
        products: productsRes
      });
    }
  } catch (error) {
    res.status(400).send({
      error
    });
  }
});

router.delete('/product', verifyPermission, async (req, res) => {
  const { _id } = req.body;

  Product.findOneAndDelete({ _id })
    .then(product => {
      res
        .status(200)
        .send({ message: 'Product successfully deleted', product });
    })
    .catch(err => {
      res.status(400).send({ err });
    });
});

module.exports = router;
