const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');



const router = express.Router();

// UserController.js
const UserAccountService = require('../Api_Services/UserAccountServices');
const JwtUtils = require('jwt-utils');

class UserController {
  async createUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    
    // Проверка корректности введенных данных
    if (!username || !password) {
      return res.status(400).send('Не указано имя пользователя или пароль');
    }
    if (password.length < 6) {
      return res.status(400).send('Пароль должен содержать не менее 6 символов');
    }

    // Вызов функции сервиса для сохранения персональных данных пользователя
    try {
      
      const user = await UserAccountService.createUser({ username, email, password});
      
      return res.status(200).send('Пользователь успешно зарегистрирован');
    } catch (error) {
      return res.status(500).send('Ошибка при создании пользователя');
    }
  }

  authUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Проверка корректности введенных данных
    if (!username || !password) {
      return res.status(400).send('Не указано имя пользователя или пароль');
    }

    // Проверка аутентификации пользователя
    const user = UserAccountService.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).send('Неверное имя пользователя или пароль');
    }

    // Генерация JWT токена
    const token = JwtUtils.generateToken(user);
    return res.status(200).json({ token });
  }

  updatePassword(req, res) {
    const username = req.body.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    // Проверка корректности введенных данных
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).send('Не указано имя пользователя, старый или новый пароль');
    }

    // Обновление пароля пользователя
    const updatedUser = UserAccountService.updatePassword(username, oldPassword, newPassword);
    if (!updatedUser) {
      return res.status(500).send('Ошибка при обновлении пароля');
    }
    return res.status(200).send('Пароль успешно обновлен');
  }

  deleteAccount(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Проверка корректности введенных данных
    if (!username || !password) {
      return res.status(400).send('Не указано имя пользователя или пароль');
    }

    // Удаление учетной записи пользователя
    const deleted = UserAccountService.deleteUser(username, password);
    if (!deleted) {
      return res.status(500).send('Ошибка при удалении учетной записи');
    }
    return res.status(200).send('Учетная запись успешно удалена');
  }
}

module.exports = new UserController();
