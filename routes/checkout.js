const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecret);
const uuid = require('uuid/v4');

const router = express.Router();

router.post('/payment', (req, res) => {
  console.log(req.body);
  res.send({ type: 'POST' });
  const data = { ...req.body };
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: data.token.email,
      source: data.token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: data.item.buy * 0.08,
          currency: 'usd',
          customer: customer.id,
          receipt_email: data.token.email,
          description: `purchase of ${data.item.name}`,
          shipping: {
            name: data.token.card.name,
            address: {
              country: data.token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
