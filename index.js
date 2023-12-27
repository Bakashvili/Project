const Sequelize = require('sequelize');
const express = require('express');
const DataAccesLayer = require('./DataAccesLayer');
//const Api_Contract = require('./ApiContract');
const Api_Controller = require('./Api_Controller');
const Api_Services = require('./Api_Services');
const app = express();
//const UserServices = require('./Api_Services/UserServices');
//const UserController = require('./Api_Controller/UserController');
//const { UserCredentials } = require('./Api_Contract/UserCotract');
const User = DataAccesLayer.User;
const Result= DataAccesLayer.Result;
const Level = DataAccesLayer.Level;
const Levelanswer = DataAccesLayer.Levelanswer;
const Trainsession = DataAccesLayer.Trainsession;
const DBcontext = DataAccesLayer.index;
const UserContract = Api_Contract.UserContract;
const LevelController = Api_Controller.LevelController;
const ResultController = Api_Controller.ResultController;
const UserController = Api_Controller.UserController;
const UserService = Api_Services.UserServices;
const LevelService = Api_Services.LevelServices;
const ResultService = Api_Services.ResultServices;
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});
// function a(){
//     User.findAll().then(result =>{
//        console.log(result);
//     })
// }
// a();
// function a1(){
//    Result.findAll().then(result_1 =>{
//        console.log(result_1);
//     })
// }
// a1();

// // Добавить user_id и связи
// function a2(){
//    Level.findAll().then(result_2 =>{
//        console.log(result_2);
//     })
// }
// a2();
// function a3(){
//    Levelanswer.findAll().then(result_3 =>{
//        console.log(result_3);
//     })
// }
// a3();
// function a4(){
//    Trainsession.findAll().then(result_4 =>{
//        console.log(result_4);
//     })
// }
// a4();
// (async () => {
//     try {
//       // Найти все записи в таблице Levelanswer и включить связанную модель User
//       const levelAnswersWithUser = await Levelanswer.findAll({
//         include: User
//       });
  
//       console.log(JSON.stringify(levelAnswersWithUser, null, 2));
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       await Sequelize.close();
//     }
//   })();
// (async () => {
//     try {
//       // Найти пользователя с ID 1
//       const user = await User.findByPk(1);
  
//       if (user) {
//         // Обновить данные в таблице Result для этого пользователя
//         const updatedResults = await Result.update(
//           { Score: 95, Times: 53 },
//           { where: { UserId: user.Id } }
//         );
  
//         console.log(updatedResults); // Вывести количество обновленных записей
//       } else {
//         console.log('Пользователь с ID 1 не найден.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
     
//     }
//   })();
//UserController.Register(UserCredentials('nato','pasword') );
generateSwaggerSpec();