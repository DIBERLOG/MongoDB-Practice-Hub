const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const RelationProduct = require('../models/RelationProduct');

const router = express.Router();

router.get('/orders/summary', async (req, res) => {
  let order = await Order.findOne().lean();

  if (!order) {
    res.status(404).send({ ok: false, error: 'Заказы не найдены.' });
    return;
  }

  let [user, product] = await Promise.all([
    User.findOne({ email: order.user }).lean(),
    RelationProduct.findOne({ title: order.product }).lean()
  ]);

  res.send({
    ok: true,
    order,
    summary: {
      user: user?.email || '',
      address: user?.address || '',
      product: product?.title || '',
      price: product?.price ?? null
    }
  });
});

module.exports = router;
