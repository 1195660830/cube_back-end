module.exports = (sequelize, DataTypes) => sequelize.define(
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
    {
      tableName: 'news',
    },
  );