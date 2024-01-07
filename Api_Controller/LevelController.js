const express = require('express');
//const LevelService = require('../Api_Services/LevelServices');

const Sequelize = require('sequelize');
const sequelize = new Sequelize("cssgriddb","root","Kartoshka",
{
 dialect:"mysql",
 host : "127.0.0.1",
 logging: false
});
const Level = require('../DataAccesLayer/Level')(sequelize);
const Result = require('../DataAccesLayer/Result')(sequelize);
const User = require('../DataAccesLayer/User')(sequelize);
class LevelController {
  async getLevel() {
    try {
      const level = await Level.findOne({ where: { Id: 1} });
      console.log(level);
      return level; 
      
    } catch (error) {
      throw new Error('Failed to get Level');
    }
  }
  async sendAnswer(answer) {
    try {
      
      const level = await Level.findOne({ where: { Id: 1 } });
      if (!answer || answer!== level.CorrectAnswer) {
        throw new Error('Answer is not correct');
      }
      
      return level; 
    } catch (error) {
      throw new Error('Failed to get Level');
    }
  }
  async increaseScore() { //UserId
    try {
      const result = await Result.findOne({ where: { UserId: 1 } });// UserId
      result.Score = (result.Score || 0) + 1; // Увеличение счета на 1
      await result.save(); // Сохранение изменений в базе данных
      return result.Score; // Возвращаем значение счета
    } catch (error) {
      throw new Error('Failed to increase score');
    }
  }
  async UpdateScore() { //UserId
    try {
      const result = await Result.findOne({ where: { UserId: 1 } });// UserId
      return result.Score; // Возвращаем значение счета
    } catch (error) {
      throw new Error('Failed to increase score');
    }
  }

  
}

module.exports = new LevelController();

// router.post('/answer', async (req, res) => {
//   const { userId, levelId, answer } = req.body;
//   const result = await LevelService.postAnswer(userId, levelId, answer);
//   if (result.success) {
//     res.json({ message: 'Answer posted successfully' });
//   } else {
//     res.status(400).json({ message: result.message });
//   }
// });

// router.post('/start', async (req, res) => {
//   const { userId, correctAnswer } = req.body;
//   const result = await LevelService.startLevel(userId, correctAnswer);
//   if (result.success) {
//     res.json({ message: 'Level started successfully' });
//   } else {
//     res.status(400).json({ message: result.message });
//   }
// });

// router.post('/end', async (req, res) => {
//   const { userId } = req.body;
//   const result = await LevelService.endLevel(userId);
//   if (result.success) {
//     res.json({ message: 'Level ended successfully' });
//   } else {
//     res.status(400).json({ message: result.message });
//   }
// });

// const addPost = (req, res) => {
//   const { Texttask, CorrectAnswer } = req.body;
//   const Level = new Level({Texttask, CorrectAnswer });
//   Level
//     .save()
//     .then((Level) => res.status(200).json(Level))
//     .catch((error) => handleError(res, error));
// }
// module.exports = {
//   addPost,

// };