import { createStore } from 'vuex'
import about from './modules/about'

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    about
  }
})

export default store
