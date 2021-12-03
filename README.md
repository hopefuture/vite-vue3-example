# Vue 3 + Typescript + Vite 示例

基于官方模板搭建 Vue 3 + Typescript + Vite 示例

## 前端技能

* Vue3
* Typescript
* Vite
* Vite 多页面设置
* vue-router
* vuex
* sass
* eslint eslint-config-airbnb-base
* Vue3 Jsx 支持
* element-plus
* koa
* got
* 日志 winston
* axios
* 单元测试 mocha chai

## build and server

### 本地启动

```shell
npm run watch
```

使用 concurrently 启动多个 npm 命令，主要包括

* ```npm run watch-build-server```，实时编译服务端代码
* ```npm run watch-server```，实时启动服务端
* ```npm run dev```，实时启动Vue服务

如果为了调试，也可以开三个命令窗口，分别启动

### 构建

```shell
npm run build
```

## 单元测试

### node 服务端

```shell
npm run test-server
```

### vue 前端单元测试

```shell
npm run test
```
