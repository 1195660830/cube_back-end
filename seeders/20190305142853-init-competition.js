'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'competition',
    [
      {
          "id": 27,
          "created_at": "2019-02-18 10:25:15",
          "event_date": "2019-02-25",
          "name": "SSZ官方国际网络月赛（2019.2.25）",
          "location": "地球村",
          "country": "中国",
          "event_province": "宇宙",
          "version":1
      },
      {
          "id": 26,
          "created_at": "2019-01-11 09:18:01",
          "event_date": "2019-01-25",
          "name": "SSZ官方国际网络月赛（2019.1.25）",
          "location": "地球村",
          "country": "中国",
          "event_province":"宇宙",
          "version":1
      },
      {
          "id": 25,
          "created_at": "2018-12-28 15:32:24",
          "event_date": "2019-01-13",
          "name": "SSZ国际魔方联赛第十一届  大连站（2019.1.13）",
          "location": "大连市金色少年文化艺术培训学校（锦绣路38-1）",
          "country": "中国",
          "event_province": "辽宁省",
          "version":1
      },
      {
          "id": 24,
          "created_at": "2018-12-04 14:00:43",
          "event_date": "2018-12-25",
          "name": "SSZ官方国际网络月赛（2018.12）",
          "location": "地球村",
          "country": "中国",
          "event_province":"宇宙",
          "version":1
      },
      {
          "id": 23,
          "created_at": "2018-12-03 16:12:39",
          "event_date": "2018-12-17",
          "name": "SSZ国际魔方联赛第十届  大连站",
          "location": "大连市开发区童牛岭小学",
          "country": "中国",
          "event_province": "辽宁省",
          "version":1
      },
      {
          "id": 20,
          "created_at": "2018-11-08 10:50:13",
          "event_date": "2018-12-12",
          "name": "SSZ国际魔方联赛第八届  重庆站（酉阳县2018.12.12）",
          "location": "龙潭镇南翔小学多媒体教室",
          "country": "中国",
          "event_province": "重庆市",
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
    // 删除 shop 表 id 为 1，2，3，4 的记录
    return queryInterface.bulkDelete('hot_video', {
      id: {
        [Op.in]: [1,2,3,4]
      }
    }, {});
  },
};