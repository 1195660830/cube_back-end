'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'competition_applyuser',
    {
    
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { // 
        type: Sequelize.STRING,
        allowNull: false,
      },
      sex: { // 
        type: Sequelize.STRING,
        allowNull: false,
      },
      apply_types: {  // 参赛项目
        type: Sequelize.STRING,
        allowNull: false,
      },
      apply_time: {  // 报名时间
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_pay: {  // 是否支付 1 否 2是
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pay_way: {  // 付款方式
        type: Sequelize.STRING,
      },
      
      
      version: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      logo: Sequelize.STRING,

    },
  ),

  down: queryInterface => queryInterface.dropTable('competition_applyuser'),
};
// //{
//   "user_obj": {
//     "id": 17,
//     "username": "大个魔方",
//     "sex": "男"
// },
// "apply_types": [
//     "三阶"
// ],
// "apply_time": "2019-02-25"
// }