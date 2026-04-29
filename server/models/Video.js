const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    preview: String,
    likes: Number,
    youtube: String,
    playlist: String
  },
  {
    collection: 'videos'
  }
);

module.exports = mongoose.models.Video || mongoose.model('Video', videoSchema);
