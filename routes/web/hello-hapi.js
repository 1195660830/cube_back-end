
/**
 * @fileoverview 测试swagger
 * @author Wade
 */

 //配置swagger,还能作为注释使用,简直太方便了

module.exports = [
{
method: 'GET',
			path: '/web',
			handler: (request,reply) => {
				reply('hapi web');
			},
			config: {
				tags: ['api','web_swagger'], // 配置接口组,如果 config 没有,则 单独显示.
				description: '测试 web端',
				},

},
]

