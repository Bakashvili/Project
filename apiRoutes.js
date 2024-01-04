// const express = require('express');
// const levelRoutes = require('./Api_Controller/LevelController');
// const resultRoutes = require('./Api_Controller/ResultController');
// const userRoutes = require('./Api_Controller/UserController');

// const router = express.Router();

// router.use('/level', levelRoutes);
// router.use('/result', resultRoutes);
// router.use('/user', userRoutes);


// const {
//   addPost,
// } = require('../Api_Controller/LevelController');



// // Add New Post
// router.post('/api/post/', addPost);


// routes.js
const express = require('express');
const router = express.Router();
const UserController = require('./Api_Controller/UserController');
const UserAccountServices= require('./Api_Services/UserAccountServices');

router.get('/', (req, res) => {
  res.render('register');
});


// router.post('/registerUser', async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).send('Username and password are required');
//   }

//   if (password.length < 6) {
//     return res.status(400).send('Password must be at least 6 characters long');
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = UserAccountService.createUser(username, email, hashedPassword);
//     if (!user) {
//       return res.status(500).send('Error creating user');
//     }
//     return res.status(200).send('User successfully registered');
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Internal server error');
//   }
// });
router.post('/authUser', UserController.authUser);
router.post('/updatePassword', UserController.updatePassword);
router.post('/deleteAccount', UserController.deleteAccount);

module.exports = router;
