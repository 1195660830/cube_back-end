'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('competition', 'event_date', { type: Sequelize.STRING,allowNull: false }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('competition', 'event_date', { type: Sequelize.STRING,allowNull: false }),
  ]),
};
