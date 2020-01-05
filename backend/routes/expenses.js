const express = require("express");
const router = express.Router();
const Expense = require('../models/expense.model');
const auth = require("../../middleware/auth");


// @route GET models/expense
// @desc Get all expenses
router.get("/",(req, res) => {
  Expense.find()
    .sort({ date: -1 })
    .then(expenses => res.json(expenses))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.post("/add", (req, res) => {
  //const username = req.body.username;
  const description = req.body.description;
  const cost = Number(req.body.cost);
  const currency = req.body.currency;
  const date = Date.parse(req.body.date);
  const category = req.body.category;
  const paidby = Date.parse(req.body.paidby);
  const planned = req.body.planned;

  const newExpense = new Expense({
    //username,
    description,
    cost,
    currency,
    date,
    category,
    paidby,
    planned
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
        //expense.username = req.body.username;
        expense.description = req.body.description;
        expense.cost = Number(req.body.cost);
        expense.currency = req.body.currency;
        expense.date = Date.parse(req.body.date);
        expense.category = req.body.category;
        expense.paidby = Date.parse(req.body.paidby);
        expense.planned = req.body.planned;
  
        expense.save()
          .then(() => res.json('Expense updated!'))
          
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;