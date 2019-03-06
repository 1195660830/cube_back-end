'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'competition_result',
    [
      {
          "id": 26,
          "created_at": "2019-02-18 10:25:15",
          "username": "张三",
          "sex": "男",
          "country": "中国",
          "competitionType": "数量",
          "single": "15",
          "score": "89",
          "award": "0",
          "score": "89",
          "version":1
      },
      {
          "id": 25,
          "created_at": "2019-02-18 10:25:15",
          "username": "李四",
          "sex": "女",
          "country": "日本",
          "competitionType": "速度",
          "single": "15",
          "score": "70",
          "award": "1",
          "version":1
      },
      {
          "id": 24,
          "created_at": "2019-02-18 10:25:15",
          "username": "王五",
          "sex": "男",
          "country": "法国",
          "competitionType": "速度",
          "single": "50",
          "score": "66",
          "award": "2",
          "version":1
      },
      {
          "id": 23,
          "created_at": "2019-02-18 10:25:15",
          "username": "赵四",
          "sex": "男",
          "country": "法国",
          "competitionType": "难度",
          "single": "50",
          "score": "66",
          "award": "2",
          "version":1
      },
      {
          "id": 22,
          "created_at": "2019-02-18 10:25:15",
          "username": "牛13",
          "sex": "男",
          "country": "美国",
          "competitionType": "难度",
          "single": "55",
          "score": "20",
          "award": "3",
          "version":1
      },
  ],
  {}
  ,
  ),

  down: (queryInterface, Sequelize) => {
    const {
      Op
    } = Sequelize;
    return queryInterface.bulkDelete('competition', {
      id: {
        [Op.in]: [22,23,24,25,26]
      }
    }, {});
  },
};