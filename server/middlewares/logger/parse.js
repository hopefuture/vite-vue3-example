const localIp = require('ip');
const { format } = require('winston');

const { printf } = format;

/**
 * 获取日志日志对应文件路径和行号
 * @param stack
 * @param appName
 * @param depth 堆栈深度，默认3
 * @returns {string}如：
 */
function getPositionFromStack(stack, appName, depth = 3) {
  /**
   * 第一个换行符为 Error 后面的换行符
   * 第二个换行符为当前文件: at module.exports.getCallerFile (xxxx/server/utils/koa-winston/parse.js:74:17)\n
   * 第三个换行符为直接调用该方法（getCallerFile）文件，目前只有 koa-winston/index.js 会调用，
     at logger (xxxx/server/utils/koa-winston/index.js:48:15)\n
   * 第四个换行符还为 koa-winston/index.js，如：at Object.error (xxx/server/utils/koa-winston/index.js:59:5)\n
   * 如果有间接调用该方法文件，则会有第五个、第六个一直到最顶层调用这文件
   * 所以至少有四个换行符
   */
  let firstIndex = stack.indexOf('\n', 5); // 定位到Error后面的换行符

  // 往下找 depth 个换行符，默认是3，主要根据 ./index.js 中的调用分析得出的结果，即第四个换行符为index.js 最终调用位置
  let stackDepth = depth;

  while (stackDepth--) {
    firstIndex = stack.indexOf('\n', firstIndex + 1);
    if (firstIndex < 0) {
      // 如果日志堆栈不足3行，定位到最后一行的上一个换行符
      firstIndex = stack.lastIndexOf('\n', stack.length);
      break;
    }
  }

  // 第五个换行符，即实际直接调用的文件
  let secondIndex = stack.indexOf('\n', firstIndex + 1); // 定位firstIndex后面的一个换行符
  if (secondIndex < 0) {
    secondIndex = stack.length;
  }

  if (appName) {
    // 在后面寻找appName所在位置
    let temp = stack.indexOf(appName, firstIndex);
    if (temp === -1) {
      temp = stack.indexOf('(', firstIndex);
    }
    firstIndex = temp;
  } else {
    firstIndex = stack.indexOf('(', firstIndex);
  }

  firstIndex = Math.max(stack.indexOf('/', firstIndex), firstIndex) + 1; // 查找appName结束的位置

  // 右括号 index
  const closestQuo = stack.indexOf(')', firstIndex);
  if (closestQuo < secondIndex) {
    secondIndex = closestQuo;
  }

  const subStack = stack.substring(firstIndex, secondIndex).replace(/\//g, '.');

  const subStackSplit = subStack.split(':');

  if (subStackSplit.length >= 2) {
    return `${subStackSplit[0]}，第${subStackSplit[1]}行，第${subStackSplit[2] || 0}列`;
  }

  return subStack;
}

module.exports.getPositionFromStack = getPositionFromStack;

/**
 * 通过错误堆栈信息获取调用文件路径和行号
 * @param depth 堆栈深度，默认3
 * @returns {string} 如：tests.server.utils.koa_winston.index.spec.js
 */
module.exports.getCallerFile = function (depth = 3) {
  // 需要根据实际部署的文件名，做动态调整，也可以根据不同的环境设置成不同的文件名称
  const appName = process.env.appName || 'vite-vue3-example';
  // 替换双斜杠的情况，主要针对windows系统
  const stack = new Error().stack.replace(/\\/g, '/');
  return getPositionFromStack(stack, appName, depth);
};

// 自定义打印格式
module.exports.printfFormat = printf((info) => {
  const {
    level, message, location, timestamp,
  } = info;
  const ip = localIp.address();
  return `${timestamp} [${ip}_${process.pid}] ${level} 日志来源：${location} - ${message}`;
});

// request 请求打印日志格式
module.exports.requestPrintfFormat = printf((info) => {
  const {
    level, message, location, timestamp, duration, req, res,
  } = info;
  const ip = localIp.address();
  return `${timestamp} [${ip}_${process.pid}] ${level}
日志来源：${location} - ${message}
${req.method}请求，接口地址: ${req.href}，请求参数: ${JSON.stringify(req.query)}
请求header: ${JSON.stringify(req.header)}
响应结果，状态码：${res.status}，body内容：${JSON.stringify(res.body || {})}
耗时: ${duration}秒`;
});
