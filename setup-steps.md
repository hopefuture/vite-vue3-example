# 搭建过程

## 搭建说明

部分设置参考了 vue3 cli 生成的模板，包含 eslint

## 基于 [vite](https://cn.vitejs.dev/) 官方说明

```shell
npm init vite@latest vite-vue3-example -- --template vue-ts
```

## 修改配置文件，https://cn.vitejs.dev/config/

### 设置别名

``` typescript
{
  // ...
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}
```

### 设置server选项

``` typescript
{
  // ...
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}
```

## 多页面应用模式

官方地址：https://cn.vitejs.dev/guide/build.html#multi-page-app

默认在根目录下会创建一个 index.html 作为入口文件，如果我们有多个入口文件时，可以在根目录下创建多个，比如 examples/index.html、platform/index.html 等，同时在 src 增加 pages 文件夹，用来管理多页面入口

注意：不能直接创建 examples.html 或 platform.html，必须是文件夹 + index.html

src 文件夹下文件目录结构变成

├── assets
│   └── logo.png
├── components
│   └── HelloWorld.vue
├── env.d.ts
└── pages
    ├── examples
    │   ├── index.ts
    │   └── index.vue
    └── main
        ├── index.ts
        └── index.vue

vite.config.ts 对应的设置为

``` typescript
{
  // ...
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        examples: resolve(__dirname, 'examples.html')
      }
    }
  },
}
```

## vue-router

```shell
npm install vue-router@4
```

在每个入口页面中增加 router.ts 文件

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import About from '@/pages/main/views/about/index.vue';

const routes: RouteRecordRaw[] = [
  // 动态引入
  {
    name: 'home',
    path: '/',
    component: () => import('@/pages/main/views/home/index.vue')
  },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
```

对应的入口文件 index.ts

```typescript
import { createApp } from 'vue'
import App from './index.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
```

此时目录结构为：

├── assets
│   └── logo.png
├── components
│   └── HelloWorld.vue
├── env.d.ts
└── pages
    ├── examples
    │   ├── index.ts
    │   ├── index.vue
    │   ├── router.ts
    │   └── views
    └── main
        ├── index.ts
        ├── index.vue
        ├── router.ts
        └── views
            ├── about
            │   └── index.vue
            └── home
                └── index.vue

## vuex

```shell
npm install vuex@next
```

## sass

```shell
npm install --save-dev sass
```

## eslint

参考 vue3-cli 生成的默认设置

需要安装以下依赖

```shell
npm install --save-dev eslint eslint-plugin-vue vue-eslint-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base
```

由于 eslint-config-airbnb-base 依赖 eslint-plugin-import 和 eslint-import-resolver-node，所以还需安装这两个包

```shell
npm install --save-dev eslint-plugin-import eslint-import-resolver-node
```

.eslintrc.js

* eslint-plugin-vue 设置

  ```js
  {
    extends: ['plugin:vue/vue3-essential']
  }
  ```

* eslint-config-airbnb-base 设置

  ```js
  {
    extends: ['eslint-config-airbnb-base']
  }
  ```

* @typescript-eslint/eslint-plugin 和 @typescript-eslint/parser

  ```js
  {
    extends: ['plugin:@typescript-eslint/eslint-recommended']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
      generators: false,
      objectLiteralDuplicateProperties: false,
    },
    sourceType: 'module'
  },
  ```

如果想看最终eslint config生成，可以debug查看，对应的文件为：

node_modules/eslint/lib/linter/linter.js 方法 verify，然后再进入 _verifyWithConfigArray

关于 eslint 命令行一点小常识

* 同时检测多个后缀

  ```shell
    eslint src --fix --ext .vue --ext .ts -ext .js
    # 或者
    eslint src --fix --ext .vue,.ts,.js
  ```

* 同时检测多个文件夹

  ```shell
    eslint src server --fix --ext .vue,.ts,.js
  ```

## Vue3 Jsx 支持

```shell
npm i @vitejs/plugin-vue-jsx -D
```

注册插件，vite.config.js

```shell
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  plugins: [vue(), vueJsx()],
}
```

## element plus 组件

```shell
npm install element-plus --save
```

### 自动导入

First you need install unplugin-vue-components.

```shell
npm install unplugin-vue-components
```

vite.config.ts 设置

```shell
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    Components({
      resolvers: [ElementPlusResolver({
          importStyle: 'sass'
        })],
    }),
  ],
}
```

### 手动导入

手动导入需要安装插件 unplugin-element-plus

```shell
npm install --save-dev unplugin-element-plus
```

vite.config.ts 设置

```shell
import ElementPlus from 'unplugin-element-plus/vite'

export default {
  plugins: [ElementPlus()],
}
```

## node 服务端

### koa

为了摄取更多优秀开源组件，我们使用koa，需要安装以下依赖

```shell
npm install --save koa @koa/router
```

### 日志 winston

```shell
npm install --save winston
```

增加中间件，/server/middlewares/logger/index.js

参考：https://github.com/yidinghan/koa2-winston

### 后台请求接口 got

```shell
npm install --save got
```

### node 服务守卫助手 nodemon

```shell
npm install --save-dev nodemon
```

## axios

## mock

## 单元测试

```shell
npm install --save-dev mocha chai @types/mocha @types/chai
```
