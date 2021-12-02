import Koa from 'koa';
import {
  requestLogger,
} from './middlewares/logger/index';

const app = new Koa();

// 中间件 - 采集日志
app.use(requestLogger());

app.listen(3000);
