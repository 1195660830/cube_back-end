/**
 * @fileoverview 后台管理端
 * @author Wade
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const Joi = require("joi"); //分页
const { paginationDefine } = require("../../utils/router-helper"); //默认分页
const { jwtHeaderDefine } = require('../../utils/router-helper'); //身份验证
const models = require("../../models"); // 引入实体对象
const Sequelize = require("Sequelize"); // 持久类数据库工具


const GROUP_NAME = 'admin'; // 宏定义

module.exports = [
	{
		method: 'GET',
		path: `/${GROUP_NAME}/news`,
		handler: async (request, reply) => {
			const {
				rows: results,
				count: totalCount
			} = await  models.newsModels.findAndCountAll({
				attributes: [
					'id', 'title', 'content', 'create_user', 'news_url', 'is_top', 'created_at'
				],
				limit: request.query.limit,
				offset: (request.query.page - 1) * request.query.limit,
			});
			// 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
			reply({
				results,
				totalCount
			});
		},
		config: {
			auth: false,
			tags: ['api', 'admin_swagger'],
			description: '新闻',
			validate: {
				query: {
					...paginationDefine
				}
			}
		},

	},
	{
		method: 'GET',
		path: `/${GROUP_NAME}/filter`,
		handler: async (request, reply) => {
			const {
				rows: results,
				count: totalCount
			} = await  models.competitionModel.findAndCountAll({
				attributes: [
					'id',
					'location',
					'country',
					'name',
					'event_province',
					'event_date',
					'version',
				],
				limit: request.query.limit,
				offset: (request.query.page - 1) * request.query.limit,
			});
			// 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
			reply({
				results,
				totalCount
			});
		},
		config: {
			auth: false,
			tags: ['api', 'admin_swagger'],
			description: '赛事',
			validate: {
				query: {
					...paginationDefine
				}
			}
		},

	},
	{
		method: 'GET',
		path: `/${GROUP_NAME}/hotVideo`,
		handler: async (request, reply) => {
			const {
				rows: results,
				count: totalCount
			} = await  models.hotVideoModel.findAndCountAll({
				attributes: [
					"id",
					"title",
					"video_url",
					"content",
					"created_at",
					"is_top",
					"version",
					"status",
					"updated_at",
					"remark"
				],
				limit: request.query.limit,
				offset: (request.query.page - 1) * request.query.limit,
			});
			// 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
			reply({
				results,
				totalCount
			});
		},
		config: {
			auth: false,
			tags: ['api', 'admin_swagger'],
			description: '最新视频',
			validate: {
				query: {
					...paginationDefine
				}
			}
		},

	},
	{
		method: 'GET',
		path: `/${GROUP_NAME}/applyUser`,
		handler: async (request, reply) => {
			const {
				rows: results,
				count: totalCount
			} = await  models.applyUserModel.findAndCountAll({
				attributes: [
					"id",
					"username",
					"sex",
					"apply_types",
					"apply_time",
					"is_pay",
					"pay_way",
				],
				limit: request.query.limit,
				offset: (request.query.page - 1) * request.query.limit,
			});
			// 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
			reply({
				results,
				totalCount
			});
		},
		config: {
			auth: false,
			tags: ['api', 'admin_swagger'],
			description: '报名参赛选手',
			validate: {
				query: {
					...paginationDefine
				}
			}
		},

	},
	{
		method: 'GET',
		path: `/${GROUP_NAME}/ranking`,
		handler: async (request, reply) => {
			const {
				rows: results,
				count: totalCount
			} = await  models.rankingModel.findAndCountAll({
				attributes: [
					"id",
					"username",
					"sex",
					"apply_competition",
					"apply_types",
					"apply_award",
					"best_competition",
					"version",
					"created_at"
				],
				limit: request.query.limit,
				offset: (request.query.page - 1) * request.query.limit,
			});
			// 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
			reply({
				results,
				totalCount
			});
		},
		config: {
			auth: false,
			tags: ['api', 'admin_swagger'],
			description: '排名',
			validate: {
				query: {
					...paginationDefine
				}
			}
		},

	},
	{
		method: 'GET',
		path: `/${GROUP_NAME}/competitionResult`,
		handler: async (request, reply) => {
			const {
				rows: results,
				count: totalCount
			} = await  models.competitionResultModel.findAndCountAll({
				attributes: [
					"id",
					"username",
					"sex",
					"country",
					"competitionType",
					"single",
					"score",
					"award",
					"version"
				],
				limit: request.query.limit,
				offset: (request.query.page - 1) * request.query.limit,
			});
			// 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
			reply({
				results,
				totalCount
			});
		},
		config: {
			auth: false,
			tags: ['api', 'admin_swagger'],
			description: '比赛成绩',
			validate: {
				query: {
					...paginationDefine
				}
			}
		},

	},
	
]