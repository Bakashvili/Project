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

//const levelRoutes = require('./routes/levelroute');
const userController= require('./Api_Controller/UserController');

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
app.get('/game', (req, res) => {
  const title = 'game';
  res.render(createPath('index_1'), { title });
});
app.get('/leaders', (req, res) => {
  const title = 'Table of leaders';
  res.render(createPath('leaders'), { title });
});
app.get('/login', (req, res) => {
  const title = 'login';
  res.render(createPath('login'), { title });
});
app.get('/register', (req, res) => {
  const title = 'register';
  res.render(createPath('register'), { title });
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
    return res.status(500).send(`Internal server error! username:${username} + email:${email} + password:${password}`);
   
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