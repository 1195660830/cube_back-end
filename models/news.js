/**
 * @fileoverview model 新闻
 * @author Wade
 */

module.exports = (sequelize, DataTypes) => sequelize.define(
    'newsModels',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      create_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      news_url: DataTypes.STRING,
      is_top: {
        type: DataTypes.INTEGER,
        // allowNull: true,
      },
      version: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
      remark: DataTypes.STRING,
    },
    {
      tableName: 'news',
    },
  );
