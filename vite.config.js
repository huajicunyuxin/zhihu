import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    proxy:{
      '/api':{
          target:"https://news-at.zhihu.com/api/4", //跨域地址
          changeOrigin:true, //支持跨域
          rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
      }
   }
 },
 css: {
  postcss: {
    plugins: [
      postCssPxToRem({
        // 自适应，px>rem转换
        rootValue: 75,
        propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换，这个内容可以不写
      }),
    ],
  },
},
})
