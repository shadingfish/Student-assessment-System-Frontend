const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://localhost:20235',
        changeOrigin: true, // 跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 修改运行时的标签页标题
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "学生综测平台";
      return args;
    });
  },
});
