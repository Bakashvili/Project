const express = require('express');
const LevelService = require('../Api_Services/LevelServices');
const Level = require('../DataAccesLayer/Level');

const router = express.Router();

router.post('/answer', async (req, res) => {
  const { userId, levelId, answer } = req.body;
  const result = await LevelService.postAnswer(userId, levelId, answer);
  if (result.success) {
    res.json({ message: 'Answer posted successfully' });
  } else {
    res.status(400).json({ message: result.message });
  }
});

router.post('/start', async (req, res) => {
  const { userId, correctAnswer } = req.body;
  const result = await LevelService.startLevel(userId, correctAnswer);
  if (result.success) {
    res.json({ message: 'Level started successfully' });
  } else {
    res.status(400).json({ message: result.message });
  }
});

router.post('/end', async (req, res) => {
  const { userId } = req.body;
  const result = await LevelService.endLevel(userId);
  if (result.success) {
    res.json({ message: 'Level ended successfully' });
  } else {
    res.status(400).json({ message: result.message });
  }
});

const addPost = (req, res) => {
  const { Texttask, CorrectAnswer } = req.body;
  const Level = new Level({Texttask, CorrectAnswer });
  Level
    .save()
    .then((Level) => res.status(200).json(Level))
    .catch((error) => handleError(res, error));
}
module.exports = {
  addPost,

};