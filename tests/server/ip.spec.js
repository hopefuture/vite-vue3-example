const { expect } = require('chai');
const ip = require('ip');

describe('node 依赖 ip (https://www.npmjs.com/package/ip) 测试', () => {
  it('ip.address()，返回当前服务器ip地址', () => {
    expect(ip.address()).to.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
  });
});
