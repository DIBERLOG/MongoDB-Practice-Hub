const mongoose = require('mongoose');

const relationProductSchema = new mongoose.Schema(
  {
    title: String,
    price: Number
  },
  {
    collection: 'relation_products'
  }
);

module.exports =
  mongoose.models.RelationProduct || mongoose.model('RelationProduct', relationProductSchema);
