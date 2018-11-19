
/**
 * @fileoverview 测试swagger
 * @author Wade
 */

 //配置swagger,还能作为注释使用,简直太方便了

module.exports = [
{
method: 'GET',
			path: '/app',
			handler: (request,reply) => {
				reply('hapi app');
			},
			config: {
				tags: ['api','app_swagger'],
				description: '测试移动端',
				},

},
]

