
const Sequelize = require('sequelize');
const sequelize = new Sequelize("cssgriddb","root","Kartoshka",
{
 dialect:"mysql",
 host : "127.0.0.1",
 logging: false
});
const User = require('./User')(sequelize);
const Result = require('./Result')(sequelize);
const Level = require('./Level')(sequelize);
const Levelanswer = require('./Levelanswer')(sequelize);
const Trainsession = require('./Trainsession')(sequelize);
module.exports = {
    sequelize : sequelize,
    User : User,
    Result : Result,
    Level: Level,
    Levelanswer: Levelanswer,
    Trainsession:Trainsession,
}
User.hasMany(Result, {foreignKey: 'UserId'});
Result.belongsTo(User);
//sUser.hasMany(Result);
//Result.belongsTo(User);
// Levelanswer.belongsTo(User, { foreignKey: 'UserId' });
// Levelanswer.belongsTo(Level, { foreignKey: 'LevelId' });
// Levelanswer.belongsTo(Trainsession, { foreignKey: 'TrainsessionId' });
//User.hasMany(Result, { foreignKey: 'UserId' });
// Result.belongsTo(User, { foreignKey: 'UserId' });

 //Trainsession.belongsTo(User, { foreignKey: 'UserId' });

  User.associate = function(models) {
    this.hasMany(models.Result, { foreignKey: 'UserId' });
  };
  
//   // В модели Result
   Result.associate = function(models) {
    this.belongsTo(models.User, { foreignKey: 'UserId' });
   };