const express = require('express');
const Actor = require('../models/Actor');
const City = require('../models/City');
const parseMongoJson = require('../utils/parseMongoJson');
const buildSafeMongoQuery = require('../utils/safeMongoQuery');

const router = express.Router();
const COLLECTIONS = {
  actors: Actor,
  cities: City
};

router.post('/query', async (req, res) => {
  try {
    let collection = String(req.body.collection ?? '').trim();
    let filter = parseMongoJson(req.body.filter ?? '{}', {});
    let sort = parseMongoJson(req.body.sort ?? '{}', {});
    let query = buildSafeMongoQuery({
      collection,
      filter,
      sort,
      limit: req.body.limit,
      allowedCollections: Object.keys(COLLECTIONS)
    });

    let Model = COLLECTIONS[collection];
    let [count, documents] = await Promise.all([
      Model.countDocuments(query.filter),
      Model.find(query.filter).sort(query.sort).limit(query.limit).lean()
    ]);

    res.send({
      ok: true,
      count,
      documents
    });
  } catch (error) {
    res.status(400).send({
      ok: false,
      error: error.message
    });
  }
});

module.exports = router;
