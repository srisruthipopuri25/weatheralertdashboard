const express = require('express');
const detectAnomaly = require('../services/anamolyservice');

const router = express.Router();

// Called ONLY on page refresh
router.get('/analyze', async (req, res) => {
  const result = await detectAnomaly();
  res.json(result || { isAnomaly: false });
});

module.exports = router;
