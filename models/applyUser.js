/**
 * @fileoverview 热点视频
 * @author Wade
 */

module.exports = (sequelize, DataTypes) => sequelize.define(
    'applyUserModel', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      competitionId: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      username: { // 
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: { // 
        type: DataTypes.STRING,
        allowNull: false,
      },
      apply_types: {  // 参赛项目
        type: DataTypes.STRING,
        allowNull: false,
      },
      apply_time: {  // 报名时间
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_pay: {  // 是否支付 1 否 2是
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pay_way: {  // 付款方式
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
        tableName: 'competition_applyuser',
    },
);