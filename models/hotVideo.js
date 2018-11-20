module.exports = (sequelize, DataTypes) => sequelize.define(
    'hot_video', {
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
        is_top: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        create_user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        'video_url': {
            type: Sequelize.STRING
        },

        version: Sequelize.INTEGER,
        status: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        remark: Sequelize.STRING,
    }, {
        tableName: 'hot_video',
    },
);