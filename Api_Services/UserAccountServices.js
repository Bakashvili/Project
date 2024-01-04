
const User = require('../DataAccesLayer/User');

const sequelize = require('sequelize');
const JwtUtils = require('jwt-utils');

class UserAccountServices {
  async createUser(userData) {
    try {
      const { username, email, password } = userData;
      const token = JwtUtils.generateToken(userData);
      const UserModel = await User.create({
        Uid: token, // Убедитесь, что правильно генерируете идентификатор пользователя
        Email: email,
        Username: username,
        Password: password, // Предположим, что у вас есть поле Token в вашей модели пользователя
      });
      return UserModel; // Используем метод create для создания нового пользователя
      
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async authUser(userData) {
    try {
      const user = await User.findOne({ where: { Email: userData.email } });
      if (!user || user.Password !== userData.password) {
        throw new Error('Invalid email or password');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to authenticate user');
    }
  }

  async updatePassword(userId, newPassword) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.Password = newPassword;
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Failed to update password');
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
