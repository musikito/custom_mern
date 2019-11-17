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
    const planned = req.body.planned;



    const newBill = new Bill({
        bill,
        date,
        category,
        paidby,
        amount,
        description,
        planned
    }); //end of payload

    // save it to the DB
    //newBill.save().then(bill => res.json(bill));
  newBill.save()
  .then(() => res.json('Bill added!'))
  .catch(err => res.status(400).json('Error: ' + err));

}); // end POST bills

// @route FIND models/bills
// @desc find bill ID  
// find the expense by ID
router.route('/:id').get((req, res) => {
    Bill.findById(req.params.id)
      .then(bill=> res.json(bill))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // @route DELETE models/bills
  // @desc DELETE a bill  
  // Delete BILL by ID
  router.route('/:id').delete((req, res) => {
    Bill.findByIdAndDelete(req.params.id)
      .then(() => res.json('Bill deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
 
 // @route UPDATE models/bills
 // @desc UPDATE a bill  
 // Update expense by ID
  router.route('/update/:id').post((req, res) => {
    Bill.findById(req.params.id)
      .then(bill => {
        bill.bill = req.body.bill;
        bill.description = req.body.description;
        bill.amount= Number(req.body.amount);
        bill.paidby = Date.parse(req.body.date);
        bill.date = Date.parse(req.body.date);
        bill.category = req.body.category;
        bill.planned = req.body.planned;
  
        bill.save()
          .then(() => res.json('Bill updated!'))
          
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;