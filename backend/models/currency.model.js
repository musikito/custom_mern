const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cureencySchema = new Schema({
  category: {
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
const Currency = mongoose.model('User', cureencySchema);

module.exports = Currency;