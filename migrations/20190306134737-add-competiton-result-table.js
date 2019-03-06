'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'competition_result',
    {
    
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { // 
        type: Sequelize.STRING,
        allowNull: false,
      },
      sex: { // 
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      competitionType: { // 赛事类型
        type: Sequelize.STRING,
        allowNull: false,
      },
      single: { // 单词时间
        type: Sequelize.STRING
      },
      score: { // 分数
        type: Sequelize.STRING,
        allowNull: false,
      },
      award: { // 0 无获奖 1金牌 2银牌 3 铜牌
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      
      version: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      logo: Sequelize.STRING,

    },
  ),

  down: queryInterface => queryInterface.dropTable('competition_result'),
};
// 
// "user_info": {
//   "id": 94,
//   "email": "微信用户",
//   "username": "袁子轩",
//   "sex": "男",
//   "country": "France"
// },
// "event_info": {
//   "id": 1,
//   "create_date": "2018-07-31 16:41:08",
//   "event_date": "2018-08-17",
//   "name": "SSZ国际魔方联赛首届 大连",
//   "location": "辽宁省大连市高新区创业e港1楼创业DNA咖啡厅",
//   "country": "中国",
//   "evnet_weight": 0,
//   "event_type": 0,
//   "event_province": {
//       "id": 2,
//       "province": "辽宁省"
//   },
//   "event_province_id": 2
// },
// "score": {
//   "eventType": "三阶",
//   "single": "11.67",
//   "turn": 0,
//   "recent": "2018-08-17",
//   "award": 1
// }