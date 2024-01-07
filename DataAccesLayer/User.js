const Sequelize = require('sequelize');
module.exports = function(sequelize){
const User =  sequelize.define("User", {
  Id: {
    type:  Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  Uid: {
    type:  Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  Email: {
    type:  Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  Username: {
    type:  Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  Password: {
    type:  Sequelize.STRING,
    allowNull: false
  },},
  {
    timestamps: false,
    freezeTableName: true,
    nameTable:'User'
  });

  User.associate = function(models) {
    this.hasMany(models.Result, { foreignKey: 'UserId' });
  };
  return User};
  

//User.hasMany(Result, { foreignKey: 'UserId' });
