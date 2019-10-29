const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
  currency: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});
mongoose.models = {};
const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;