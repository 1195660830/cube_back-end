/**
 * @fileoverview 项目核心文件
 * @author Wade
 */


const Hapi = require('hapi'); // 引入 hapi 框架
const hapiAuthJWT2 = require('hapi-auth-jwt2');

require('env2')('./.env'); // 引入私密目标服务器配置

const config = require('./config'); // 监听接口配置

const routesHelloHapi = require('./routes/hello-hapi'); // 引入测试 服务接口
const routesAdmin = require('./routes/admin/hello-hapi'); // 引入 后台管理 服务接口
const routesApp = require('./routes/app/news'); // 引入 移动端 服务接口
const routesWeb = require('./routes/web/hello-hapi'); // 引入 网页端 服务接口
const routesUser = require('./routes/user'); // 引入 网页端 服务接口


const pluginHapiSwagger = require('./plugins/hapi-swagger'); // 引入 swagger 配置
const pluginHapiPagination = require('./plugins/hapi-pagination'); // 引入 分页 配置

const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2'); // 引入 jwt 配置

const server = new Hapi.Server(); 


server.connection({ 
	// 配置 监听接口	
	host: config.host,
	port: config.port
	}); 

const init = async () => { 
await server.register([
	// 使用 hapi-swagger
	...pluginHapiSwagger,
	pluginHapiPagination,
	hapiAuthJWT2, // 先注册
	]);

pluginHapiAuthJWT2(server); // 加密操作 jwt  顺序不可颠倒

server.route([
	// 业务 接口
	...routesHelloHapi,
	// ...routesAdmin,
	...routesApp,
	...routesWeb,
	...routesUser
]); 

await server.start(); 
console.log('15180601021 韦凯迪 毕业设计 魔方赛事平台 power by hapi');
console.log(`Server running at: ${server.info.uri}`);
console.log(`SWagger Server running at: ${server.info.uri}/documentation`);
};

init();

