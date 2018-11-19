const inert = require('inert');
const vision = require('vision');
const packageModule = require('package');
const hapiSwagger = require('hapi-swagger');

module.exports = [
	inert,
	vision,
	{
		register: hapiSwagger,
		options: {
			info: {
				title: '毕业设计魔方赛事平台接口文档',
				version: packageModule.version,
			},
			grouping: 'tags',
			tags: [{
					name: 'tests',
					description: '测试相关'
				},
				{
					name: 'admin_swagger',
					description: '后台管理相关'
				},
				{
					name: 'app_swagger',
					description: '移动端相关'
				},
				{
					name: 'web_swagger',
					description: 'web端相关'
				}
			],
			
			
		},
	},
];