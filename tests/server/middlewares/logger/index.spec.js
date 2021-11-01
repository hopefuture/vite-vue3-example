const Koa = require('koa');
const supertest = require('supertest');
const Transport = require('winston-transport');
const { expect } = require('chai');
const {
  error, warn, info, debug, requestLogger,
} = require('../../../../server/middlewares/logger/index');

// 自定义 winston transport
class CustomTransport extends Transport {
  constructor(msgs = []) {
    super();
    this.msgs = msgs;
  }

  log(msgs, callback) {
    this.msgs.push(msgs);
    callback(null, true);
  }
}

const useLogger = (handler = (ctx) => {
  ctx.body = 'logger';
}, transports) => {
  const app = new Koa();
  app.use(requestLogger(transports));
  app.use(handler);

  return app.listen();
};

describe('koa winston 日志输出测试', () => {
  it('1、错误日志-error', () => {
    error('错误日志');
  });

  it('2、警告日志-warn', () => {
    warn('警告日志');
  });

  it('3、debug日志-debug', () => {
    debug('debug日志');
  });

  it('4、info日志-info', () => {
    info('info日志');
  });
});

describe('koa winston request请求日志测试', () => {
  it('1、log level should be warn when status=400', async () => {
    const msgs = [];
    const warnHandler = (ctx) => {
      ctx.status = 400;
    };
    const app = useLogger(
      warnHandler,
      new CustomTransport(msgs),
    );
    await supertest(app)
      .post('/test')
      .expect(400);

    const [{ level }] = msgs;

    expect(level).to.include('warn');
  });

  it('2、正常返回数据', async () => {
    const msgs = [];
    const requestHandler = (ctx) => {
      ctx.status = 200;
      ctx.body = {
        code: '0000',
        message: 'message',
        data: [{
          id: 1,
          name: 3,
        }],
      };
    };
    const app = useLogger(
      requestHandler,
      new CustomTransport(msgs),
    );
    await supertest(app)
      .post('/test2')
      .expect(200);

    const [{ level }] = msgs;

    expect(level).to.include('info');
  });

  it('3、打印日志信息', async () => {
    const msgs = [];
    const requestHandler = (ctx) => {
      ctx.status = 200;
      ctx.body = {
        code: '0000',
        message: 'message',
        data: [{
          id: 1,
          name: 3,
        }],
      };
    };
    const app = useLogger(
      requestHandler,
      new CustomTransport(msgs),
    );
    await supertest(app)
      .post('/test3')
      .expect(200);

    const loggerMsg = msgs[0][Symbol.for('message')];

    expect(loggerMsg).to.include('{"code":"0000","message":"message","data":[{"id":1,"name":3}]}');
  });

  it('4、cookies 信息', async () => {
    const msgs = [];
    let cookie = '';
    const requestHandler = (ctx) => {
      const {
        header: { cookie: requestCookie },
      } = ctx;
      cookie = requestCookie;
      ctx.status = 200;
      ctx.body = '完成';
    };
    const app = useLogger(
      requestHandler,
      new CustomTransport(msgs),
    );
    await supertest(app)
      .post('/test3')
      .set('Cookie', 'vue=3.0')
      .expect(200);

    expect(cookie).to.eq('vue=3.0');
    const loggerMsg = msgs[0][Symbol.for('message')];

    expect(loggerMsg).to.include('"cookie":"vue=3.0"');
  });

  it('5、日志中间件不影响正常返回', async () => {
    const logger = useLogger();
    const { text } = await supertest(logger)
      .get('/')
      .expect(200);

    expect(text).to.eq('logger');
  });

  it('6、请求抛出异常时', async () => {
    const msgs = [];
    const requestHandler = (ctx) => {
      ctx.throw('test');
    };
    const app = useLogger(
      requestHandler,
      new CustomTransport(msgs),
    );

    await supertest(app)
      .post('/test')
      .expect(500);

    const [{ level }] = msgs;
    expect(level).to.eq('error');
  });
});
