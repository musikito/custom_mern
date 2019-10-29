const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// TODO:
// add type of transaction :
// cash, debit, credit, Paypal, online etc
const expenseSchema = new Schema({
  username: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  cost: { 
    type: Number, 
    required: true 
  },
  currency: {
    type: String,
    required: true
  },
  date: { 
    type: Date, 
    required: true 
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;

