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
        description: { // 内容描述
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_finish: { // 是否结束
            type: DataTypes.STRING,
            allowNull: false,
        },
        tel: DataTypes.STRING, // 联系电话
        applyUser_number: DataTypes.STRING, // 限制报名人数
        applyUser_total: DataTypes.STRING, // 已报名人数
        QR_logo: DataTypes.STRING, // 客服二维码
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