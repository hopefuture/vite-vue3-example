<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <div class="app">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

    <div class="router-panel">
      <router-link to="/">Go to Home</router-link>
      <router-link to="/about">Go to About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .router-panel {
    display: flex;
    justify-content: center;

    a {
      padding: 20px;
    }
  }
</style>
