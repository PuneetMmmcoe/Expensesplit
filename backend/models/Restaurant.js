const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  consumers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const RestaurantExpenseSchema = new mongoose.Schema({
  restaurant: String,
  date: Date,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  items: [ItemSchema],
  tip: Number,
  tax: Number
});

module.exports = mongoose.model('RestaurantExpense', RestaurantExpenseSchema);
