const { createLogger, format, transports } = require('winston');

const { getCallerFile, printfFormat, requestPrintfFormat } = require('./parse');

const {
  combine, colorize, timestamp,
} = format;

// 开发环境
const isDev = process.env.NODE_ENV === 'development';

// 打印选项
const options = {
  // 定义日志级别
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  transports: [new transports.Console({
    // 开发环境打印 debug（包含 debug） 级别以上日志
    // 生产环境打印 info（包含 info）级别以上日志
    level: isDev ? 'debug' : 'info',
  })],
};

// 日志实例，设为单例模式
const winstonLogger = createLogger(options);

/**
 * 输入日志主函数
 * @param {*} level
 * @param {*} message
 * @param {*} payload 包含以下属性
   {
     logInfo = {}, // 日志信息
     isReq, // 是否为 request 请求日志
     customTransports, // 自定义 transports
   }
  * @param {*} payload 包含以下属性
 */
const logger = function (level, message, payload = {}, errSource) {
  const {
    logInfo = {},
    isReq,
    customTransports,
  } = payload;

  // 设置出错文件位置
  logInfo.location = errSource || getCallerFile();

  const optFormat = [timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' })];

  optFormat.push(isReq ? requestPrintfFormat : printfFormat);

  // 开发环境且没有传入自定义 transports ，加上打印颜色
  if (isDev && !customTransports) {
    optFormat.push(colorize({
      all: true,
      colors: {
        error: 'red',
        warn: 'brightYellow',
        info: 'blue',
        debug: 'cyan',
      },
    }));
  }

  winstonLogger.format = combine(...optFormat);

  // 动态修改 transports
  if (customTransports) {
    winstonLogger.clear();
    (Array.isArray(customTransports) ? customTransports : [customTransports]).forEach((transport) => {
      winstonLogger.add(transport);
    });
  }

  winstonLogger.log(level, message, logInfo);
};

// error: 0, warn: 1, info: 2, debug: 3
module.exports.error = (message) => {
  logger('error', message);
};

module.exports.warn = (message) => {
  logger('warn', message);
};

module.exports.info = (message) => {
  logger('info', message);
};

module.exports.debug = (message) => {
  logger('debug', message);
};

/**
 * request 请求日志
 * @param {*} payload winston 配置项
 * @returns
 */
module.exports.requestLogger = (customTransports) => {
  const errSource = getCallerFile();
  return async (ctx, next) => {
    const { request, response } = ctx;
    const logInfo = { req: request, startTime: process.hrtime.bigint() };

    let error;
    try {
      await next();
    } catch (e) {
      error = e;
    } finally {
      setImmediate(() => {
        let level = 'info';
        const statusCode = Math.floor(response.status / 100);
        if (statusCode === 5) {
          level = 'error';
        } else if (statusCode === 4) {
          level = 'warn';
        }
        logInfo.res = response;
        logInfo.duration = Number(process.hrtime.bigint() - logInfo.startTime) * 1e-9;
        logger(level, '接口日志详情：', { logInfo, isReq: true, customTransports }, errSource);
      });
    }

    if (error) {
      throw error;
    }
  };
};
