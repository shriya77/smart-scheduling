const express = require('express');
const router = express.Router();
const { orchestrateBooking } = require('../functions/orchestrator');

// POST /book-session
router.post('/', async (req, res) => {
  try {
    const { requestedTopic, preferredTimes, preferredLanguage, studentInfo } = req.body;
    if (!requestedTopic || !preferredTimes || !studentInfo) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const result = await orchestrateBooking({ requestedTopic, preferredTimes, preferredLanguage, studentInfo });
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

module.exports = router;
