'use strict';

// 用户信息表

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'member',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      account: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mamber_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      open_id: {
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

  down: queryInterface => queryInterface.dropTable('member'),
};
