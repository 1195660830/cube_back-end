/**
 * @fileoverview 测试swagger
 * @author Wade
 */

const Joi = require("joi");
const {
	paginationDefine
} = require("../../utils/router-helper");
const models = require("../../models");

const Sequelize = require("Sequelize");
const Op = Sequelize.Op;

const GROUP_NAME = "app";

module.exports = [
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
				where: {
					status: 1
				},
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
			models.sequelize.transaction(function (t) {
				// 解决方法 出自 https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize?answertab=votes#tab-top

				//FIXME 时间戳 莫名其妙被转换成 toString() 而不是 toLocalString()

				// request.payload.newsRequest.created_at = new Date().toString()
				// request.payload.newsRequest.updated_at = '2018-12-7 20:44:42'
				request.payload.newsRequest.status = 1 
				console.log(request.payload.newsRequest.created_at,request.payload.newsRequest.updated_at,request.payload.newsRequest.status)
				return models.newsModels
					.findOrCreate({
						where: {
							'title':request.payload.newsRequest.title
						},
						defaults: 
							request.payload.newsRequest
						,
						transaction: t
					})
					.spread((user, created) => {
						console.log(
							user.get({
								plain: true
							})
						);
						if (created) {

							reply({
								code: 200,
								request: ["succeed"]
							});
						} else {
							reply({
								code: 210,
								request: ["失败"]
							});
						}
					});
			});
		},
		config: {
			tags: ["api", GROUP_NAME],
			auth: false,
			description: "添加新闻,标题重复则添加失败",
			validate: {
				payload: {
					newsRequest:Joi.object().keys({
							id: Joi.number().integer(),
							title: Joi.string(),
							content: Joi.string(),
							create_user: Joi.string(),
							img: Joi.string(),
							news_url: Joi.string(),
							is_top: Joi.number().integer(),
							version: Joi.number().integer(),
							// status: Joi.number().integer(),
							// created_at: new Date().toLocaleString(),
							// updated_at: new Date().toLocaleString(),
							remark: Joi.string()
						}),
					
				},
			}
		}
	},
	{
		method: "GET",
		path: `/${GROUP_NAME}/news/{search}`,
		handler: async (request, reply) => {
			const targetSearch = request.params.search;
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
					[Op.or]: [{
							title: {
								[Op.like]: "%" + targetSearch + "%"
							}
						},
						{
							content: {
								[Op.like]: "%" + targetSearch + "%"
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
			const result = await models.newsModels.update({
				status: 2
			}, {
				where: [{
						id: targetId
					},
					{
						status: 1
					}
				]
			});
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
	},
	{
		method: "PUT",
		path: `/${GROUP_NAME}/news/{id}`,
		handler: async (request, reply) => {
			const targetId = request.params.id;
			const result = await models.newsModels.update({
				status: 2
			}, {
				where: [{
						id: targetId
					},
					{
						status: 1
					}
				]
			});
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
			description: "修改",
			validate: {
				params: {
					id: Joi.string().required().description('删除的id'),
				}
			}
		}
	}
];