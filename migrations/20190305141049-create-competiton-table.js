'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'competition',
    {
    
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      location: { // 详细地址
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: { // 国家
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: { // 赛事名称
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      event_province: { // 省份
        type: Sequelize.STRING,
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

  down: queryInterface => queryInterface.dropTable('competition'),
};
