const { UserCredentials } = require('./Api_Contract/UserContract');

class UserController {
  #userServices;

  constructor(userServices) {
    this.#userServices = userServices;
  }

  async Register(credentials) {
    try {
      // Вызвать метод Register у UserServices
      const uid = await this.#userServices.Register(credentials.Login, credentials.Email, credentials.Password);

      if (uid) {
        // Вернуть JWTToken
        return new UserId('сгенерированный JWTToken');
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
}

module.exports = UserController;