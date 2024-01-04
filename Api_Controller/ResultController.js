const express = require('express');
const ResultService = require('../Api_Services/ResultServices');


const router = express.Router();

router.get('/leaders', async (req, res) => {
  const result = await ResultService.getLeaders();
  if (result.success) {
    const leaders = result.data;
    res.json(leaders);
  } else {
    res.status(400).json({ message: result.message });
  }
});

router.post('/post-result', async (req, res) => {
  const { userId, score, levelId } = req.body;
  const result = await ResultService.postResult(userId, score, levelId);
  if (result.success) {
    res.json({ message: 'Result posted successfully' });
  } else {
    res.status(400).json({ message: result.message });
  }
});

module.exports = router;