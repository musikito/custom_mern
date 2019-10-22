const router = require('express').Router();
let Expense = require('../models/expense.model');

router.route('/').get((req, res) => {
    Expense.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newExpense = new Expense({
    username,
    description,
    date,
  });

  newExpense.save()
  .then(() => res.json('Expense added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;