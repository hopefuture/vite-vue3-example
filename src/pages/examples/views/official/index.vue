<script lang="ts">
  import Official from './index';

  export default Official;
</script>

<template>
  <div>
    <span v-bind:title="message">
      鼠标悬停几秒钟查看此处动态绑定的提示信息！
    </span>
    <ol>
    <li v-for="todo in todos" :key="todo.text">
      {{ todo.text }}
    </li>
  </ol>
  </div>
</template>
