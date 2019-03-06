'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'ranking',
    [
      {
        "id": 26,
        "created_at": "2019-02-18 10:25:15",
        "updated_at": "2019-03-03 12:25:15",
        "username": "张三",
        "sex": "男",
        "apply_competition": "['南宁比赛','大连比赛','深圳比赛']",
        "apply_types": '速度',
        "apply_award": "['南宁比赛一等奖','大连比赛三等奖']",
        "best_competition": "南宁比赛",
        "version": 1
      }, 
      {
        "id": 25,
        "created_at": "2019-02-18 10:25:15",
        "updated_at": "2019-03-03 12:25:15",
        "username": "李四",
        "sex": "女",
        "apply_competition": "['北京比赛','山东比赛','河南比赛']",
        "apply_types": '数量',
        "apply_award": "['山东比赛青年组一等奖','河南比赛十岁以下一等奖','北京比赛鼓励奖']",
        "best_competition": "山东比赛比赛",
        "version": 1
      }, 
      {
        "id": 24,
        "created_at": "2019-02-18 10:25:15",
        "updated_at": "2019-03-03 12:25:15",
        "username": "刘力",
        "sex": "男",
        "apply_competition": "['南宁比赛','大连比赛','深圳比赛']",
        "apply_types": '速度',
        "apply_award": "[]",
        "best_competition": "",
        "version": 1
      }, 
      {
        "id": 23,
        "created_at": "2019-02-18 10:25:15",
        "updated_at": "2019-03-03 12:25:15",
        "username": "王哥",
        "sex": "男",
        "apply_competition": "['俄罗斯魔方比赛','泰国阿迪达斯杯比赛']",
        "apply_types": '速度',
        "apply_award": "['泰国阿迪达斯杯中国赛区三等奖']",
        "best_competition": "泰国阿迪达斯杯比赛",
        "version": 1
      }, 
      {
        "id": 22,
        "created_at": "2019-02-18 10:25:15",
        "updated_at": "2019-03-03 12:25:15",
        "username": "思密达",
        "sex": "女",
        "apply_competition": "['韩国魔方全国精英赛']",
        "apply_types": '速度',
        "apply_award": "['韩国魔方全国精英赛世界总冠军']",
        "best_competition": "韩国魔方全国精英赛",
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
    return queryInterface.bulkDelete('ranking', {
      id: {
        [Op.in]: [22,23,24,25,26]
      }
    }, {});
  },
};