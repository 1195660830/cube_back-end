/**
 * @fileoverview 热点视频
 * @author Wade
 */

module.exports = (sequelize, DataTypes) => sequelize.define(
    'hotVideoModel', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_top: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        create_user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        'video_url': {
            type: DataTypes.STRING
        },

        version: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        remark: DataTypes.STRING,
    }, {
        tableName: 'hot_video',
    },
);