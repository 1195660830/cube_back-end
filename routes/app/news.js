/**
 * @fileoverview 测试swagger
 * @author Wade
 */

const Joi = require("joi");
const { paginationDefine } = require("../../utils/router-helper");
const models = require("../../models");

const GROUP_NAME = "app";

const Sequelize = require("Sequelize");
const Op = Sequelize.Op;

module.exports = [
  {
    method: "GET",
    path: "/app",
    handler: (request, reply) => {
      reply("hapi app");
    },
    config: {
      tags: ["api", "app_swagger"],
      auth: false,
      description: "测试移动端"
    }
  },
  {
    method: "Get",
    path: `/${GROUP_NAME}/news`,
    handler: async (request, reply) => {
      const {
        rows: results,
        count: totalCount
      } = await models.newsModels.findAndCountAll({
        attributes: [
          "id",
          "title",
          "content",
          "create_user",
          "news_url",
          "is_top",
          "created_at"
        ],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit
      });
      reply({
        results,
        totalCount
      });
    },
    config: {
      tags: ["api", GROUP_NAME],
      auth: false,
      description: "查询新闻",
      validate: {
        query: {
          ...paginationDefine
        }
      }
    }
  },
  {
    method: "POST",
    path: `/${GROUP_NAME}/news`,
    handler: async (request, reply) => {
      models.sequelize.transaction(function(t) {
        // 解决方法 出自 https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize?answertab=votes#tab-top
        return models.newsModels
          .findOrCreate({
            where: {
              title: "新比赛"
            },
            defaults: {
              id: "10",
              title: "新比赛",
              content: "新比赛就在大连东软信息学院!!快来参加",
              create_user: "haha",
              img: "/media/img/119754171482967104.jpg",
              news_url: "www.baidu.com",
              is_top: "0",
              version: "1",
              status: "1",
              created_at: "2018-08-10 17:00:44",
              updated_at: "2018-08-10 17:00:44",
              remark: "sss"
            },
            transaction: t
          })
          .spread((user, created) => {
            console.log(
              user.get({
                plain: true
              })
            );
            if (created) {
              reply("succeed");
            } else {
              reply("shibai");
            }
            console.log("aaaa" + created);
          });
      });
    },
    config: {
      tags: ["api", GROUP_NAME],
      auth: false,
      description: "添加新闻",
      validate: {
        query: {
          // 	...paginationDefine
        }
      }
    }
  },
  {
    method: "GET",
    path: `/${GROUP_NAME}/news/{search}`,
    handler: async (request, reply) => {
      const {
        rows: results,
        count: totalCount
      } = await models.newsModels.findAndCountAll({
        attributes: [
          "id",
          "title",
          "content",
          "create_user",
          "news_url",
          "is_top",
          "created_at"
        ],
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: "%" + request.params.search + "%"
              }
            },
            {
              content: {
                [Op.like]: "%" + request.params.search + "%"
              }
            }
          ]
        },
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit
      });
      reply({
        results,
        totalCount
      });
      console.log("模糊查询" + "结果" + totalCount);
    },
    config: {
      tags: ["api", GROUP_NAME],
      auth: false,
      description: "模糊查询",
      validate: {
        params: {
          search: Joi.string()
            .required()
            .description("搜索的关键字")
        },
        query: {
          ...paginationDefine
        }
      }
    }
  },
  {
    method: "DELETE",
    path: `/${GROUP_NAME}/news/{id}`,
    handler: async (request, reply) => {
	const targetId = request.params.id; 
      const result = await models.newsModels.update(
        { status: 2 },
		{ where:[ 
			{ id : targetId },
			{status : 1}
		]
		}
      );
      if (result[0]) {
        //result = 1
        reply({
          code: 200,
          result: result
        });
      } else {
        //result = 0
        reply({
          code: 210,
          result: "id错误"
        });
      }
    },
    config: {
      tags: ["api", GROUP_NAME],
      auth: false,
      description: "删除",
      validate: {
        params: {
            id: Joi.string().required().description('删除的id'),
        }
      }
    }
  }
];
