const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const UserContract = require('../ApiContract/UserContract');
const UserService = require('../Api_Services/UserServices');

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

module.exports = router;