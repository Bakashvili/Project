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
const Trainsession = require('../DataAccesLayer/Trainsession');
class LevelController {
  async getLevel() {
    try {
      const levels = await Level.findAll({ limit: 10, attributes: ['Id', 'Texttask'] });;
      return levels; 
      
    } catch (error) {
      throw new Error('Failed to get Level');
    }
  }
  async sendAnswer(answer, Id, authToken) {
    try {
      var checked = false;
      const decodedToken = await jwt.validateAccessToken(authToken);
      //console.log(decodedToken);
      if (!decodedToken) {
        throw new Error('Token is not verifyed');
      } 
     // console.log(checked);
      const level = await Level.findOne({ where: { Id: Id } });
      console.log(Id, level, answer);
      if (answer === level.CorrectAnswer) {
        checked = true;
      }
      console.log(checked, level.CorrectAnswer);
      const user = await User.findOne({ where: { Uid: authToken } });
      if (!user) {
        throw new Error('User not found');
      }
     
      const result = await Result.findOne({ where: { UserId: user.Id } });
  
      if (checked == true) {
        result.Score = result.Score + 1; 
       await result.save();
      } 
      console.log(checked);
      //console.log(result);
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
  // const findsession = await Trainsession.create({UserId: user.Id});
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
