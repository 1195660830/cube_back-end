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
const GROUP_NAME1 = 'competition';

module.exports = [{
        method: 'GET',
        path: `/${GROUP_NAME}/${GROUP_NAME1}/{competitionId}/applyUser`,
        handler: async(request, reply) => {
            const { competitionId: id } = request.params;
            const {
                rows: results,
                count: totalCount
            } = await models.applyUserModel.findAndCountAll({
                attributes: [
                    "id",
                    "username",
                    "sex",
                    "competition_id",
                    "apply_types",
                    "apply_time",
                    "is_pay",
                    "pay_way",
                    "created_at",
                    "version"
                ],
                where: [{
                    competition_id: id,
                    status: 1
                }],
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
            tags: ['api', `${GROUP_NAME}_${GROUP_NAME1}`],
            notes: '根据比赛id获取参赛选手',
            description: '查询',
            validate: {
                params: {
                    competitionId: Joi.string().required().description('比赛的id'),
                },
                query: {
                    ...paginationDefine
                }
            }
        },

    },
    {
        method: "POST",
        path: `/${GROUP_NAME}/${GROUP_NAME1}/applyUser`,
        handler: async(request, reply) => {
            models.sequelize.transaction(function(t) {
                // 解决方法 出自 https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize?answertab=votes#tab-top
                request.payload.status = 1
                request.payload.version = 1
                return models.applyUserModel
                    .findOrCreate({
                        where: {
                            'username': request.payload.username,
                            'competition_id': request.payload.competition_id,
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
                                request: ["同一个比赛，已存在该名称的选手，请重新检查。"]
                            });
                        }
                    });
            });
        },
        config: {
            tags: ["api", `${GROUP_NAME}_${GROUP_NAME1}`],
            auth: false,
            notes: '添加报名选手,选手姓名重复则添加失败',
            description: "报名比赛",
            validate: {
                payload: {
                    competition_id: Joi.number().integer(),
                    username: Joi.string(),
                    sex: Joi.string(),
                    apply_types: Joi.string(),
                    apply_time: Joi.string(),
                    is_pay: Joi.number(),
                    pay_way: Joi.string(),
                    status: Joi.string(),
                    logo: Joi.string(),
                }
            }
        }
    },
    {
        method: "PUT",
        path: `/${GROUP_NAME}/${GROUP_NAME1}/applyUser`,
        handler: async(request, reply) => {
            // 使用乐观锁设计,首先先查一次 version ,相同,再进行 update
            models.sequelize.transaction(function(t) {
                const { version, id } = request.payload
                return models.applyUserModel.findOne({
                        where: {
                            [Op.and]: [{
                                    id: id
                                },
                                {
                                    version: version
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
            tags: ["api", `${GROUP_NAME}_${GROUP_NAME1}`],
            auth: false,
            description: "修改",
            validate: {
                payload: {
                    id: Joi.number().required().description('删除的id'),
                    version: Joi.number().required().description('删除的version'),
                    competition_id: Joi.string(),
                    username: Joi.string(),
                    sex: Joi.string(),
                    apply_types: Joi.string(),
                    apply_time: Joi.string(),
                    is_pay: Joi.number(),
                    pay_way: Joi.string(),
                    status: Joi.string(),
                    logo: Joi.string(),


                }
            }
        }
    },
    {
        method: "DELETE",
        path: `/${GROUP_NAME}/${GROUP_NAME1}/applyUser/{id}`,
        handler: async(request, reply) => {
            const targetId = request.params.id; // 路径 获取 id
            const result = await models.applyUserModel.update({
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
            tags: ["api", `${GROUP_NAME}_${GROUP_NAME1}`],
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
        method: 'GET',
        path: `/${GROUP_NAME}/${GROUP_NAME1}`,
        handler: async(request, reply) => {
            const {
                rows: results,
                count: totalCount
            } = await models.competitionModel.findAndCountAll({
                // attributes: [
                //     'id',
                //     'logo',
                //     'location',
                //     'country',
                //     'name',
                //     'event_province',
                //     'event_date',
                //     'version',
                //     'created_at',

                // ],
                where: {
                    'status': 1
                },
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
            tags: ['api', `${GROUP_NAME}_${GROUP_NAME1}`],
            description: '获取赛事列表',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },

    },
    {
        method: "POST",
        path: `/${GROUP_NAME}/${GROUP_NAME1}`,
        handler: async(request, reply) => {
            models.sequelize.transaction(function(t) {
                // 解决方法 出自 https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize?answertab=votes#tab-top
                request.payload.status = 1
                request.payload.version = 1
                return models.competitionModel
                    .findOrCreate({
                        where: {
                            'name': request.payload.title
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
                                request: ["已存在名称相同的比赛"]
                            });
                        }
                    });
            });
        },
        config: {
            tags: ["api", `${GROUP_NAME}_${GROUP_NAME1}`],
            auth: false,
            description: "添加赛事,赛事名称重复则添加失败",
            validate: {
                payload: {
                    location: Joi.string(),
                    country: Joi.string(),
                    name: Joi.string(),
                    event_province: Joi.string(),
                    event_date: Joi.string(),
                    logo: Joi.string(),
                    description: Joi.string(), // 内容描述
                    is_finish: Joi.string(), // 是否结束
                    tel: Joi.string(), // 联系电话
                    applyUser_number: Joi.string(), // 限制报名人数
                    applyUser_total: Joi.string(), // 已报名人数
                    QR_logo: Joi.string(), // 客服二维码
                    version: Joi.string(), // 版本号
                    status: Joi.string(), // 状态
                }
            }
        }
    },
    {
        method: "DELETE",
        path: `/${GROUP_NAME}/${GROUP_NAME1}/{id}`,
        handler: async(request, reply) => {
            const targetId = request.params.id; // 路径 获取 id
            const result = await models.competitionModel.update({
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
            tags: ["api", `${GROUP_NAME}_${GROUP_NAME1}`],
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
        path: `/${GROUP_NAME}/${GROUP_NAME1}`,
        handler: async(request, reply) => {
            // 使用乐观锁设计,首先先查一次 version ,相同,再进行 update
            models.sequelize.transaction(function(t) {
                const { version, id } = request.payload
                return models.competitionModel.findOne({
                        where: {
                            [Op.and]: [{
                                    id: id
                                },
                                {
                                    version: version
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
            tags: ["api", `${GROUP_NAME}_${GROUP_NAME1}`],
            auth: false,
            description: "修改",
            validate: {
                payload: {
                    id: Joi.number().required().description('删除的id'),
                    version: Joi.number().required().description('删除的version'),
                    location: Joi.string(),
                    country: Joi.string(),
                    name: Joi.string(),
                    event_province: Joi.string(),
                    event_date: Joi.string(),
                    logo: Joi.string(),
                    description: Joi.string(), // 内容描述
                    is_finish: Joi.string(), // 是否结束
                    tel: Joi.string(), // 联系电话
                    applyUser_number: Joi.string(), // 限制报名人数
                    applyUser_total: Joi.string(), // 已报名人数
                    QR_logo: Joi.string(), // 客服二维码
                    status: Joi.string(), // 状态

                }
            }
        }
    },
    // {
    // 	method: 'GET',
    // 	handler: async (request, reply) => {
    // 		const {
    // 			rows: results,
    // 			count: totalCount
    // 		} = await  models.newsModels.findAndCountAll({
    // 			attributes: [
    // 				'id', 'title', 'content', 'create_user', 'img' , 'news_url', 'is_top', 'created_at','remark','version'
    // 			],
    // 			where: [
    // 				{
    // 					status: 1 // 状态为1的
    // 				}
    // 				],
    // 			limit: request.query.limit,
    // 			offset: (request.query.page - 1) * request.query.limit,
    // 		})
    // 		// 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
    // 		reply({
    // 			results,
    // 			totalCount
    // 		});
    // 	},
    // 	config: {
    // 		tags: ['api', `${GROUP_NAME}_news`],
    // 		auth: false,
    // 		description: '',
    // 		validate: {
    // 			query: {
    // 				...paginationDefine
    // 			}
    // 		}
    // 	},

    // },
    // {
    // 	method: "POST",
    // 	path: `/${GROUP_NAME}/news`,
    // 	handler: async (request, reply) => {
    // 		models.sequelize.transaction(function (t) {
    // 			// 解决方法 出自 https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize?answertab=votes#tab-top
    // 			request.payload.status = 1
    // 			request.payload.version = 1
    // 			return models.newsModels
    // 				.findOrCreate({
    // 					where: {
    // 						'title': request.payload.title
    // 					},
    // 					defaults: request.payload,
    // 					transaction: t
    // 				})
    // 				.spread((user, created) => {
    // 					console.log(
    // 						user.get({
    // 							plain: true
    // 						})
    // 					);
    // 					if (created) {

    // 						reply({
    // 							code: 200,
    // 							request: ["succeed"]
    // 						});
    // 					} else {
    // 						reply({
    // 							code: 210,
    // 							request: ["标题重复"]
    // 						});
    // 					}
    // 				});
    // 		});
    // 	},
    // 	config: {
    // 		tags: ["api", `${GROUP_NAME}_news`],
    // 		auth: false,
    // 		description: "添加新闻,标题重复则添加失败",
    // 		validate: {
    // 			payload: {
    // 				// newsRequest: Joi.object().keys({
    // 					title: Joi.string(),
    // 					content: Joi.string(),
    // 					create_user: Joi.string(),
    // 					img: Joi.string(),
    // 					news_url: Joi.string(),
    // 					is_top: Joi.number().integer(),
    // 					version: Joi.number().integer(),
    // 					remark: Joi.string()
    // 				// }),

    // 			}
    // 		}
    // 	}
    // },
    // {
    // 	method: "DELETE",
    // 	path: `/${GROUP_NAME}/news/{id}`,
    // 	handler: async (request, reply) => {
    // 		const targetId = request.params.id;// 路径 获取 id
    // 		const result = await models.newsModels.update({
    // 			status: 2
    // 		}, {
    // 			where: [{
    // 					id: targetId
    // 				},
    // 				{
    // 					status: 1
    // 				}
    // 			]
    // 		});
    // 		if (result[0]) {
    // 			//result = 1
    // 			reply({
    // 				code: 200,
    // 				result: result
    // 			});
    // 		} else {
    // 			//result = 0
    // 			reply({
    // 				code: 210,
    // 				result: "id错误"
    // 			});
    // 		}
    // 	},
    // 	config: {
    // 		tags: ["api", `${GROUP_NAME}_news`],
    // 		auth: false,
    // 		description: "删除",
    // 		validate: {
    // 			params: {
    // 				id: Joi.string().required().description('删除的id'),
    // 			},
    // 		}
    // 	}
    // },
    // {
    // 	method: "PUT",
    // 	path: `/${GROUP_NAME}/news`,
    // 	handler: async (request, reply) => {

    // 		// 使用乐观锁设计,首先先查一次 version ,相同,再进行 update


    // 		models.sequelize.transaction(function (t) {
    // 			const targetVersion = request.payload.version
    // 			const targetId = request.payload.id

    // 			return models.newsModels.findOne({
    // 				where: {
    // 					[Op.and]: [{
    // 							id: targetId
    // 						},
    // 						{
    // 							version: targetVersion
    // 						},
    // 						{
    // 							status: 1
    // 						}
    // 					]
    // 				}
    // 			})
    // 			.then(project => {
    // 				console.log(project,"221212")
    // 				if (project) {
    // 					request.payload.version = ++ request.payload.version
    // 					project.update({
    // 							...request.payload
    // 						})
    // 						.then(
    // 						function () {
    // 							reply({
    // 								code: 200,
    // 								result: 'success'
    // 							})
    // 						}
    // 						)
    // 				}else{
    // 					reply({
    // 						code: 210,
    // 						result: 'id错误或版本号错误'
    // 					})
    // 				}
    // 			})
    // 		});
    // 	},
    // 	config: {
    // 		tags: ["api", `${GROUP_NAME}_news`],
    // 		auth: false,
    // 		description: "修改",
    // 		validate: {
    // 			payload: {
    // 				id: Joi.number().required().description('删除的id'),
    // 				version: Joi.number().required().description('删除的version'),
    // 					title: Joi.string(),
    // 					content: Joi.string(),
    // 					create_user: Joi.string(),
    // 					img: Joi.string(),
    // 					news_url: Joi.string(),
    // 					is_top: Joi.number().integer(),
    // 					remark: Joi.string()


    // 			}
    // 		}
    // 	}
    // } 

]