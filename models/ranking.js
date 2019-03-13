/**
 * @fileoverview 热点视频
 * @author Wade
 */

module.exports = (sequelize, DataTypes) => sequelize.define(
    'rankingModel', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { // 选手名字
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: { // 性别
        type: DataTypes.STRING,
        allowNull: false,
      },
      apply_competition: {  // 参加过的比赛
        type: DataTypes.STRING,
        allowNull: false,
      },
      apply_types: {  // 参赛过的项目
        type: DataTypes.STRING,
        allowNull: false,
      },
      apply_award:{ // 获奖信息
        type: DataTypes.STRING,
        allowNull: false,
      },
      best_competition:{ // 最好赛事
        type: DataTypes.STRING,
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
        tableName: 'ranking',
    },
);