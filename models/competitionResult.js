/**
 * @fileoverview 比赛结果
 * @author Wade
 */

module.exports = (sequelize, DataTypes) => sequelize.define(
  'competitionResultModel', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { // 
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: { // 
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    competitionType: { // 赛事类型
      type: DataTypes.STRING,
      allowNull: false,
    },
    single: { // 单词时间
      type: DataTypes.STRING
    },
    score: { // 分数
      type: DataTypes.STRING,
      allowNull: false,
    },
    award: { // 0 无获奖 1金牌 2银牌 3 铜牌
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    logo: DataTypes.STRING,

  }, {
    tableName: 'competition_result',
  },
);