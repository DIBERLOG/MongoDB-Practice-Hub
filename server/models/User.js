const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: String,
    address: String
  },
  {
    collection: 'users'
  }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
