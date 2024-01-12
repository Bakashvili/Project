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
const Levelanswer = require('../DataAccesLayer/Levelanswer')(sequelize);
const Trainsession = require('../DataAccesLayer/Trainsession')(sequelize);
class LevelController {
  async createSession(authToken)
  {
    try{
    const decodedToken = await jwt.validateAccessToken(authToken);
    if (!decodedToken) {
      throw new Error('Token is not verifyed');
    } 
    const user = await User.findOne({ where: { Uid: authToken } });
    if (!user) {
      throw new Error('User not found');
    }
    console.log(user);
    const session = await Trainsession.create({UserId:user.Id});
    console.log(session);
    if (!session) {
      throw new Error("Session isn't created");
    }
    console.log(session.Id);
    return session.Id;
  }catch(error){
    
  }
    

}
  async getLevel() {
    try {
      const levels = await Level.findAll({ limit: 10, attributes: ['Id', 'Texttask'] });;
      return levels; 
      
    } catch (error) {
      throw new Error('Failed to get Level');
    }
  }
  async sendAnswer(authToken,answers,id,session) {
    try {
      const decodedToken = await jwt.validateAccessToken(authToken);
      console.log(decodedToken);
      if (!decodedToken) {
        throw new Error('Token is not verifyed');
      } 
      
      console.log(authToken,answers,id,session);
      const level = await Level.findOne({where : { Id: id }});

      console.log(level.Id);
      // if (answer === level.CorrectAnswer) {
      //   checked = true;
      // }
      const user = await User.findOne({ where: { Uid: authToken } });
      if (!user) {
        throw new Error('User not found');
      }
      console.log(session);
      console.log( user.Id,session, id, answers);
      //const levelfind = await Levelanswer.findAll({ where: { TrainsessionId: session, LevelId: level.Id } });
      
      //console.log(levelfind);
      //if(!levelfind){
        const currentLevel = await Levelanswer.create( {UserId : user.Id, LevelId: level.Id, TrainsessionId: session, Value: answers});
        return currentLevel;
      // }else{
      //   levelfind.Value = answers;
      //   await levelfind.save();
      //   return levelfind;
      // }
          
    
      // const result = await Result.findOne({ where: { UserId: user.Id } });
      // if (checked == true) {
      //   result.Score = result.Score + 1; 
      //  await result.save();
      // } 
      //return result;
      
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

      const result = await Result.create({ UserId: user.Id, Score: 0, Times: 0 });
    const currentsession = await Levelanswer.max('TrainSessionId', {
      where: {
        UserId: user.Id
      }
    });
    console.log(currentsession);
    for (let i = 1; i < 11; i++) {
      const answers = await Levelanswer.findOne({ where: { TrainsessionId: currentsession, LevelId: i } });
      console.log(answers);
      const Coranswer = await Level.findOne({ where: { Id: i } });
      console.log(Coranswer);
      if (answers.Value === Coranswer.CorrectAnswer) {
        result.Score = result.Score + 1;
      }
    }

    await result.save();
    return result.Score;
  }catch (error) {
    throw new Error('Failed to Update score');
  }
  
}

}
module.exports = new LevelController();
