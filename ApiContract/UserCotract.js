const express = require('express');
class UserCredentials {
    constructor(login, password) {
      this.Login = login;
      this.Password = password;
    }
  }
  
  class UserId {
    constructor(jwtToken) {
      this.JWTToken = jwtToken;
    }
  }
  
  module.exports = { UserCredentials, UserId };