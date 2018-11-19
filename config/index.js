/**
 * @fileoverview 监听接口设置
 * @author Wade
 */

const { env }= process;

module.exports = {
	host: env.HOST,
	port: env.PORT,
}
