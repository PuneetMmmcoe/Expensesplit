const express = require('express');
const router = express.Router();
const RestaurantExpense = require('../models/RestaurantExpense');

router.post('/', async (req, res) => {
  try {
    const { restaurant, date, participants, items, tip, tax } = req.body;
    const expense = new RestaurantExpense({ restaurant, date, participants, items, tip, tax });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant expense' });
  }
});

module.exports = router;