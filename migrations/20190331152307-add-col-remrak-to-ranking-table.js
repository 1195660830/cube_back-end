'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('ranking', 'remark', { type: Sequelize.STRING}),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('ranking', 'remark', { type: Sequelize.STRING}),
  ]),
};
