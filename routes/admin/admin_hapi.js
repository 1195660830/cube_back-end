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
		path: `/${GROUP_NAME}`,
		handler: async (request, reply) => {
			reply("Hello,Itn is admin back_end!")
		},
		config: {
			auth: false,
			tags: ['api', 'admin_swagger'],
			description: 'admin 测试',
		},

	},
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
	// {
	// 	method: 'POST',
	// 	path: `/${GROUP_NAME}/reg`,
	// 	handler: (request, reply) => {
	// 		reply('hapi admin reg');
	// 	},
	// 	config: {
	// 		tags: ['api', 'admin_swagger'],
	// 		description: '注册',
	// 	},

	// },
	// {
	// 	method: 'POST',
	// 	path: `/${GROUP_NAME}/log`,
	// 	handler: (request, reply) => {
	// 		reply('hapi admin log');
	// 	},
	// 	config: {
	// 		tags: ['api', 'admin_swagger'],
	// 		description: '登录',
	// 	},

	// },
	// {
	// 	method: 'GET',
	// 	path: `/${GROUP_NAME}/news`,
	// 	handler: (request, reply) => {
	// 		reply('hapi admin 新闻');
	// 	},
	// 	config: {
	// 		tags: ['api', 'admin_swagger'],
	// 		description: '新闻',
	// 	},

	// },
	// {
	// 	method: 'GET',
	// 	path: `/${GROUP_NAME}/hotVideo`,
	// 	handler: (request, reply) => {
	// 		reply('hapi admin 热门视频');
	// 	},
	// 	config: {
	// 		tags: ['api', 'admin_swagger'],
	// 		description: '热门视频',
	// 	},

	// },
	// {
	// 	method: 'GET',
	// 	path: `/${GROUP_NAME}/recentEvent`,
	// 	handler: (request, reply) => {
	// 		reply('hapi admin 最近赛事');
	// 	},
	// 	config: {
	// 		tags: ['api', 'admin_swagger'],
	// 		description: '最近赛事',
	// 	},

	// },
	// {
	// 	method: 'GET',
	// 	path: `/${GROUP_NAME}/user`,
	// 	handler: (request, reply) => {
	// 		reply('hapi admin 用户');
	// 	},
	// 	config: {
	// 		tags: ['api', 'admin_swagger'],
	// 		description: '用户',
	// 	},

	// },

]