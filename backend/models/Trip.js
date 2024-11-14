const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  splitBetween: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const TripSchema = new mongoose.Schema({
  name: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expenses: [ExpenseSchema],
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model('Trip', TripSchema);