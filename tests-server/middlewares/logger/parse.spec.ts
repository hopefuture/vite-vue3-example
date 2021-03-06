import { expect } from 'chai';

import { getPositionFromStack, getCallerFile } from '../../../server/middlewares/logger/parse';

describe('koa winston 格式打印日志测试-测试方法 getPositionFromStack', () => {
  it('getPositionFromStack-堆栈大于4个换行符', () => {
    const stack = 'Error: \n    at module.exports.getCallerFile (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/server/middlewares/logger/parse.ts:74:17)\n    at logger (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/server/middlewares/logger/index.ts:48:15)\n    at Object.error (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/server/middlewares/logger/index.ts:59:5)\n    at Context.<anonymous> (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/tests-server/middlewares/logger/index.spec.ts:5:12)\n    at callFn (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/node_modules/mocha/lib/runnable.ts:366:21)\n    at Test.Runnable.run (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/node_modules/mocha/lib/runnable.ts:354:5)\n    at Runner.runTest (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/node_modules/mocha/lib/runner.ts:681:10)\n    at /Users/username/git-hopefuture/vue3-learning/vite-vue3-example/node_modules/mocha/lib/runner.ts:804:12\n    at next (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/node_modules/mocha/lib/runner.ts:596:14)\n    at /Users/username/git-hopefuture/vue3-learning/vite-vue3-example/node_modules/mocha/lib/runner.ts:606:7\n    at next (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/node_modules/mocha/lib/runner.ts:489:14)\n    at Immediate._onImmediate (/Users/username/git-hopefuture/vue3-learning/vite-vue3-example/node_modules/mocha/lib/runner.ts:574:5)\n    at processImmediate (internal/timers.ts:461:21)\n    at process.topLevelDomainCallback (domain.ts:138:15)\n    at process.callbackTrampoline (internal/async_hooks.ts:127:14)';
    const appName = 'vite-vue3-example';
    expect(getPositionFromStack(stack, appName)).to.include('tests-server.middlewares.logger.index.spec.ts');
  });
});

describe('koa winston 格式打印日志测试-测试方法 getCallerFile', () => {
  it('获取打印日志对应文件路径和行', () => {
    const result = getCallerFile(1);
    expect(result).to.include('tests-server.middlewares.logger.parse.spec.ts');
  });
});
