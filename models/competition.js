/**
 * @fileoverview 热点视频
 * @author Wade
 */

module.exports = (sequelize, DataTypes) => sequelize.define(
    'competitionModel', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          location: { // 详细地址
            type: DataTypes.STRING,
            allowNull: false,
          },
          country: { // 国家
            type: DataTypes.STRING,
            allowNull: false,
          },
          name: { // 赛事名称
            type: DataTypes.STRING,
            allowNull: false,
          },
          
          event_province: { // 省份
            type: DataTypes.STRING,
            allowNull: false,
          },
          
          event_date: { // 比赛时间
            type: DataTypes.STRING,
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
        tableName: 'competition',
    },
);