const Sequelize = require('sequelize');
const sequelize = new Sequelize("cssgriddb","root","Kartoshka",
{
 dialect:"mysql",
 host : "127.0.0.1",
 logging: false
});
const User = require('../DataAccesLayer/User')(sequelize);
const Result = require('../DataAccesLayer/Result')(sequelize);
const Trainsession = require('../DataAccesLayer/Trainsession')(sequelize);
const Levelanswer = require('../DataAccesLayer/Levelanswer')(sequelize);
var config = { expiration: 600};
var jwt = require('../jwt-utils');
const bcrypt = require('bcrypt');
class UserAccountServices {
  async checkUser(email){
    try {
      const user = await User.findOne({ where: { Email: email } });
      if (user) {
        return null;
      } 
      return false;
    } catch (error) {
      throw new Error('Failed to check email');
    }

  }
  async checkUsername(username){
    try {
      const user = await User.findOne({ where: { Username: username } });
      if (user) {
        return null;
      } 
      return false;
    } catch (error) {
      throw new Error('Failed to check username');
    }

  }
  async generateToken(username){
    try { 
           const token = jwt.getNewAccessToken(username);
           console.log(token);
          return token; 
      
    } catch (error) {
      throw new Error('Failed to generate token');
    }

  }
  async createUser(userData) {
    try {
      const { username, email, password, token } = userData;
      console.log(token);
      const UserModel = await User.create({
        Uid: token, 
        Email: email,
        Username: username,
        Password: password, 
      });
      console.log(UserModel);
      return UserModel; 
      
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async authUser(userData) {
    try {
      const {email, password} = userData;
      const user = await User.findOne({ where: { Email: email } });
      console.log(user);
      const passwordMatch = await bcrypt.compare(password, user.Password);
      console.log(passwordMatch);
      if (!user || !passwordMatch) {
        throw new Error('Invalid email or password');
      }
      const token = await this.generateToken(user.Username);
      const result = await User.update({ Uid: token }, { where: { Username: user.Username } });
      return token;
      
    } catch (error) {
      throw new Error('Failed to authenticate user');
    }
  }

  async updateEmail(userData) {
    try {
      const {email, password, email2, authToken} = userData;
      const decodedToken = await jwt.validateAccessToken(authToken);
      if (!decodedToken) {
        throw new Error('Token is not verifyed');
      }
      const user = await User.findOne({ where: { Email: email } });
      console.log(email2)
      const passwordMatch = await bcrypt.compare(password, user.Password);
      console.log(passwordMatch);
      if (!user || !passwordMatch) {
        return null;
      }
      const updatedUser = await user.update({ Email: email2 });
       console.log(email2, user);
      return updatedUser;
      
    } catch (error) {
      throw new Error('Failed to update email');
    }
  }

  async deleteAccount(authToken) {
    try {
      const decodedToken = await jwt.validateAccessToken(authToken);
      if (!decodedToken) {
        throw new Error('Token is not verified');
      }
      console.log(decodedToken);
      const user = await User.findOne({ where: { Username: decodedToken } });
      if (!user) { 
        throw new Error('User not found');
      }
      await Result.destroy({ where: { UserId: user.Id } });
      await Trainsession.destroy({ where: { UserId: user.Id } });
      await Levelanswer.destroy({ where: { UserId: user.Id } });
      
      const result = await User.destroy({ where: { Id: user.Id } });
      console.log(result);
      if (result === 1) {
        return true;
      } else {
        throw new Error('Failed to delete account');
      }
  
    } catch (error) {
      throw new Error('Failed to delete account');
    }
  }

}


module.exports = new UserAccountServices();


