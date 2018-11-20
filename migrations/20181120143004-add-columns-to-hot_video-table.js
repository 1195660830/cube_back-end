'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('hot_video', 'video_url', { type: Sequelize.STRING }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('hot_video', 'video_url'),
  ]),
};
