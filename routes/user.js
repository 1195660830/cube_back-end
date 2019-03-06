const JWT = require('jsonwebtoken');
const config = require('../config');

const GROUP_NAME = 'tests';

module.exports = [{
  method: 'POST',
  path: `/${GROUP_NAME}/createJWT`,
  handler: async (request, reply) => {
    const generateJWT = (jwtInfo) => {
      const payload = {
        // 设计原则,由于时效性,所以 保存一小部分的不变信息即可.
        userId: jwtInfo.userId,
        exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,//过期时间
      };
      return JWT.sign(payload, config.jwtSecret);
    };
    reply(generateJWT({
      userId: 1,
      permission:1
    }));
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: 'JWT 秘钥 签发',
    auth: false, // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
  },
}];