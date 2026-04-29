const express = require('express');
const Playlist = require('../models/Playlist');
const Video = require('../models/Video');

const router = express.Router();

router.get('/playlists', async (req, res) => {
  let username = String(req.query.username ?? '').trim();
  let search = username ? { author: username } : {};
  let playlists = await Playlist.find(search).lean();
  res.send(playlists);
});

router.get('/playlist', async (req, res) => {
  let title = String(req.query.title ?? '').trim();
  let author = String(req.query.author ?? '').trim();
  let playlist = await Playlist.findOne({ title, author }).lean();

  if (!playlist) {
    res.status(404).send({ ok: false, error: 'Плейлист не найден.' });
    return;
  }

  let videos = await Video.find({
    playlist: title,
    author
  })
    .sort({ likes: -1 })
    .lean();

  res.send({
    ok: true,
    playlist,
    videos
  });
});

module.exports = router;
