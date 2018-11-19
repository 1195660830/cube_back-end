/**
 * @fileoverview 测试swagger
 * @author Wade
 */

//配置swagger,还能作为注释使用,简直太方便了

const GROUP_NAME = 'admin'; // 宏定义

module.exports = [{
		method: 'GET',
		path: `/${GROUP_NAME}`,
		handler: (request, reply) => {
			reply('hapi admin');
		},
		config: {
			tags: ['api', 'admin_swagger'],
			description: '测试 admin',
		},

	},
	{
		method: 'POST',
		path: `/${GROUP_NAME}/reg`,
		handler: (request, reply) => {
			reply('hapi admin reg');
		},
		config: {
			tags: ['api', 'admin_swagger'],
			description: '注册',
		},

	},
	{
		method: 'POST',
		path: `/${GROUP_NAME}/log`,
		handler: (request, reply) => {
			reply('hapi admin log');
		},
		config: {
			tags: ['api', 'admin_swagger'],
			description: '登录',
		},

	},
	{
		method: 'GET',
		path: `/${GROUP_NAME}/news`,
		handler: (request, reply) => {
			reply('hapi admin 新闻');
		},
		config: {
			tags: ['api', 'admin_swagger'],
			description: '新闻',
		},

	},
	{
		method: 'GET',
		path: `/${GROUP_NAME}/hotVideo`,
		handler: (request, reply) => {
			reply('hapi admin 热门视频');
		},
		config: {
			tags: ['api', 'admin_swagger'],
			description: '热门视频',
		},

	},
	{
		method: 'GET',
		path: `/${GROUP_NAME}/recentEvent`,
		handler: (request, reply) => {
			reply('hapi admin 最近赛事');
		},
		config: {
			tags: ['api', 'admin_swagger'],
			description: '最近赛事',
		},

	},
	{
		method: 'GET',
		path: `/${GROUP_NAME}/user`,
		handler: (request, reply) => {
			reply('hapi admin 用户');
		},
		config: {
			tags: ['api', 'admin_swagger'],
			description: '用户',
		},

	},

]