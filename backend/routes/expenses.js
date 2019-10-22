const router = require('express').Router();
let Expense = require('../models/expense.model');

// get all expenses
router.route('/').get((req, res) => {
    Expense.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const cost = Number(req.body.cost);
  const date = Date.parse(req.body.date);

  const newExpense = new Expense({
    username,
    description,
    cost,
    date,
  });

  // save it to the DB
  newExpense.save()
  .then(() => res.json('Expense added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// find the expense by ID
router.route('/:id').get((req, res) => {
    Expense.findById(req.params.id)
      .then(expense => res.json(expense))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // Delete expense by ID
  router.route('/:id').delete((req, res) => {
    Expense.findByIdAndDelete(req.params.id)
      .then(() => res.json('Expense deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // Update expense by ID
  router.route('/update/:id').post((req, res) => {
    Expense.findById(req.params.id)
      .then(expense => {
        expense.username = req.body.username;
        expense.description = req.body.description;
        expense.cost = Number(req.body.cost);
        expense.date = Date.parse(req.body.date);
  
        expense.save()
          .then(() => res.json('Expense updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;