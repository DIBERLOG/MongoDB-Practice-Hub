const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: String,
    product: String
  },
  {
    collection: 'orders'
  }
);

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
