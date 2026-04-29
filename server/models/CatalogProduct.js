const mongoose = require('mongoose');

const catalogProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    isOnSale: Boolean,
    likes: Number,
    category: String
  },
  {
    collection: 'catalog_products'
  }
);

module.exports = mongoose.models.CatalogProduct || mongoose.model('CatalogProduct', catalogProductSchema);
