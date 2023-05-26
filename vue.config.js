const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
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
