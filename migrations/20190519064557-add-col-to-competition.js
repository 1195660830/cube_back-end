'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
        queryInterface.addColumn('competition', 'description', { type: Sequelize.STRING }), // 描述
        queryInterface.addColumn('competition', 'is_finish', { type: Sequelize.STRING }), // 是否结束
        queryInterface.addColumn('competition', 'tel', { type: Sequelize.STRING }), // 比赛电话
        queryInterface.addColumn('competition', 'applyUser_number', { type: Sequelize.STRING }), // 限制参赛人数
        queryInterface.addColumn('competition', 'applyUser_total', { type: Sequelize.STRING }), // 报名人数
        queryInterface.addColumn('competition', 'QR_logo', { type: Sequelize.STRING }), // 客服二维码
    ]),

    down: queryInterface => Promise.all([
        queryInterface.removeColumn('competition', 'description'), // 描述
        queryInterface.removeColumn('competition', 'is_finish'), // 是否结束
        queryInterface.removeColumn('competition', 'tel'), // 比赛电话
        queryInterface.removeColumn('competition', 'applyUser_number'), // 限制参赛人数
        queryInterface.removeColumn('competition', 'applyUser_total'), // 报名人数
        queryInterface.removeColumn('competition', 'QR_logo'), // 客服二维码
    ]),
};