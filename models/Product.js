const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String
  },
  productImage: {
    type: String
  },
  productPrice: {
    type: Number
  },
  productVat: {
    type: Number
  },
  productNetPrice: {
    type: Number
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  productSubhead: {
    type: String
  },
  productFileUpload:{
    type: String
  },
  productExternalUrl: {
    type: String
  },
  companyId: {
    type: String,
    required: true
  }
});

module.exports = Product = mongoose.model('Product', ProductSchema);