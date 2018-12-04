
/**
 * @fileoverview 测试swagger
 * @author Wade
 */

const { jwtHeaderDefine } = require('../utils/router-helper');

module.exports = [
{
method: 'GET',
			path: '/',
			handler: (request,reply) => {
				reply('测试hello-hapi');
			},
			config: {
				tags: ['api','test'],
				auth:false,
				description: '测试hello-hapi',
				validate: {
					...jwtHeaderDefine, // 增加需要 jwt auth 认证的接口 header 校验
				  },
				},
				

},
]

