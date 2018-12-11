/**
 * @fileoverview 测试swagger
 * @author Wade
 */

const Joi = require("joi");
const { paginationDefine } = require("../../utils/router-helper");
const { jwtHeaderDefine } = require('../../utils/router-helper');
const models = require("../../models");

const Sequelize = require("Sequelize");
const Op = Sequelize.Op;

const GROUP_NAME = "app/news";

module.exports = [
	{
		method: "Get",
		path: `/${GROUP_NAME}`,
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
					"created_at",
					"version"
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
			tags: ["api", GROUP_NAME,],
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
		path: `/${GROUP_NAME}`,
		handler: async (request, reply) => {
			models.sequelize.transaction(function (t) {
				// 解决方法 出自 https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize?answertab=votes#tab-top
				request.payload.newsRequest.status = 1
				request.payload.newsRequest.version = 1
				return models.newsModels
					.findOrCreate({
						where: {
							'title': request.payload.newsRequest.title
						},
						defaults: request.payload.newsRequest,
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
					newsRequest: Joi.object().keys({
						title: Joi.string(),
						content: Joi.string(),
						create_user: Joi.string(),
						img: Joi.string(),
						news_url: Joi.string(),
						is_top: Joi.number().integer(),
						version: Joi.number().integer(),
						remark: Joi.string()
					}),

				}
			}
		}
	},
	{
		method: "GET",
		path: `/${GROUP_NAME}/{search}`,
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
					"created_at",
					"version"
				],
				where: {
					'status':1,
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
			description: "模糊查询,新闻标题,新闻内容,只要包含关键字,都能搜索出来",
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
		path: `/${GROUP_NAME}/{id}`,
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
				},
				...jwtHeaderDefine, // 增加需要 jwt auth 认证的接口 header 校验
			}
		}
	},
	{
		method: "PUT",
		path: `/${GROUP_NAME}/{id}`,
		handler: async (request, reply) => {

			// 使用乐观锁设计,首先先查一次 version ,相同,再进行 update

			const targetVersion = request.query.version
			const targetId = request.params.id

			request.payload.newsRequest.version = ++ request.query.version

			models.newsModels.findOne({
					where: {
						[Op.and]: [{
								id: targetId
							},
							{
								version: targetVersion
							},{
								status: 1
							}
						]
					}
				})
				.then(project => {
					if (project) {
						project.update({
								...request.payload.newsRequest
							})
							.then(
							function () {
								reply({
									code: 200,
									result: 'success'
								})
							}
							)
					}else{
						reply({
							code: 210,
							result: 'id错误或版本号错误'
						})
					}
				})
		},
		config: {
			tags: ["api", GROUP_NAME],
			auth: false,
			description: "修改",
			validate: {
				params: {
					id: Joi.string().required().description('删除的id'),
				},
				query: {
					version: Joi.string().required().description('删除的version')
				},
				payload: {
					newsRequest: Joi.object().keys({
						title: Joi.string(),
						content: Joi.string(),
						create_user: Joi.string(),
						img: Joi.string(),
						news_url: Joi.string(),
						is_top: Joi.number().integer(),
						remark: Joi.string()
					}),

				}
			}
		}
	}
];