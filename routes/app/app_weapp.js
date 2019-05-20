/**
 * @fileoverview 移动端 新闻相关接口 添加 删除 修改 查询 搜索 功能
 * @author Wade
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const Joi = require("joi");
const { paginationDefine } = require("../../utils/router-helper");
const { jwtHeaderDefine } = require('../../utils/router-helper');
const models = require("../../models");
const Sequelize = require("Sequelize");

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const Op = Sequelize.Op;
const GROUP_NAME = "app";
const GROUP_LABEL1 = "weapp_news";
const GROUP_LABEL2 = "weapp_competitions";
const GROUP_LABEL3 = "weapp_hotVideo";
const GROUP_LABEL4 = "weapp_applyUser";
const GROUP_LABEL5 = "weapp_competitionResult";
const GROUP_LABEL6 = "weapp_ranking";
const GROUP_LABEL7 = "weapp_common";


module.exports = [{
        method: "Get",
        path: `/${GROUP_NAME}/news`,
        handler: async(request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.newsModels.findAndCountAll({
                attributes: [
                    "id",
                    "title",
                    "content",
                    "create_user",
                    "news_url",
                    "is_top",
                    "created_at",
                    "version",
                    "img",
                    'remark'
                ],
                where: {
                    status: 1
                },
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit
            });
            reply({
                results,
                totalCount
            });
        },
        config: {
            tags: ["api", `${GROUP_LABEL1}`, ],
            auth: false,
            description: "查询新闻",
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        }
    },
    // {
    //     method: "POST",
    //     path: `/${GROUP_NAME}/news`,
    //     handler: async(request, reply) => {
    //         models.sequelize.transaction(function(t) {
    //             // 解决方法 出自 https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize?answertab=votes#tab-top
    //             request.payload.newsRequest.status = 1
    //             request.payload.newsRequest.version = 1
    //             return models.newsModels
    //                 .findOrCreate({
    //                     where: {
    //                         'title': request.payload.newsRequest.title
    //                     },
    //                     defaults: request.payload.newsRequest,
    //                     transaction: t
    //                 })
    //                 .spread((user, created) => {
    //                     console.log(
    //                         user.get({
    //                             plain: true
    //                         })
    //                     );
    //                     if (created) {

    //                         reply({
    //                             code: 200,
    //                             request: ["succeed"]
    //                         });
    //                     } else {
    //                         reply({
    //                             code: 210,
    //                             request: ["失败"]
    //                         });
    //                     }
    //                 });
    //         });
    //     },
    //     config: {
    //         tags: ["api", `${GROUP_LABEL1}`],
    //         auth: false,
    //         description: "添加新闻,标题重复则添加失败",
    //         validate: {
    //             payload: {
    //                 newsRequest: Joi.object().keys({
    //                     title: Joi.string(),
    //                     content: Joi.string(),
    //                     create_user: Joi.string(),
    //                     img: Joi.string(),
    //                     news_url: Joi.string(),
    //                     is_top: Joi.number().integer(),
    //                     version: Joi.number().integer(),
    //                     remark: Joi.string()
    //                 }),

    //             }
    //         }
    //     }
    // },
    {
        method: "GET",
        path: `/${GROUP_NAME}/news/{search}`,
        handler: async(request, reply) => {
            const targetSearch = request.params.search;
            const {
                rows: results,
                count: totalCount
            } = await models.newsModels.findAndCountAll({
                attributes: [
                    "id",
                    "title",
                    "content",
                    "create_user",
                    "news_url",
                    "is_top",
                    "created_at",
                    "version"
                ],
                where: {
                    'status': 1,
                    [Op.or]: [{
                            title: {
                                [Op.like]: "%" + targetSearch + "%"
                            }
                        },
                        {
                            content: {
                                [Op.like]: "%" + targetSearch + "%"
                            }
                        }
                    ]
                },
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit
            });
            reply({
                results,
                totalCount
            });
            console.log("模糊查询" + "结果" + totalCount);
        },
        config: {
            tags: ["api", `${GROUP_LABEL1}`],
            auth: false,
            description: "模糊查询,新闻标题,新闻内容,只要包含关键字,都能搜索出来",
            validate: {
                params: {
                    search: Joi.string()
                        .required()
                        .description("搜索的关键字")
                },
                query: {
                    ...paginationDefine
                }
            }
        }
    },
    // {
    //     method: "DELETE",
    //     path: `/${GROUP_NAME}/news/{id}`,
    //     handler: async(request, reply) => {
    //         const targetId = request.params.id;
    //         const result = await models.newsModels.update({
    //             status: 2
    //         }, {
    //             where: [{
    //                     id: targetId
    //                 },
    //                 {
    //                     status: 1
    //                 }
    //             ]
    //         });
    //         if (result[0]) {
    //             //result = 1
    //             reply({
    //                 code: 200,
    //                 result: result
    //             });
    //         } else {
    //             //result = 0
    //             reply({
    //                 code: 210,
    //                 result: "id错误"
    //             });
    //         }
    //     },
    //     config: {
    //         tags: ["api", `${GROUP_LABEL1}`],
    //         auth: false,
    //         description: "删除",
    //         validate: {
    //             params: {
    //                 id: Joi.string().required().description('删除的id'),
    //             },
    //             ...jwtHeaderDefine, // 增加需要 jwt auth 认证的接口 header 校验
    //         }
    //     }
    // },
    // {
    //     method: "PUT",
    //     path: `/${GROUP_NAME}/news/{id}`,
    //     handler: async(request, reply) => {

    //         // 使用乐观锁设计,首先先查一次 version ,相同,再进行 update

    //         const targetVersion = request.query.version
    //         const targetId = request.params.id

    //         request.payload.newsRequest.version = ++request.query.version

    //         models.newsModels.findOne({
    //                 where: {
    //                     [Op.and]: [{
    //                             id: targetId
    //                         },
    //                         {
    //                             version: targetVersion
    //                         }, {
    //                             status: 1
    //                         }
    //                     ]
    //                 }
    //             })
    //             .then(project => {
    //                 if (project) {
    //                     project.update({
    //                             ...request.payload.newsRequest
    //                         })
    //                         .then(
    //                             function() {
    //                                 reply({
    //                                     code: 200,
    //                                     result: 'success'
    //                                 })
    //                             }
    //                         )
    //                 } else {
    //                     reply({
    //                         code: 210,
    //                         result: 'id错误或版本号错误'
    //                     })
    //                 }
    //             })
    //     },
    //     config: {
    //         tags: ["api", `${GROUP_LABEL1}`],
    //         auth: false,
    //         description: "修改",
    //         validate: {
    //             params: {
    //                 id: Joi.string().required().description('删除的id'),
    //             },
    //             query: {
    //                 version: Joi.string().required().description('删除的version')
    //             },
    //             payload: {
    //                 newsRequest: Joi.object().keys({
    //                     title: Joi.string(),
    //                     content: Joi.string(),
    //                     create_user: Joi.string(),
    //                     img: Joi.string(),
    //                     news_url: Joi.string(),
    //                     is_top: Joi.number().integer(),
    //                     remark: Joi.string()
    //                 }),

    //             }
    //         }
    //     }
    // },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/competitions`,
        handler: async(request, reply) => {
            console.log(request)
            const { is_finish } = request.query;
            const showCol = [
                'id',
                'logo',
                'location',
                'country',
                'name',
                'event_province',
                'event_date',
                'version',
                'is_finish',
                'applyUser_total',
                'applyUser_number',
            ]
            if (is_finish == 0 || is_finish == '') {
                // 0 和 空 全选
                const {
                    rows: results,
                    count: totalCount
                } = await models.competitionModel.findAndCountAll({
                    attributes: showCol,
                    where: {
                        status: 1
                    },
                    limit: request.query.limit,
                    offset: (request.query.page - 1) * request.query.limit,
                });

                // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
                reply({
                    results,
                    totalCount
                });
            } else {
                const {
                    rows: results,
                    count: totalCount
                } = await models.competitionModel.findAndCountAll({
                    attributes: showCol,
                    where: {
                        'is_finish': is_finish,
                        status: 1
                    },
                    limit: request.query.limit,
                    offset: (request.query.page - 1) * request.query.limit,
                });

                // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
                reply({
                    results,
                    totalCount
                });
            }
        },
        config: {
            auth: false,
            tags: ['api', `${GROUP_LABEL2}`, ],
            description: '赛事',
            notes: '0 和 空 等于 全选',
            validate: {
                query: {
                    is_finish: Joi.string().description('0 全部 1 正在报名 2 结束报名'),
                    ...paginationDefine

                }
            }
        },

    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/competitions/{competitionId}`,
        handler: async(request, reply) => {
            const { competitionId: id } = request.params
            models.competitionModel.findAll({
                where: {
                    id: id
                }
            }).then(results => {
                reply({
                    results
                })
            })
        },
        config: {
            auth: false,
            tags: ['api', `${GROUP_LABEL2}`, ],
            description: '根据比赛id来，获取比赛详情',
            validate: {
                params: {
                    competitionId: Joi.string().required().description('比赛的id'),
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
                    "remark",
                    "create_user"
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
            tags: ['api', `${GROUP_LABEL3}`],
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
        path: `/${GROUP_NAME}/applyUser`,
        handler: async(request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.applyUserModel.findAndCountAll({
                attributes: [
                    "id",
                    "username",
                    "sex",
                    "apply_types",
                    "apply_time",
                    "is_pay",
                    "pay_way",
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
            tags: ['api', `${GROUP_LABEL4}`],
            description: '报名参赛选手',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },

    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/apply`,
        handler: async(request, reply) => {
            const { competition_id: com_id, user_id: user_id } = request.payload
            console.log(com_id, user_id);

            models.competitionModel.count({
                    where: {
                        id: com_id
                    }
                })
                .then(results => {
                    if (results == 1) {
                        models.users.count({
                            where: {
                                id: user_id
                            }
                        }).then(results => {
                            if (results == 1) {
                                // reply("成功")
                                models.applyUserModel.upsert({
                                    // defaults: {
                                    // competition_id: com_id,
                                    // username: user_id,
                                    ...request.payload,
                                    sex: '测试',
                                    competition_id: com_id,
                                    // username: Joi.string(),
                                    // sex: Joi.string(),
                                    // apply_types: Joi.string(),
                                    // apply_time: Joi.string(),
                                    // is_pay: Joi.string(),
                                    // pay_way: Joi.string(),
                                    // status: Joi.string(),
                                    // logo: Joi.string(),

                                }).then(results => {
                                    console.log(results)
                                    reply(results ? '报名成功' : '出错了')
                                })

                            } else {
                                reply("用户id，错误")
                            }
                        })
                    } else {
                        reply("比赛id，错误")
                    }
                })


        },
        config: {
            auth: false,
            tags: ['api', `${GROUP_LABEL4}`, ],
            notes: '比赛id和用户id，必须存在。',
            description: '报名参赛',
            validate: {
                payload: {
                    // competitionId: Joi.string().required().description('比赛id'),
                    competition_id: Joi.string().required().description('比赛id'),
                    user_id: Joi.string().required().description('选手id'),
                    username: Joi.string(),
                    sex: Joi.string(),
                    apply_types: Joi.string(),
                    apply_time: Joi.string(),
                    is_pay: Joi.string(),
                    pay_way: Joi.string(),
                    status: Joi.string(),
                    logo: Joi.string(),
                    // info:Joi.string().required().description('选手id'),
                }
            }
        },

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
                    "version",
                    "created_at"
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
            tags: ['api', `${GROUP_LABEL5}`],
            description: '比赛成绩',
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
                    "logo"
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
            tags: ['api', `${GROUP_LABEL6}`],
            description: '排名',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },

    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/commenInfo`,
        handler: async(request, reply) => {
            const {
                count: news_count
            } = await models.rankingModel.findAndCountAll({ where: { 'status': 1 } })

            const {
                count: commetition_count
            } = await models.competitionModel.findAndCountAll({ where: { 'status': 1 } })

            const {
                count: video_count
            } = await models.hotVideoModel.findAndCountAll({ where: { 'status': 1 } })

            reply({
                'mews_count': news_count,
                'commetition_count': commetition_count,
                'video_count': video_count,
            });
        },
        config: {
            auth: false,
            tags: ['api', `${GROUP_LABEL7}`],
            description: '获取首页，赛事，视频，新闻统计信息',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },

    },
];