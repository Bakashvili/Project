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
var jwt = require('../jwt-utils');
class LevelController {
  async getLevel() {
    try {
      const level = await Level.findOne({ where: { Id: 1} });
      return level; 
      
    } catch (error) {
      throw new Error('Failed to get Level');
    }
  }
  async sendAnswer(answer, authToken) {
    try {
      var checked = false;
      const decodedToken = await jwt.validateAccessToken(authToken);
      console.log(decodedToken);
      if (!decodedToken) {
        throw new Error('Token is not verifyed');
      } 
      console.log(checked);
      const level = await Level.findOne({ where: { Id: 1 } });
      if (answer || answer === level.CorrectAnswer) {
        checked = true;
      }
      console.log(checked);
      const user = await User.findOne({ where: { Uid: authToken } });
      if (!user) {
        throw new Error('User not found');
      }
     console.log(user);
      const result = await Result.findOne({ where: { UserId: user.Id } });
      if (checked == true) {
        result.Score = result.Score + 1; 
       await result.save();
      } 
      console.log(result);
      return result;
    } catch (error) {
      throw new Error('Failed to send answer');
    }
  }
  async UpdateScore(authToken) { //UserId
    try {
      const decodedToken = await jwt.validateAccessToken(authToken);
      if (!decodedToken) {
        throw new Error('Token is not verifyed');
      } 
      console.log(decodedToken);
      const user = await User.findOne({ where: { Uid: authToken } });
    if (!user) {
      throw new Error('User not found');
    }
   console.log(user);
    const result = await Result.findOne({ where: { UserId: user.Id } });
    if (!result) {
      result = await Result.create({ UserId: user.Id, Score: 0, Times: 0 });
    }
    await result.save();
    return result.Score;
  }catch (error) {
    throw new Error('Failed to Update score');
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