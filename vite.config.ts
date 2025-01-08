import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    // createSvgIconsPlugin({
    //   // 指定目录(svg存放目录）
    //   iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
    //   // 使用 svg 图标的格式（name为图片名称）
    //   symbolId: 'icon-[dir]-[name]',
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    host: '0.0.0.0',
  },
})
