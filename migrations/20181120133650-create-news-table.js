'use strict';

// 赛事新闻

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'news',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      create_user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      news_url: Sequelize.STRING,
      is_top: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      version: Sequelize.INTEGER,
      status: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      remark: Sequelize.STRING,
    },
  ),

  down: queryInterface => queryInterface.dropTable('shops'),
};

// "id":2,
// "title":"Vue Component Blog Post Example",
// "img":"/media/img/Snipaste_2017-11-14_22-04-00.png",
// "content":"没有内容",
// "create_time":"2018-07-01 20:41:17",
// "create_user":"zzde",
// "is_top":1,
// "news_url":"https://www.baidu.com"