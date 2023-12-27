
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const UserContract = require('../contracts/userContract');
const UserService = require('../services/userService');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const guid = uuidv4();
  const result = await UserService.register(email, hashedPassword, guid);
  if (result.success) {
    const token = jwt.sign({ id: guid }, process.env.JWT_SECRET);
    const user = new UserContract(token, null);
    res.json(user);
  } else {
    res.status(400).json({ message: result.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await UserService.login(email, password);
  if (result.success) {
    const guid = result.data;
    const token = jwt.sign({ id: guid }, process.env.JWT_SECRET);
    const user = new UserContract(token, guid);
    res.json(user);
  } else {
    res.status(400).json({ message: result.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await UserService.delete(id);
  if (result.success) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(400).json({ message: result.message });
  }
});

const { User } = require('../DataAccesLayer/User');
const express = require('express');

const UserService = {
  register: async (email, password, guid) => {
    try {
      const user = await User.create({
        Uid: guid,
        Email: email,
        Username: email,
        Password: password
      });
      return { success: true, message: 'User created successfully', data: user.Uid };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  login: async (email, password) => {
    try {
      const user = await User.findOne({ where: { Email: email } });
      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }
      if (!bcrypt.compareSync(password, user.Password)) {
  return { success: false, message: 'Invalid email or password' };
}
return { success: true, message: 'User logged in successfully', data: user.Uid };
} catch (error) {
return { success: false, message: error.message };
}
},

delete: async (id) => {
try {
const user = await User.destroy({ where: { Uid: id } });
if (user === 0) {
  return { success: false, message: 'User not found' };
}
return { success: true, message: 'User deleted successfully' };
} catch (error) {
return { success: false, message: error.message };
}
}
};

module.exports = UserService;