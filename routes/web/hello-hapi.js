/**
 * @fileoverview 测试swagger
 * @author Wade
 */

const models = require("../../models");

const {
	paginationDefine
} = require('../../utils/router-helper');

const GROUP_NAME = 'web';

module.exports = [{
	method: 'GET',
	path: `/${GROUP_NAME}/news`,
	handler: async (request, reply) => {
		const {
			rows: results,
			count: totalCount
		} = await models.newsModels.findAndCountAll({
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
		tags: ['api', 'web_swagger'], // 配置接口组,如果 config 没有,则 单独显示.
		auth: false,
		description: '获取新闻',
		validate: {
			query: {
				...paginationDefine
			}
		}
	}

}, ]