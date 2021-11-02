import { createLogger, format, transports } from 'winston';

import { getCallerFile, printfFormat, requestPrintfFormat } from './parse';

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
const logger = function (level: string, message: string, payload: any = {}, errSource?: any) {
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
export const error = (message: string) => {
  logger('error', message);
};

export const warn = (message: string) => {
  logger('warn', message);
};

export const info = (message: string) => {
  logger('info', message);
};

export const debug = (message: string) => {
  logger('debug', message);
};

/**
 * request 请求日志
 * @param {*} payload winston 配置项
 * @returns
 */
export const requestLogger = (customTransports?: any) => {
  const errSource = getCallerFile();
  return async (ctx: any, next: any) => {
    const { request, response } = ctx;
    const logInfo: any = { req: request, startTime: process.hrtime.bigint() };

    let reqErr;
    try {
      await next();
    } catch (e) {
      reqErr = e;
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

    if (reqErr) {
      throw reqErr;
    }
  };
};
