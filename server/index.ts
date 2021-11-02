import Koa from 'koa';
import {
  requestLogger,
} from './middlewares/logger/index';

const app = new Koa();

app.use(requestLogger());

app.listen(3000);
