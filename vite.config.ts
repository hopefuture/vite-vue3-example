import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public', // 作为静态资源服务的文件夹，默认值为 public
  // 设置别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '127.0.0.1',
    port: 8090,
    strictPort: true // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        examples: resolve(__dirname, 'examples/index.html')
      }
    }
  },
  plugins: [vue(), vueJsx()]
})
