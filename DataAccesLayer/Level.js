const Sequelize = require('sequelize');
module.exports = function(sequelize){
return sequelize.define("Level", {
  Id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  Texttask: {
    type:Sequelize.TEXT,
    allowNull: false
  },
  CorrectAnswer: {
    type: Sequelize.STRING,
    allowNull: false
  },
},
  {
    timestamps: false,
    freezeTableName: true,
    nameTable:'Level'
  }
)};


