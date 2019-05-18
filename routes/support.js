/*
 * @Author: wade 
 * @Date: 2019-05-17 14:57:25 
 * @Last Modified by: wade
 * @Last Modified time: 2019-05-19 07:57:11
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
        path: '/upload/img',
        handler: async(request, reply) => {
            let filename = Math.random().toString(36).substr(2) + '.' + request.payload.file.hapi.filename.split('.').pop()
            console.log(filename)
            fs.writeFile(__dirname + `/publice/img/${filename}`, request.payload.file._data, 'utf8', function(error) {
                if (error) {
                    console.log(error);
                    return false;
                }
                reply(`${filename}`);
            })
        },
        config: {
            auth: false,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            description: '上传静态图片资源至publice文件夹下img,限制大小3M',
            tags: ['api', `${GROUP_NAME}`],
            validate: {
                payload: {
                    file: Joi.any().meta({ swaggerType: 'file' }).description('你将要上传的图片文件')
                }
            },
            payload: {
                maxBytes: 3145728,
                parse: true,
                output: 'stream'
            }
        }
    },
    {
        method: 'GET',
        path: '/image/{imageTarget}',
        handler: function(request, reply) {
            const { imageTarget: imageName } = request.params;
            reply.file(__dirname + `/publice/img/${imageName}`);
        },
        config: {
            auth: false,
            description: '访问publice文件夹下的图片资源',
            tags: ['api', `${GROUP_NAME}`],
        }
    },
]