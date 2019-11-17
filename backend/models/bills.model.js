const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billsSchema = new Schema({
    bill:{
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
      },
      amount: { 
        type: Number, 
        required: true 
      },
      paidby: {
          type: Date,
          required: true
      },
      description: {
          type: String
      },
      planned:{
          type:Boolean
      }

},{
    timestamps: true,
});

const Bills = mongoose.model('Bills', billsSchema);
module.exports = Bills;

//module.exports = Bills = mongoose.model("bills",billsSchema)