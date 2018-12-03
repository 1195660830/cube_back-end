/**
 * @fileoverview 测试swagger
 * @author Wade
 */

//配置swagger,还能作为注释使用,简直太方便了

const models = require("../../models");

module.exports = [{
	method: 'GET',
	path: '/web/news',
	handler: (request, reply) => {
		// 通过 await 来异步查取数据
		const result = await models.news.findAll({
			attributes: [
				'id'
			]
		});
		reply(result)
	},
	config: {
		tags: ['api', 'test'],
		description: '获取首页赛事新闻',
	},

}, ]