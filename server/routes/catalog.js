const express = require('express');
const CatalogProduct = require('../models/CatalogProduct');

const router = express.Router();

router.get('/products/discount', async (req, res) => {
  let products = await CatalogProduct.find({ isOnSale: true }).sort({ price: 1 }).limit(10).lean();
  res.send(products);
});

router.get('/products', async (req, res) => {
  let category = String(req.query.category ?? '').trim();
  let sort = Number(req.query.sort);
  let search = {};
  let sorting = {};

  if (category) {
    search.category = category;
  }

  if (sort === 1 || sort === -1) {
    sorting.price = sort;
  }

  let products = await CatalogProduct.find(search).sort(sorting).lean();
  res.send(products);
});

router.get('/product', async (req, res) => {
  let id = String(req.query.id ?? '').trim();
  let product = await CatalogProduct.findById(id).lean();

  if (!product) {
    res.status(404).send({ ok: false, error: 'Товар не найден.' });
    return;
  }

  res.send(product);
});

module.exports = router;
