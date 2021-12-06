import got from 'got';

import getConfig from '../config';

/**
 * 统一处理前端 api，直接映射到 java 端对应的 api 路由
 */

async function apiRoutes(router: any) {
  const config = await getConfig();

  // 正则表达式匹配接口路由
  router.all('/api/(.+)', async (ctx: any) => {
    const {
      url, method, query, body, header,
    } = ctx.request;

    let params;
    if (header['content-type'] && header['content-type'].indexOf('application/json') > -1) {
      /**
       * method 包括 HEAD、OPTIONS、GET、PUT、PATCH、POST、DELETE
       * 请求是 OPTIONS、PUT、PATCH、POST、DELETE，前端传的参数可以从 ctx.request.body 和 ctx.request.query 中获取，但前端处理的时候，只传入到 body 中即可
       * 请求是 GET 请求，只接受 ctx.request.query
       * 请求是 HEAD 无返回值
       * 这里只处理 GET、PUT、PATCH、POST、DELETE
       */
      if (method === 'GET') {
        params = query;
      } else {
        params = body;
      }
    }

    // 替换掉前缀 api
    const dPrefixUrl = url.replace(/^(\/api)(?=\/)/g, '');
    const data = await got(config.serverUrl + dPrefixUrl, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        // 'user-agent': userAgent,
        // cookie,
      },
      // body: JSON.stringify(params),
      responseType: 'json',
    });
    ctx.body = data;
  });
}

export default apiRoutes;
