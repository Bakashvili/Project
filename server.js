const Sequelize = require('sequelize');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const DataAccesLayer = require('./DataAccesLayer');
//const Api_Contract = require('./ApiContract');
//const Api_Controller = require('./Api_Controller');
const Api_Services = require('./Api_Services');
const generateSwaggerSpec = require('./swagger');
const createPath = require('./create-path');
const fs = require('fs');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const UserAccountServices = require('./Api_Services/UserAccountServices');
const ResultServices = require('./Api_Services/ResultServices');
const LevelServices = require('./Api_Services/LevelServices');

require('dotenv').config()
const app = express();app.use(bodyParser.json()); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerUrl: '/api-docs/swagger_output.json' }));
const PORT = 3000;
app.use(express.static('styles'));
app.use(express.static('front'));

app.get('/', (req, res) => {
  
  const title = 'Home';
  res.render(createPath('index'), { title });
});
 function checkEmail(email){
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(email);
  }
  function checkPassword(password){
    if (password.length = 0 || password.length < 6){
      return false;
    }
    return true;

  }
app.get('/login', (req, res) => {
  const title = 'login';
  res.render(createPath('login'), { title });
});
app.get('/register', (req, res) => {
  const title = 'register';
  res.render(createPath('register'), { title });
});
app.get('/update', (req, res) => {
  const title = 'update';
  res.render(createPath('update'), { title });
});
app.get('/game', async (req, res) => {
  const {authToken} = req.cookies;
  try {
    console.log(authToken);
    
    const level = await LevelServices.getLevel(); 
    const sessionId = await LevelServices.createSession(authToken); 
    console.log(sessionId);
    res.render('index_1', {level, sessionId: sessionId} ); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/gamefinish', async (req, res) => {
  const {authToken} = req.cookies;
  // const {sessionId} = req.body;
  try {
    console.log(authToken); 
    const UpdateScore = await LevelServices.UpdateScore(authToken);
    res.render('score',{score:UpdateScore}); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/game/getResult',async (req, res) => {
  const {answer,sessionId} = req.body;
  const {authToken} = req.cookies;
 
  try { 
    
    for (let i = 0; i < answer.length; i++) {
      const answers = answer[i];
      const id = i + 1;
      const session = Number(sessionId[i]);

      answerlevel = await LevelServices.sendAnswer(authToken,answers,id,session); 
        if (!answerlevel) {
           return res.status(400).send('Error checking answer');
        }
   }
    return res.redirect('/game');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/registerUser', async function(req, res) {
  const { username, email, password } = req.body;

  try {
    if (!checkPassword(password)){
      return res.status(400).send('Number of sumbols must be 6 symbols or more than 6');
    }
    if(!checkEmail(email)){
      return res.status(400).send('Email is not valid');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user1 = await UserAccountServices.checkUser(email);
    console.log(user1);
    if (user1 === null) {
      return res.status(500).send('Error creating user (this email is already registred)');
    }
    const user2 = await UserAccountServices.checkUsername(username);
    if (user2 === null) {
      return res.status(500).send('Error creating user (this username is already registred)');
    }
    const token = await UserAccountServices.generateToken(username);
    const user = await UserAccountServices.createUser({ username, email, password: hashedPassword, token});
    if(!user)
    {
      return res.status(500).send('Error creating user');
    }
    res.cookie('authToken', token, {httpOnly: true, secure: true});
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal server error!`);
   
  }
});
app.post('/updateUser', async function(req, res) {
  const {authToken} = req.cookies;
  const { email, password, email2 } = req.body;
  try {
    console.log(email2);
    const user = await UserAccountServices.updateEmail({ email, password: password, email2,authToken });
    if (!user) {
      return res.status(500).send('Error updating user');
    }
    res.status(200).send('User successfully updated');

    
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal server error!`);
   
  }
});
app.post('/LoginUser', async function(req, res) {
  const {email, password } = req.body;
  
  try {
    if(!checkEmail(email)){
      return res.status(400).send('Email is not valid');
    }
    if (!email || !password) {
    return res.status(400).send('Не указано имя пользователя или пароль');
    
  }
    const user = await UserAccountServices.authUser({email, password});
    console.log(user);
    res.cookie('authToken', user, {httpOnly: true, secure: true});
    res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal server error!`);
   
  }
});

app.get('/leaders', async (req, res) => {
  try {
    const leaderboardData = await ResultServices.getLeaderboardData();
    res.render('leaders', { leaderboardData: leaderboardData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');

  }
});
app.get('/delete', async (req, res) => {
  const {authToken} = req.cookies;
  try {
    const deleteUser = await UserAccountServices.deleteAccount(authToken);
    console.log(deleteUser);
    if(deleteUser !== true){
      return res.status(400).send("User isn't exist");
    }
    res.clearCookie('authToken');
    res.status(200).send('Acccount deleted');
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


  app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
  });

