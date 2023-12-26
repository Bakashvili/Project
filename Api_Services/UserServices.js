const { User } = require('../DataAccesLayer');
class UserServices {
  #indexFilePath;

  constructor(indexFilePath) {
    this.#indexFilePath = indexFilePath;
  }

  async Register(username, email, password) {
    try {
      // Создать нового пользователя
      const newUser = await User.create({ Username: username, Email: email, Password: password });

      // Сохранить пользователя в БД и вернуть его Uid
      return newUser.Uid;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
}

module.exports = UserServices;