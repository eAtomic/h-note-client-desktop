import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer'
//import polyfillExports from 'vite-plugin-electron/polyfill-exports';
export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: [
        'electron-main/index.ts',
        'electron-preload/index.ts'
      ]
    }),
    renderer(),
    //polyfillExports(),
  ],
  build: {
    emptyOutDir: false, // 必须配置，否则electron相关文件将不会生成build后的文件
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    exclude: ['electron'], // 告诉 Vite 排除预构建 electron，不然会出现 __diranme is not defined
  }
});