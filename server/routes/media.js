const express = require('express');
const Video = require('../models/Video');
const Blogger = require('../models/Blogger');
const Playlist = require('../models/Playlist');

const router = express.Router();

router.get('/videos', async (req, res) => {
  let limit = Number(req.query.limit ?? 10);
  if (!Number.isFinite(limit)) {
    limit = 10;
  }
  limit = Math.max(1, Math.min(50, Math.floor(limit)));

  let videos = await Video.find().sort({ likes: -1 }).limit(limit).lean();
  res.send(videos);
});

router.get('/video', async (req, res) => {
  let id = String(req.query.id ?? '').trim();
  let video = await Video.findById(id).lean();

  if (!video) {
    res.status(404).send({ ok: false, error: 'Видео не найдено.' });
    return;
  }

  let recommendations = await Video.find({
    author: video.author,
    _id: { $ne: video._id }
  })
    .sort({ likes: -1 })
    .limit(3)
    .lean();

  res.send({
    ok: true,
    video,
    recommendations
  });
});

router.get('/blogger', async (req, res) => {
  let username = String(req.query.username ?? '').trim();
  let blogger = await Blogger.findOne({ username }).lean();

  if (!blogger) {
    res.status(404).send({ ok: false, error: 'Блогер не найден.' });
    return;
  }

  let [videos, playlists] = await Promise.all([
    Video.find({ author: username }).sort({ likes: 1 }).lean(),
    Playlist.find({ author: username }).lean()
  ]);

  res.send({
    ok: true,
    blogger,
    videos,
    playlists
  });
});

module.exports = router;
