const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
  password: {
    type: String,
    required: true
  }
});

mongoose.model('admin', AdminSchema);
