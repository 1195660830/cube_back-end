'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'hot_video',
    [{
        "id": 3,
        "title": "sdfdg",
        "video_url": "http://skin.se.360.cn/",
        "content": "2018-10-10 09:59:48",
        "created_at": "2018-10-16 09:19:28",
        "create_user": "sszcube",
        "is_top": 1,
        version: 1,
        status: 1,
        updated_at: "2018-10-16 09:19:28",
        remark: ""
      },
      {
        "id": 7,
        "title": "sdfdg",
        "video_url": "http://skin.se.360.cn/",
        "content": "2018-10-10 09:59:48",
        "created_at": "2018-10-16 09:19:28",
        "create_user": "sszcube",
        "is_top": 1,
        version: 1,
        status: 1,
        updated_at: "2018-10-16 09:19:28",
        remark: ""
      },
      {
        "id": 4,
        "title": "SSZ魔方联赛",
        "video_url": "https://v.youku.com/v_show/id_XNzM2MzM2NjA0.html",
        "content": "2018-10-10 09:59:48",
        "created_at": "2018-10-16 09:19:28",
        "create_user": "sszcube",
        "is_top": 1,
        version: 1,
        status: 1,
        updated_at: "2018-10-16 09:19:28",
        remark: ""
      },
      {
        "id": 5,
        "title": "SSZ国际魔方联赛（大连）",
        "video_url": "http://skin.se.360.cn/",
        "content": "2018-10-10 09:59:48",
        "created_at": "2018-10-16 09:19:28",
        "create_user": "sszcube",
        "is_top": 1,
        version: 1,
        status: 1,
        updated_at: "2018-10-16 09:19:28",
        remark: ""
      },
    ], {},
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