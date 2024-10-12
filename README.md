# 1集成Vant
main.js
```js
```

# 2集成axios
request/index.js

# 3解决跨域问题
vite.config.js
```js
  server:{
    proxy:{
      '/api':{
          target:"https://news-at.zhihu.com/api/4", //跨域地址
          changeOrigin:true, //支持跨域
          rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
      }
   }
 }

```

# 4postcss
参考：https://zhuanlan.zhihu.com/p/641353733
vite.config.js
```
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
```
