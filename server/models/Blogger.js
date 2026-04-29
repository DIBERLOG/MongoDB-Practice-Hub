const mongoose = require('mongoose');

const bloggerSchema = new mongoose.Schema(
  {
    username: String,
    avatar: String,
    followers: Number
  },
  {
    collection: 'bloggers'
  }
);

module.exports = mongoose.models.Blogger || mongoose.model('Blogger', bloggerSchema);
