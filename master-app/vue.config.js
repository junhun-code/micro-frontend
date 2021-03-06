"use strict";

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// cdn 打包地址
const env = process.env.VUE_APP_ENV;
const assetsPublicPath = process.env.BASE_URL

module.exports = {
    publicPath: assetsPublicPath,
    // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
    css: {
        extract: false
    },
    devServer: {
      port: 8080,
      disableHostCheck: true
    },
    configureWebpack: () => {
      return {
        externals: {
          vue: "Vue",
          "vue-router": "VueRouter",
          vuex: "Vuex",
          axios: "axios",
        }
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
