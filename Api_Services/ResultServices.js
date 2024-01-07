const Sequelize = require('sequelize');
const sequelize = new Sequelize("cssgriddb","root","Kartoshka",
{
 dialect:"mysql",
 host : "127.0.0.1",
 logging: false
});

const User = require('../DataAccesLayer/User')(sequelize);
const Result = require('../DataAccesLayer/Result')(sequelize);
class ResultServices {
  async getLeaderboardData() {
  try {
    const leaderboardData = await Result.findAll({
      attributes: ['Score', 'Times', 'UserId'],
 // Выбираем нужные поля
      order: [['Score', 'DESC']], // Сортируем по убыванию поля Score
      limit: 4 // Ограничиваем результат 10 записями
    });

    return leaderboardData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
}

module.exports = new ResultServices();
// exports.addresult = async (userId, level, time, points) => {
//   const result = await Result.create({
//     UserID: userId,
//     Level: level,
//     Time: time,
//     Points: points
//   });
//   return result.ID;
// };

// exports.deleteresult = async (ID) => {
//   const result = await Result.destroy({ where: { ID: ID } });
//   return result > 0;
// };