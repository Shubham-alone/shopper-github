const mongoose = require('mongoose');

const productSchema =new mongoose.Schema({
  id:Number,
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  subCategory: String,
  bestseller: Boolean,
  sizes: Array,
  date: {
    type: Date
  }
});

module.exports = mongoose.model('product', productSchema, 'namak');
