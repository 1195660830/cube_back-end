'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'ranking',
    {
    
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { // 选手名字
        type: Sequelize.STRING,
        allowNull: false,
      },
      sex: { // 性别
        type: Sequelize.STRING,
        allowNull: false,
      },
      apply_competition: {  // 参加过的比赛
        type: Sequelize.STRING,
        allowNull: false,
      },
      apply_types: {  // 参赛过的项目
        type: Sequelize.STRING,
        allowNull: false,
      },
      apply_types: {  // 参赛过的项目
        type: Sequelize.STRING,
        allowNull: false,
      },
      apply_award:{ // 获奖信息
        type: Sequelize.STRING,
        allowNull: false,
      },
      best_competition:{ // 最好赛事
        type: Sequelize.STRING,
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

  down: queryInterface => queryInterface.dropTable('ranking'),
};
//