const express = require('express');
const Ad = require('../models/Ad');

const router = express.Router();
const DEFAULT_AD_IMAGE = 'https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg';

function buildAdsSearch(query) {
  let search = {};
  let title = String(query.title ?? '').trim();
  let category = String(query.category ?? '').trim();
  let sort = Number(query.sort);
  let sorting = {};

  if (title) {
    search.title = { $regex: title, $options: 'i' };
  }

  if (category) {
    search.category = category;
  }

  if (sort === 1 || sort === -1) {
    sorting.price = sort;
  }

  return { search, sorting };
}

router.get('/ads', async (req, res) => {
  let { search, sorting } = buildAdsSearch(req.query);
  let ads = await Ad.find(search).sort(sorting).lean();
  res.send(ads);
});

router.get('/ads/my', async (req, res) => {
  let ads = await Ad.find({ isMine: true }).sort({ createdAt: -1 }).lean();
  res.send(ads);
});

router.get('/ad', async (req, res) => {
  let id = String(req.query.id ?? '').trim();
  let ad = await Ad.findById(id).lean();

  if (!ad) {
    res.status(404).send({ ok: false, error: 'Объявление не найдено.' });
    return;
  }

  res.send(ad);
});

router.post('/ads', async (req, res) => {
  try {
    let payload = {
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      image: String(req.body.image ?? '').trim() || DEFAULT_AD_IMAGE,
      isMine: true,
      asNew: Boolean(req.body.asNew)
    };

    let ad = new Ad(payload);
    await ad.save();
    res.status(201).send(ad);
  } catch (error) {
    res.status(400).send({ ok: false, error: error.message });
  }
});

router.put('/ads', async (req, res) => {
  try {
    let id = String(req.body.id ?? '').trim();
    let ad = await Ad.findById(id);

    if (!ad) {
      res.status(404).send({ ok: false, error: 'Объявление не найдено.' });
      return;
    }

    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.price = Number(req.body.price);
    ad.category = req.body.category;
    ad.image = String(req.body.image ?? '').trim() || DEFAULT_AD_IMAGE;
    ad.asNew = Boolean(req.body.asNew);

    await ad.save();
    res.send(ad);
  } catch (error) {
    res.status(400).send({ ok: false, error: error.message });
  }
});

router.delete('/ads', async (req, res) => {
  let id = String(req.query.id ?? '').trim();
  await Ad.deleteOne({ _id: id });
  res.sendStatus(200);
});

module.exports = router;
