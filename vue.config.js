const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    // 设置代理
    proxy: {
      '/api': {
        // target: 'http://43.142.90.238:20235',
        target: 'http://localhost:20235',
        changeOrigin: true, // 跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    port: 8888, // Replace with your desired port number
  },
  // 修改运行时的标签页标题
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "学生综测平台";
      return args;
    });
  },
});
