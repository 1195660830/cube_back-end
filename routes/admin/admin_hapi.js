/**
 * @fileoverview 后台管理端
 * @author Wade
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const Joi = require("joi"); //分页
const { paginationDefine } = require("../../utils/router-helper"); //默认分页
const { jwtHeaderDefine } = require('../../utils/router-helper'); //身份验证
const models = require("../../models"); // 引入实体对象
const Sequelize = require("sequelize"); // 持久类数据库工具

const Op = Sequelize.Op;

const GROUP_NAME = 'admin'; // 宏定义

module.exports = [{
        method: 'GET',
        path: `/${GROUP_NAME}/news`,
        handler: async(request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.newsModels.findAndCountAll({
                    attributes: [
                        'id', 'title', 'content', 'create_user', 'img', 'news_url', 'is_top', 'created_at', 'remark', 'version'
                    ],
                    where: [{
                        status: 1 // 状态为1的
                    }],
                    limit: request.query.limit,
                    offset: (request.query.page - 1) * request.query.limit,
                })
                // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
            reply({
                results,
                totalCount
            });
        },
        config: {
            tags: ['api', `${GROUP_NAME}_news`],
            auth: false,
            description: '获取新闻列表',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },

    },
    {
        method: "POST",
        path: `/${GROUP_NAME}/news`,
        handler: async(request, reply) => {
            models.sequelize.transaction(function(t) {
                // 解决方法 出自 https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize?answertab=votes#tab-top
                request.payload.status = 1
                request.payload.version = 1
                return models.newsModels
                    .findOrCreate({
                        where: {
                            'title': request.payload.title
                        },
                        defaults: request.payload,
                        transaction: t
                    })
                    .spread((user, created) => {
                        console.log(
                            user.get({
                                plain: true
                            })
                        );
                        if (created) {

                            reply({
                                code: 200,
                                request: ["succeed"]
                            });
                        } else {
                            reply({
                                code: 210,
                                request: ["标题重复"]
                            });
                        }
                    });
            });
        },
        config: {
            tags: ["api", `${GROUP_NAME}_news`],
            auth: false,
            description: "添加新闻,标题重复则添加失败",
            validate: {
                payload: {
                    // newsRequest: Joi.object().keys({
                    title: Joi.string(),
                    content: Joi.string(),
                    create_user: Joi.string(),
                    img: Joi.string(),
                    news_url: Joi.string(),
                    is_top: Joi.number().integer(),
                    version: Joi.number().integer(),
                    remark: Joi.string()
                        // }),

                }
            }
        }
    },
    {
        method: "DELETE",
        path: `/${GROUP_NAME}/news/{id}`,
        handler: async(request, reply) => {
            const targetId = request.params.id; // 路径 获取 id
            const result = await models.newsModels.update({
                status: 2
            }, {
                where: [{
                        id: targetId
                    },
                    {
                        status: 1
                    }
                ]
            });
            if (result[0]) {
                //result = 1
                reply({
                    code: 200,
                    result: result
                });
            } else {
                //result = 0
                reply({
                    code: 210,
                    result: "id错误"
                });
            }
        },
        config: {
            tags: ["api", `${GROUP_NAME}_news`],
            auth: false,
            description: "删除",
            validate: {
                params: {
                    id: Joi.string().required().description('删除的id'),
                },
            }
        }
    },
    {
        method: "PUT",
        path: `/${GROUP_NAME}/news`,
        handler: async(request, reply) => {

            // 使用乐观锁设计,首先先查一次 version ,相同,再进行 update


            models.sequelize.transaction(function(t) {
                const targetVersion = request.payload.version
                const targetId = request.payload.id

                return models.newsModels.findOne({
                        where: {
                            [Op.and]: [{
                                    id: targetId
                                },
                                {
                                    version: targetVersion
                                },
                                {
                                    status: 1
                                }
                            ]
                        }
                    })
                    .then(project => {
                        console.log(project, "221212")
                        if (project) {
                            request.payload.version = ++request.payload.version
                            project.update({
                                    ...request.payload
                                })
                                .then(
                                    function() {
                                        reply({
                                            code: 200,
                                            result: 'success'
                                        })
                                    }
                                )
                        } else {
                            reply({
                                code: 210,
                                result: 'id错误或版本号错误'
                            })
                        }
                    })
            });
        },
        config: {
            tags: ["api", `${GROUP_NAME}_news`],
            auth: false,
            description: "修改",
            validate: {
                payload: {
                    id: Joi.number().required().description('删除的id'),
                    version: Joi.number().required().description('删除的version'),
                    title: Joi.string(),
                    content: Joi.string(),
                    create_user: Joi.string(),
                    img: Joi.string(),
                    news_url: Joi.string(),
                    is_top: Joi.number().integer(),
                    remark: Joi.string()


                }
            }
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/filter`,
        handler: async(request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.competitionModel.findAndCountAll({
                attributes: [
                    'id',
                    'location',
                    'country',
                    'name',
                    'event_province',
                    'event_date',
                    'version',
                ],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            });
            // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
            reply({
                results,
                totalCount
            });
        },
        config: {
            auth: false,
            tags: ['api', 'admin_swagger'],
            description: '赛事',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },

    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/hotVideo`,
        handler: async(request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.hotVideoModel.findAndCountAll({
                attributes: [
                    "id",
                    "title",
                    "video_url",
                    "content",
                    "created_at",
                    "is_top",
                    "version",
                    "status",
                    "updated_at",
                    "remark"
                ],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            });
            // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
            reply({
                results,
                totalCount
            });
        },
        config: {
            auth: false,
            tags: ['api', 'admin_swagger'],
            description: '最新视频',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },

    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/ranking`,
        handler: async(request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.rankingModel.findAndCountAll({
                    attributes: [
                        "id",
                        "username",
                        "sex",
                        "apply_competition",
                        "apply_types",
                        "apply_award",
                        "best_competition",
                        "version",
                        "created_at",
                        "remark"
                    ],
                    where: [{
                        status: 1 // 状态为1的
                    }],
                    limit: request.query.limit,
                    offset: (request.query.page - 1) * request.query.limit,
                })
                // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
            reply({
                results,
                totalCount
            });
        },
        config: {
            auth: false,
            tags: ['api', `${GROUP_NAME}_ranking`],
            description: '排名',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },

    },
    {
        method: "POST",
        path: `/${GROUP_NAME}/ranking`,
        handler: async(request, reply) => {
            models.sequelize.transaction(function(t) {
                request.payload.status = 1
                request.payload.version = 1
                return models.rankingModel
                    .findOrCreate({
                        where: {
                            'username': request.payload.username
                        },
                        defaults: {
                            ...request.payload,
                            version: 1
                        },
                        transaction: t
                    })
                    .spread((user, created) => {
                        console.log(
                            user.get({
                                plain: true
                            })
                        );
                        if (created) {

                            reply({
                                code: 200,
                                request: ["succeed"]
                            });
                        } else {
                            reply({
                                code: 210,
                                request: ["选手名字重复"]
                            });
                        }
                    });
            });
        },
        config: {
            tags: ["api", `${GROUP_NAME}_ranking`],
            auth: false,
            notes: "添加排名信息,不允许名字重复",
            description: "添加排名",
            validate: {
                payload: {
                    username: Joi.string(),
                    sex: Joi.string(),
                    apply_competition: Joi.string(),
                    apply_types: Joi.string(),
                    apply_award: Joi.string(),
                    best_competition: Joi.string(),
                    version: '',
                    remark: Joi.string(),
                }
            }
        }
    },
    {
        method: "PUT",
        path: `/${GROUP_NAME}/ranking`,
        handler: async(request, reply) => {

            // 使用乐观锁设计,首先先查一次 version ,相同,再进行 update
            models.sequelize.transaction(function(t) {
                const targetVersion = request.payload.version
                const targetId = request.payload.id

                return models.rankingModel.findOne({
                        where: {
                            [Op.and]: [{
                                    id: targetId
                                },
                                {
                                    version: targetVersion
                                },
                                {
                                    status: 1
                                }
                            ]
                        }
                    })
                    .then(project => {
                        if (project) {
                            request.payload.version = ++request.payload.version
                            project.update({
                                    ...request.payload
                                })
                                .then(
                                    function() {
                                        reply({
                                            code: 200,
                                            result: 'success'
                                        })
                                    }
                                )
                        } else {
                            reply({
                                code: 210,
                                result: 'id错误或版本号错误'
                            })
                        }
                    })
            });
        },
        config: {
            tags: ["api", `${GROUP_NAME}_ranking`],
            auth: false,
            description: "修改排名信息",
            validate: {
                payload: {
                    id: Joi.number().required().description('删除的id'),
                    version: Joi.number().required().description('删除的version'),
                    username: Joi.string(),
                    sex: Joi.string(),
                    apply_competition: Joi.string(),
                    apply_types: Joi.string(),
                    apply_award: Joi.string(),
                    best_competition: Joi.string(),
                    version: Joi.number().integer(),
                    remark: Joi.string(),
                }
            }
        }
    },
    {
        method: "DELETE",
        path: `/${GROUP_NAME}/ranking/{id}`,
        handler: async(request, reply) => {
            const targetId = request.params.id; // 路径 获取 id
            const result = await models.rankingModel.update({
                status: 2
            }, {
                where: [{
                        id: targetId
                    },
                    {
                        status: 1
                    }
                ]
            });
            if (result[0]) {
                //result = 1
                reply({
                    code: 200,
                    result: result
                });
            } else {
                //result = 0
                reply({
                    code: 210,
                    result: "id错误"
                });
            }
        },
        config: {
            tags: ["api", `${GROUP_NAME}_ranking`],
            auth: false,
            description: "删除 排名",
            validate: {
                params: {
                    id: Joi.string().required().description('删除的id'),
                },
            }
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/competitionResult`,
        handler: async(request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.competitionResultModel.findAndCountAll({
                attributes: [
                    "id",
                    "username",
                    "sex",
                    "country",
                    "competitionType",
                    "single",
                    "score",
                    "award",
                    "version"
                ],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            });
            // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
            reply({
                results,
                totalCount
            });
        },
        config: {
            auth: false,
            tags: ['api', 'admin_swagger'],
            description: '比赛成绩',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },

    },

]