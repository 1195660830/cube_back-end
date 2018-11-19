/**
 * @fileoverview 测试swagger
 * @author Wade
 */

//配置swagger,还能作为注释使用,简直太方便了

const Joi = require('joi');

const GROUP_NAME = 'app';
const GROUP_USER = 'user';



module.exports = [{
		method: 'GET',
		path: '/app',
		handler: (request, reply) => {
			reply('hapi app');
		},
		config: {
			tags: ['api', 'app_swagger'],
			description: '测试移动端',
		},

	},
	// 粗例子
	{
		method: 'POST',
		path: `/${GROUP_NAME}/{orderId}/goodsID`,
		handler: async (request, reply) => {
			reply();
		},
		config: {
			tags: ['api', GROUP_NAME],
			description: '创建订单',
			validate: {
				headers: Joi.object({
					// 请求头 headers 设置参数
					authorization: Joi.string().required(),
				}).unknown(),
				params: {
					orderId: Joi.string().required(),
				  },
				payload: {
					// 请求体 参数 设置
					goodsList: Joi.array().items(
						Joi.object().keys({
							goods_id: Joi.number().integer(),
							count: Joi.number().integer(),
						}),
					),
				},
				query: {
					limit: Joi.number().integer().min(1).default(10)
					  .description('每页的条目数'),
					page: Joi.number().integer().min(1).default(1)
					  .description('页码数'),
				  }
			},
		},
	},
	{	/*
			 http://localhost:8080/app/recentEvent?limit=10&page=1 
		*/
		method: 'GET',
		path: `/${GROUP_NAME}/recentEvent`,
		handler: async (request, reply) => {
			reply();
		},
		config: {
			tags: ['api', '首页'],
			description: '最近赛事',
			validate: {
				query: {
					limit: Joi.number().integer().min(1).default(10)
					  .description('每页的条目数'),
					page: Joi.number().integer().min(1).default(1)
					  .description('页码数'),
				  }
			},
		},
	},
	{	
	/*
		http://localhost:8080/app/user/inf 
		Headers->token->....
   */
   method: 'POST',
   path: `/${GROUP_NAME}/${GROUP_USER}/inf`,
   handler: async (request, reply) => {
	//    reply(`${this.config.validate.headers.token}`);
	reply("111111")
   },
   config: {
	   tags: ['api', '用户'],
	   description: '个人信息',
	   validate: {
		headers: Joi.object({
			token: Joi.string().required(),
		}).unknown(),
	   },
   }
},
   {	
	/*
		http://localhost:8080/app/search/赛事名称 
		Headers->token->....
   */
   method: 'POST',
   path: `/${GROUP_NAME}/search/{name}`,
   handler: async (request, reply) => {
	//    reply(`${this.config.validate.headers.token}`);
	reply("111111")
   },
   config: {
	   tags: ['api', '搜索'],
	   description: '模糊查询',
	   validate: {
		params: {
			name: Joi.string().required(),
		  },
	   },
	},
},
]