<script setup lang="ts">
  import '@/components/layouts/BaseHeader.vue';
</script>

<template>
  <BaseHeader />
  <div class="router-panel">
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">首页</router-link>
    <router-link to="/element">Element Plus</router-link>
    <router-link to="/vue-official">Vue 官方示例</router-link>
    <router-link to="/about">Go to About</router-link>
  </div>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <div class="panel-content">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  .router-panel {
    display: flex;

    a {
      padding: 20px;
    }
  }

  .panel-content {
    padding: 16px;
  }
</style>
