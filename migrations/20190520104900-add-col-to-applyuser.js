'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
        queryInterface.addColumn('competition_applyuser', 'user_id', { type: Sequelize.STRING }), // 用户id
    ]),

    down: queryInterface => Promise.all([
        queryInterface.removeColumn('competition_applyuser', 'user_id'),
    ]),
};