
const Sequelize = require('sequelize');
module.exports = function(sequelize){
return  sequelize.define("Result", {
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
  }
)};

//Result.belongsTo(User, { foreignKey: 'User_Id' });
