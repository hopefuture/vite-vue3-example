# 搭建过程

## 搭建说明

部分设置参考了 vue3 cli 生成的模板

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
npm install --save-dev eslint eslint-plugin-vue vue-eslint-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-standard
```

由于 eslint-config-standard 依赖 eslint-plugin-import eslint-plugin-node 和 eslint-plugin-promise，所以还需安装这三个包

```shell
npm install --save-dev eslint-plugin-import eslint-plugin-node eslint-plugin-promise
```

.eslintrc.js

* eslint-plugin-vue 设置

  ```js
  {
    "extends": ["plugin:vue/vue3-essential"]
  }
  ```

* eslint-config-standard 设置

  ```js
  {
    "extends": ["standard"]
  }
  ```

* @typescript-eslint/eslint-plugin 和 @typescript-eslint/parser

  ```js
  {
    "extends": ["plugin:@typescript-eslint/eslint-recommended"]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  ```

如果想看最终eslint config生成，可以debug查看，对应的文件为：

node_modules/eslint/lib/linter/linter.js 方法 verify

## axios

## mock

## 单元测试

## ssr
