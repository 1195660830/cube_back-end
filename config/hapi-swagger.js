const inert = require('inert');
const vision = require('vision');
const package = require('package');
const hapiswagger = require('hapi-swagger');

module.exports = [
inert,
	vision,{
register: hapiswgger,
		  options: {
info: {
title: '接口文档',
	   version: apckage.version,
	  },
	  //定义接口以 tags 属性定义为分组
grouping: 'tags',
		  tags:[
		  {name: 'test', descript: '测试相关' },
		  ]
		  }
	}
}
