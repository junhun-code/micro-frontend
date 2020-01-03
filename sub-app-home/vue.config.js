"use strict";

const path = require("path");
const StatsPlugin = require('stats-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

// cdn 打包地址
const env = process.env.VUE_APP_ENV;
const assetsPublicPath =
  env === "dev"
    ? "//localhost:3001/home/"
    : `//sub-app-home.red-flower.cn${process.env.BASE_URL}`;

module.exports = {
    publicPath: assetsPublicPath,
    // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
    css: {
        extract: false
    },
    devServer: {
      port: 3001,
      headers: {"Access-Control-Allow-Origin":"*"},
      disableHostCheck: true
    },
    configureWebpack: () => {
      return {
        devtool: 'none',
        externals: {
          vue: "Vue",
          "vue-router": "VueRouter",
          vuex: "Vuex",
          axios: "axios",
        },
        output: {
          library: "singleVueHome", // 导出名称
          libraryTarget: "window", //挂载目标
        },
        plugins: [
          new StatsPlugin('manifest.json', {
              chunkModules: false,
              entrypoints: true,
              source: false,
              chunks: false,
              modules: false,
              assets: false,
              children: false,
              exclude: [/node_modules/]
          })
        ]
      }
    },
    chainWebpack(config) {
      // 移除 prefetch 插件
      config.plugins.delete("prefetch");
      config.plugins.delete("preload");
      // alias
      config.resolve.alias.set("@", resolve("src"));
    }
}
