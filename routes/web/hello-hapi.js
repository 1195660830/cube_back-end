
/**
 * @fileoverview 测试swagger
 * @author Wade
 */

const models = require("../../models");

const GROUP_NAME = 'web';

module.exports = [
{
			method: 'GET',
			path: `/${GROUP_NAME}/news`,
			handler:async (request,reply) => {
				const result = await models.newsModels.findAll(
					{
						attributes: [
						  'id','title','content','create_user','news_url','is_top','created_at'
						]
					  }
				);
     			reply(result)
			},
			config: {
				tags: ['api','web_swagger'], // 配置接口组,如果 config 没有,则 单独显示.
				description: '获取新闻',
				},

},
]
