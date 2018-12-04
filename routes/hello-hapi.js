
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
				description: '已使用 jwt,需要首先使用签发机构的接口获取 token,才能使用,但是在 上一行 auth 设置为 false , 即可随意进入',
				validate: {
					...jwtHeaderDefine, // 增加需要 jwt auth 认证的接口 header 校验
				  },
				},
				

},
]

