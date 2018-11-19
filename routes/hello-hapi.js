
/**
 * @fileoverview 测试swagger
 * @author Wade
 */

 //配置swagger,还能作为注释使用,简直太方便了

module.exports = [
{
method: 'GET',
			path: '/',
			handler: (request,reply) => {
				reply('测试hello-hapi');
			},
			config: {
				tags: ['api','test'],
				description: '测试hello-hapi',
				},

},
]

