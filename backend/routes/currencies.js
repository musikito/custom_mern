const router = require('express').Router();
let Currency= require('../models/currency.model');

router.route('/').get((req, res) => {
    Currency.find()
    .then(currencies => res.json(currencies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const currency = req.body.currency;

  const newCurrency = new Currency({currency});

  newCurrency.save()
    .then(() => res.json('Currency added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;