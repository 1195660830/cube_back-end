/**
 * @fileoverview 分页组件 配置 展示字段,以及请求时,默认字段
 * @author Wade
 */

const hapiPagination = require('hapi-pagination');

const options = {
  query: {
    page: {
      name: 'page',
      default: 1,
    },
    limit: {
      name: 'limit',
      default: 25,
    },
    pagination: {
      name: 'pagination',
      default: true,
    },
    invalid: 'defaults',
  },
  meta: {
    name: 'meta',
    count: {
      active: true,
      name: 'count',
    },
    totalCount: {
      active: true,
      name: 'totalCount',
    },
    pageCount: {
      active: true,
      name: 'pageCount',
    },
    self: {
      active: true,
      name: 'self',
    },
    previous: {
      active: true,
      name: 'previous',
    },
    next: {
      active: true,
      name: 'next',
    },
    first: {
      active: true,
      name: 'first',
    },
    last: {
      active: true,
      name: 'last',
    },
    page: {
      active: false,
      // name == default.query.page.name
    },
    limit: {
      active: false,
      // name == default.query.limit.name
    },
  },
  results: {
    name: 'results',
  },
  reply: {
    paginate: 'paginate',
  },
  routes: {
      // 使用以上字段进行提示的 路径白名单
    include: [  
      '/web/news',
    ],
    exclude: [],
  },
};

module.exports = {
  register: hapiPagination,
  options,
};
