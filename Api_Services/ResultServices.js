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
      order: [['Score', 'DESC']],
      limit: 10,
    });

    return leaderboardData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
}

module.exports = new ResultServices();
