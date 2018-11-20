'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'news',
    [{
        "id": 7,
        "title": "SSZ国际魔方联赛第七届 丹东站",
        "img": "/media/img/A68I5299_%E5%89%AF%E6%9C%AC.jpg",
        "content": "SSZ国际魔方联赛第七届丹东站11月17日就要开赛啦！小魔友们是否已经开始准备大展伸手了呢?\r\n<p>近期一定要随时关注我们，不要错过报名哦……</p>",
        "created_at": "2018-10-16 09:19:28",
        "create_user": "sszcube",
        "is_top": 1,
        "news_url": null,
        version: 1,
        status: 1,
        updated_at: "2018-10-16 09:19:28",
        remark: ""
      }, {
        "id": 4,
        "title": "SSZ国际魔方联赛第五届咸阳站",
        "img": "/media/img/19300001208974133337669413906_950.jpg",
        "content": "SSZ国际魔方联赛第五届咸阳站开赛啦！请相关人员关注赛事信息。",
        "created_at": "2018-09-19 23:36:06",
        "create_user": "sszcube",
        "is_top": 1,
        "news_url": null,
        version: 1,
        status: 1,
        updated_at: "2018-10-16 09:19:28",
        remark: ""
      },
      {
        "id": 6,
        "title": "SSZ魔方段位认证考试",
        "img": "/media/img/%E9%AD%94%E6%96%B9%E6%AE%B5%E4%BD%8D%E8%AF%81%E4%B9%A61.jpg",
        "content": "SSZ段位分类：\r\n魔方一段——魔方十段\r\n每级段位需要掌握的魔方标准不同，考生在规定时间内完成项目内所有魔方需求，才可以通过本次段位认证考试。",
        "created_at": "2018-09-27 09:45:13",
        "create_user": "sszcube",
        "is_top": 0,
        "news_url": "http://blog.sina.com.cn/s/blog_48a209610102xk42.html",
        version: 1,
        status: 1,
        updated_at: "2018-10-16 09:19:28",
        remark: ""
      },
      {
        "id": 3,
        "title": "仔细阅读，报名指导！！",
        "img": "/media/img/119754171482967104.jpg",
        "content": "第一步：点击订阅号中间“国际联赛”，然后选择“国际联赛”。\r\n第二步：打开网站界面后，点击“SSZ国际魔方联赛网”下方的三个杠后会“注册”，后直接点击微信头像，就可以直接注册。\r\n第三步：请选择“填写你的姓名”后完善你的个人资料就可以选择相应赛事报名啦！！！\r\n第四步：缴费的话，请一定备注参赛者姓名！！！",
        "created_at": "2018-08-10 17:00:44",
        "create_user": "sszcube",
        "is_top": 0,
        "news_url": null,
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
    return queryInterface.bulkDelete('news', {
      id: {
        [Op.in]: [1, 2, 3, 4]
      }
    }, {});
  },
};