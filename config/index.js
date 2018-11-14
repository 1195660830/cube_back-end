// production evn
//module.exports = {
//	host: '127.0.0.1',
//	port: 3000,
//}
const { env }= process;

module.exports = {
	host: env.HOST,
	port: env.PORT,
}
