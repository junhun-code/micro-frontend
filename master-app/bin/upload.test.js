"use strict";
const client = require("scp2");

// 测试
client.scp(
  "./dist/",
  {
    host: 'example.com',
    username: 'admin',
    password: 'password',
    path: "/home/admin/apps/micro-frontend/master-app/test/"
  },
  function(err) {
    if (!err) {
      console.log(
        "scp2工具上传完毕,test远端服务路径：/home/admin/apps/micro-frontend/master-app/test/"
      );
    } else {
      console.log("err", err);
    }
  }
);
