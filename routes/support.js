/*
 * @Author: wade 
 * @Date: 2019-05-17 14:57:25 
 * @Last Modified by: wade
 * @Last Modified time: 2019-05-17 22:07:10
 * 
 * 开发文件上传功能
 */
// const JWT = require('jsonwebtoken');
// const config = require('../config');

const fs = require('fs')
const Joi = require('joi')
const GROUP_NAME = 'upload'

module.exports = [{
    method: 'POST',
    path: '/store/file/',
    handler: async(request, reply) => {
        // fs.mkdir(__dirname + '/publice', function(err) {
        //     if (err) {
        //         throw err;
        //     }
        const { filename } = request.payload.file.hapi // 获取上传文件
            // writeSync 同步版本
        fs.writeFile(__dirname + `/publice/${filename}`, request.payload.file._data, 'utf8', function(error) {
                if (error) {
                    console.log(error);
                    return false;
                }
                reply(`上传成功`);
            })
            // })
    },
    config: {
        auth: false,
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        tags: ['api', `${GROUP_NAME}`],
        validate: {
            payload: {
                file: Joi.any().meta({ swaggerType: 'file' }).description('你将要上传的图片文件')
            }
        },
        payload: {
            maxBytes: 1048576,
            parse: true,
            output: 'stream'
        }
    }
}]