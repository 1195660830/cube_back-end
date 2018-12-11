
/**
 * @fileoverview 解码  https://jwt.io/
 * @author Wade
 */

 //------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/*
    接口 POST /users/createJWT 中的 jwt 签发规则

    const payload = {
      userId: jwtInfo.userId,
      exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
    };
    return JWT.sign(payload, config.jwtSecret);
  */

  // decoded 为 JWT payload 被解码后的数据

const config = require('../config');

const validate = (decoded, request, callback) => {
  let error;
  
  const { userId,permission } = decoded;

  if (!userId) {
    // id 为空
    return callback(error, false, userId);
  }

  if (!permission) {
    // 权限 为空
    return callback(error, false, permission);
  }

  const credentials = {
    userId,
    permission
  };
  
  // 在路由接口的 handler 通过 request.auth.credentials 获取 jwt decoded 的值
  return callback(error, true, credentials);
};

module.exports = (server) => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validateFunc: validate,
  });
  server.auth.default('jwt');// 配置 config 的 auth 默认为 'jwt',如不需要则配置 auth 为 flase
};
