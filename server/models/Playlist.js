const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    title: String,
    author: String
  },
  {
    collection: 'playlists'
  }
);

module.exports = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);
