// levelAnswer.model.js
const Sequelize = require('sequelize');
module.exports = function(sequelize){
return  sequelize.define("Levelanswer", {
  Id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  UserId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  LevelId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  TrainsessionId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  Value: {
    type: Sequelize.STRING,
    allowNull: true
  }},
  {
    timestamps: false,
    freezeTableName: true,
    nameTable:'Levelanswer'
  }
)};

// LevelAnswer.belongsTo(User, { foreignKey: 'User_Id' });
// LevelAnswer.belongsTo(Level, { foreignKey: 'Level_Id' });
// LevelAnswer.belongsTo(TrainSession, { foreignKey: 'TrainSession_Id' });

// module.exports = LevelAnswer;