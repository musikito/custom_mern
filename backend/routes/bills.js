const router = require('express').Router();
let Bill = require('../models/bills.model');

// @route GET models/bills
// @desc Get all bills
router.route('/').get((req, res) => {
    Bill.find()
    // Sort by descending date
    // 1 equal to ascending
    .sort({ date: -1 })
    .then(bills => res.json(bills))
    .catch(err => res.status(400).json("Error: " + err));
}); // end of GET request

// @route POST models/bills
// @desc ADD/POST bills
router.route('/add').post((req, res) => {
    const bill = req.body.bill;
    const date = Date.parse(req.body.date);
    const category = req.body.category;
    const paidby = Date.parse(req.body.date);
    const amount = Number(req.body.amount);
    const description = req.body.description;



    const newBill = new Bill({
        bill,
        date,
        category,
        paidby,
        amount,
        description
    }); //end of payload

    // save it to the DB
    //newBill.save().then(bill => res.json(bill));
  newBill.save()
  .then(() => res.json('Bill added!'))
  .catch(err => res.status(400).json('Error: ' + err));

}); // end POST bills



module.exports = router;