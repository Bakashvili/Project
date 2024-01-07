
const Sequelize = require('sequelize');
module.exports = function(sequelize){
const Result = sequelize.define("Result", {
  Id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  UserId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  Score: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  Times: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
},
  {
    timestamps: false,
    freezeTableName: true,
    nameTable:'Result'
  });

  Result.associate = function(models) {
    this.belongsTo(models.User, { foreignKey: 'UserId' });
  };

  return Result;
};

  