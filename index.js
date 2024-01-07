const Sequelize = require('sequelize');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const DataAccesLayer = require('./DataAccesLayer');
const Api_Contract = require('./ApiContract');
const Api_Controller = require('./Api_Controller');
const Api_Services = require('./Api_Services');
const generateSwaggerSpec = require('./swagger');
const apiRoutes = require('./apiRoutes');
const createPath = require('./create-path');
const fs = require('fs');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const UserAccountServices = require('./Api_Services/UserAccountServices');
const ResultServices = require('./Api_Services/ResultServices');
//const levelRoutes = require('./routes/levelroute');
const userController= require('./Api_Controller/UserController');
const LevelController= require('./Api_Controller/LevelController');
const app = express();app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerUrl: '/api-docs/swagger_output.json' }));
app.use('/api', apiRoutes);
const User = DataAccesLayer.User;
const Result= DataAccesLayer.Result;
const Level = DataAccesLayer.Level;
const Levelanswer = DataAccesLayer.Levelanswer;
const Trainsession = DataAccesLayer.Trainsession;
const DBcontext = DataAccesLayer.index;
//const UserContract = Api_Contract.UserContract;
//const LevelController = Api_Controller.LevelController;
//const ResultController = Api_Controller.ResultController;
const UserController = Api_Controller.UserController;
const UserService = Api_Services.UserServices;
//const LevelService = Api_Services.LevelServices;
//const ResultService = Api_Services.ResultServices;
const PORT = 3002;
app.use(express.static('styles'));
app.use(express.static('front'));
app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});
// app.get('/game', (req, res) => {
//   const title = 'game';
//   res.render(createPath('index_1'), { title });
// });


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
  try {
    const level = await LevelController.getLevel(); 
    const UpdateScore = await LevelController.UpdateScore();
    res.render('index_1', { textTask: level.Texttask, score: UpdateScore}); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/game/getResult', async (req, res) => {
  const {answer} = req.body;
  try {
    const level = await LevelController.getLevel(); 
    const answerlevel = await LevelController.sendAnswer(answer); 
    if (!answerlevel) {
      return res.status(500).send('Error checking answer');
    }
    const increaseScore = await LevelController.increaseScore(); 
   res.render('index_1', { textTask: level.Texttask, score: increaseScore }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/registerUser', async function(req, res) {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserAccountServices.createUser({ username, email, password: hashedPassword });
    if (!user) {
      return res.status(500).send('Error creating user');
    }
    return res.status(200).send('User successfully registered');
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal server error!`);
   
  }
});
app.post('/updateUser', async function(req, res) {
  const { email, password, newemail } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserAccountServices.updateEmail({ email, password: hashedPassword, newemail });
    if (!user) {
      return res.status(500).send('Error updating user');
    }
    return res.status(200).send('User successfully updated');
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal server error!`);
   
  }
});
app.post('/LoginUser', async function(req, res) {
  const {email, password } = req.body;
  try {
    if (!email || !password) {
    return res.status(400).send('Не указано имя пользователя или пароль');
    
  }
    const user = await UserAccountServices.authUser({email, password});
    return res.status(200).send(`successfull login `);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal server error!`);
   
  }
  // Генерация JWT токена
  // const token = JwtUtils.generateToken(user);
  // return res.status(200).json({ token });
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
// (async () => {
//   try {
//     const swaggerSpec = await generateSwaggerSpec();
//     fs.writeFileSync('./public/swagger_output.json', JSON.stringify(swaggerSpec, null, 2));
//     console.log('Swagger spec file has been generated successfully');
//   } catch (error) {
//     console.error('Error generating Swagger spec file:', error);
//   }

  app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
  });

// app.post('/', function(req, res, next) {

//   var answer=answer;

//   res.send('Your email address is: '+ answer );
//   console.log(answer)
// });