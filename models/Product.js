const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  keywords: [String],
  tax: {
    type: Number,
    required: true
  }
});

mongoose.model('product', ProductSchema);
