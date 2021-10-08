const about = {
  // 命名空间
  namespaced: true,

  // 模块内容（module assets）
  state: () => ({
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
    ],
  }),

  getters: {
    isAdmin() {
      return true;
    },
  },

  actions: {
    increment({ commit }: any) {
      commit('increment');
    },
  },

  mutations: {
    increment(state: any) {
      state.count++;
    },
  },
};

export default about;
