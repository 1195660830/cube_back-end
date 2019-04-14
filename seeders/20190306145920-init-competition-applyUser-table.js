'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'competition_applyuser',
    [
      {
        "id": 26,
        'competition_id':1,
        "created_at": "2019-02-18 10:25:15",
        "username": "张三",
        "sex": "男",
        "apply_types": "速度",
        "apply_time": "2019-02-18 10:25:15",
        "is_pay": "1",
        "pay_way": "微信支付",
        "version": 1
      }, {
        "id": 25,
        'competition_id':1,
        "created_at": "2019-02-24 10:25:15",
        "username": "拉拉",
        "sex": "女",
        "apply_types": "速度",
        "apply_time": "2019-02-20 10:25:15",
        "is_pay": "1",
        "pay_way": "支付宝支付",
        "version": 2
      }, {
        "id": 24,
        'competition_id':1,
        "created_at": "2019-02-18 10:25:15",
        "username": "高光",
        "sex": "男",
        "apply_types": "数量",
        "apply_time": "2019-02-18 10:25:15",
        "is_pay": "0",
        "pay_way": "",
        "version": 2
      }, {
        "id": 23,
        'competition_id':1,
        "created_at": "2019-02-18 10:25:15",
        "username": "晓晓",
        "sex": "男",
        "apply_types": "速度",
        "apply_time": "2019-02-18 10:25:15",
        "is_pay": "1",
        "pay_way": "京东白条",
        "version": 1
      }, {
        "id": 22,
        'competition_id':2,
        "created_at": "2019-02-18 10:25:15",
        "username": "joker",
        "sex": "女",
        "apply_types": "速度",
        "apply_time": "2019-02-18 10:25:15",
        "is_pay": "0",
        "pay_way": "",
        "version": 1
      }, {
        "id": 21,
        'competition_id':2,
        "created_at": "2019-02-18 10:25:15",
        "username": "兰兰",
        "sex": "女",
        "apply_types": "速度",
        "apply_time": "2019-02-18 10:25:15",
        "is_pay": "1",
        "pay_way": "",
        "version": 1
      }, {
        "id": 20,
        'competition_id':2,
        "created_at": "2019-02-18 10:25:15",
        "username": "楚楚",
        "sex": "女",
        "apply_types": "速度",
        "apply_time": "2019-02-18 10:25:15",
        "is_pay": "1",
        "pay_way": "",
        "version": 1
      }, {
        "id": 19,
        'competition_id':3,
        "created_at": "2019-02-18 10:25:15",
        "username": "梅梅",
        "sex": "女",
        "apply_types": "速度",
        "apply_time": "2019-02-18 10:25:15",
        "is_pay": "1",
        "pay_way": "",
        "version": 1
     }, {
        "id": 18,
        'competition_id':3,
        "created_at": "2019-02-18 10:25:15",
        "username": "高光",
        "sex": "男",
        "apply_types": "速度",
        "apply_time": "2019-02-18 10:25:15",
        "is_pay": "1",
        "pay_way": "",
        "version": 1
      },
  ],
  {}
  ,
  ),

  down: (queryInterface, Sequelize) => {
    const {
      Op
    } = Sequelize;
    return queryInterface.bulkDelete('competition_applyuser', {
      id: {
        [Op.in]: [18,19,20,21,22,23,24,25,26]
      }
    }, {});
  },
};