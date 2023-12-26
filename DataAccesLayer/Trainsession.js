
const Sequelize = require('sequelize');
module.exports = function(sequelize){
return sequelize.define("Trainsession", {
  Id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  UserId: {
    type: Sequelize.BIGINT,
    allowNull: false
  }},
  {
    timestamps:false,
    freezeTableName: true,
    TableName: 'Trainsession',
  }
)};

// TrainSession.belongsTo(User, { foreignKey: 'User_Id' });

// module.exports = TrainSession;