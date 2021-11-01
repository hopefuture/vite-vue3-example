const Koa = require('koa');
const {
  requestLogger,
} = require('./middlewares/logger/index');

const app = new Koa();

app.use(requestLogger());

app.listen(3000);
