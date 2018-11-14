// app.js 
const Hapi = require('hapi');
require('env2')('./.env');
const config = require('./config');
const routesHelloHapi = require('./routes/hello-hapi');

const server = new Hapi.Server(); 
// 配置服务器启动 host 与端口 

server.connection({ 
	
	host: config.host,
	port: config.port
	}); 

const init = async () => { 
	server.route([
	// 创建一个简单的 hello hapi 接口
	...routesHelloHapi,
]); 

await server.start(); 
console.log(`Server running at: ${server.info.url};`);
};

init();

