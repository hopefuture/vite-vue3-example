import path from 'path';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import views from 'koa-views';
import Router from '@koa/router';

import getConfig from './config';
import {
  requestLogger,
} from './middlewares/logger/index';
import apiRoutes from './routers/api-routes';
import pageRoutes from './routers/page-routes';

const isDev = process.env.NODE_ENV === 'development';

const app = new Koa();

const render = views(isDev ? path.join(__dirname, '../') : path.join(__dirname, '../public'), {
  map: {
    html: 'nunjucks',
  },
});

const router = new Router();

/**
 * 中间件书写顺序
  1. 设置一些格式化中间件，比如：koa-bodyparser
  2. 处理日志中间件
  3. 中间件 - 静态文件
  4. 处理登录、权限中间件
  5. 处理 api 路由中间件，改中间件需要判断是否是 api 接口，如不是或报错则 next()
  6. 页面中间件
  7. 异常中间件
*/

// 格式化 body 中间件，https://www.npmjs.com/package/koa-bodyparser
app.use(bodyParser());

// 中间件 - 采集日志
app.use(requestLogger());

// 中间件 - 静态文件
app.use(koaStatic(isDev ? path.join(__dirname, '../') : path.join(__dirname, '../public'), { index: false }));

// 页面渲染中间件
app.use(render);

// 接口路由
apiRoutes(router);

// 页面路由
pageRoutes(router);

// 路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());

getConfig().then((config: any) => {
  app.listen(config.port, () => {
    console.info('服务启动成功');
  });
});
