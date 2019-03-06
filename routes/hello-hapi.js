
/**
 * @fileoverview 测试swagger
 * @author Wade
 */

const { jwtHeaderDefine } = require('../utils/router-helper');

var crypto = require('crypto');


module.exports = [
  {
    method: 'POST',
    path: '/',
    handler: (request, reply) => {
      /*
      plugins/hapi-auth-jwt2.js 中的 credentials 定义

      const credentials = {
        userId,
      };
      */
      const password = 'weikaidi'

     var md5 = crypto.createHash('md5');
     
     var result = md5.update(password).digest('hex');
     
     // 输出：0cc175b9c0f1b6a831c399e269772661
     console.log(result);


      console.log(request.auth.credentials); // 控制台输出 { userId: 1}
      reply('秘钥有效');
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试 jwt 秘钥',
      auth:'jwt',
      validate: {
        ...jwtHeaderDefine, // 增加需要 jwt auth 认证的接口 header 校验
      },
    },
  },
  {
		method: 'GET',
		path: '/',
		handler: async (request, reply) => {
			reply("Hello,It is cube_web back_end!")
		},
		config: {
			auth: false,
			tags: ['api', 'tests'],
			description: '联通 测试',
		},

	},
];

