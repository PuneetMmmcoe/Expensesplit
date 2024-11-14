const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.post('/', async (req, res) => {
  try {
    const { name, participants, startDate, endDate } = req.body;
    const trip = new Trip({ name, participants, startDate, endDate });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip' });
  }
});

module.exports = router;

router.post('/:tripId/expenses', async (req, res) => {
    try {
      const { description, amount, paidBy, splitBetween } = req.body;
      const trip = await Trip.findById(req.params.tripId);
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
      trip.expenses.push({ description, amount, paidBy, splitBetween });
      await trip.save();
      res.status(201).json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Error adding expense' });
    }
  });