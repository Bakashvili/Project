const Sequelize = require('sequelize');
const sequelize = new Sequelize("cssgriddb","root","Kartoshka",
{
 dialect:"mysql",
 host : "127.0.0.1",
 logging: false
});
const User = require('../DataAccesLayer/User')(sequelize);
var config = { expiration: 600};
var jwt = require('../jwt-utils');
const bcrypt = require('bcrypt');
class UserAccountServices {
  async createUser(userData) {
    try {
      const { username, email, password } = userData;
      console.log(userData);
      const token = jwt.getNewAccessToken(username);
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
      console.log(email, password);
      const user = await User.findOne({ where: { Email: email } });
      const passwordMatch = await bcrypt.compare(password, user.Password);
      console.log(passwordMatch);
      if (!user || !passwordMatch) {
        throw new Error('Invalid email or password');
      }
      //console.log(email, user.Password, password, user);
      // if (!user || user.Password !== password) {
      //   throw new Error('Invalid email or password');
      // }
      // else{
       console.log(email, password);
        
      // }
      
    } catch (error) {
      throw new Error('Failed to authenticate user');
    }
  }

  async updateEmail(userData) {
    try {
      const {email, password, newEmail} = userData;
      const user = await User.findOne({ where: { Email: email } });
      console.log(user, password)
      const passwordMatch = await bcrypt.compare(password, user.Password);
      console.log(passwordMatch);
      if (!user || !passwordMatch) {
        throw new Error('Invalid email or password');
      }
      user.Email = newEmail;
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Failed to update email');
    }
  }

  async deleteAccount(userId) {
    try {
      const deletedUser = await User.destroy({ where: { Uid: userId } });
      if (!deletedUser) {
        throw new Error('User not found');
      }
      return deletedUser;
    } catch (error) {
      throw new Error('Failed to delete account');
    }
  }

}

module.exports = new UserAccountServices();

// class UserAccountServices {
//   async createUser(userData) {
//     try {
//       const {username, email, password } = userData;
//       const token = JwtUtils.generateToken(userData);
//       const UserModel = await User.create({
//         Uid:token, // Убедитесь, что правильно генерируете идентификатор пользователя
//         Email: email,
//         Username: username,
//         Password: password,
//  // Предположим, что у вас есть поле Token в вашей модели пользователя
//       });
//       return UserModel; // Используем метод create для создания нового пользователя
      
//     } catch (error) {
//       throw new Error('Failed to create user');
//     console.log(`Username ${username },Email ${email}, password ${password}, Uid ${Uid} ` );
//     }
//   }

//   async authUser(userData) {
//     try {
//       const user = await User.findOne({ email: userData.email });
//       if (!user || user.password !== userData.password) {
//         throw new Error('Invalid email or password');
//       }
//       return user;
//     } catch (error) {
//       throw new Error('Failed to authenticate user');
//     }
//   }

//   async updatePassword(userId, newPassword) {
//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         throw new Error('User not found');
//       }
//       user.password = newPassword;
//       await user.save();
//       return user;
//     } catch (error) {
//       throw new Error('Failed to update password');
//     }
//   }

//   async deleteAccount(userId) {
//     try {
//       const deletedUser = await User.findByIdAndDelete(userId);
//       if (!deletedUser) {
//         throw new Error('User not found');
//       }
//       return deletedUser;
//     } catch (error) {
//       throw new Error('Failed to delete account');
//     }
//   }
// }

// module.exports = new  UserAccountServices();
