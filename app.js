// app.js 
const Hapi = require('hapi'); 
const server = new Hapi.Server(); // 配置服务器启动 host 与端口 
server.connection({ port: 3000 }); 
const init = async () => { 
	server.route([ // 创建一个简单的 hello hapi 接口 
		{ method: 'GET', path: '/', handler: (request, reply) => { 
			//reply('hello hapi power by require hapi!!'); 
			reply('hello hapi every day!'); 
		}, 
	}, 
]); // 启动服务 
await server.start(); 
console.log(`Server running at: ${server.info.url};`);
 }; 
 init();

