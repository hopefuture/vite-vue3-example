import { defineComponent, ref } from 'vue';

/**
 * 关于 setup的写法
 * 可以参考 https://juejin.cn/post/7015470519789027335?utm_source=gold_browser_extension
 */
export default defineComponent({
  setup() {
    const message = ref(`You loaded this page on ${new Date().toLocaleString()}`);
    const todos = ref([
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' },
    ]);

    return {
      message,
      todos,
    };
  },
});
