"use strict";
const client = require("scp2");

// 测试
client.scp(
  "./dist/",
  {
    host: 'example.com',
    username: 'admin',
    password: 'password',
    path: "/home/admin/apps/micro-frontend/sub-app-home/test/home/"
  },
  function(err) {
    if (!err) {
      console.log(
        "scp2工具上传完毕,test远端服务路径：/home/admin/apps/micro-frontend/sub-app-home/test/home/"
      );
    } else {
      console.log("err", err);
    }
  }
);
