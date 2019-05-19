/**
 * @fileoverview Joi 共用注入 配置
 * @author Wade
 */

const Joi = require('joi');

// 分页注入
const paginationDefine = {
    limit: Joi.number().integer().min(1).default(10)
        .description('每页的条目数'),
    page: Joi.number().integer().min(1).default(1)
        .description('页码数'),
    pagination: Joi.boolean().description('是否开启分页，默认为true'),
}

//身份验证注入
// 如果有 authorization 就必须要填写 相应token
const jwtHeaderDefine = {
    headers: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
};

module.exports = {
    paginationDefine,
    jwtHeaderDefine
}