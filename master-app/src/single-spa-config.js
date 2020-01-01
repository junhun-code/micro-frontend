// single-spa-config.js
import * as singleSpa from 'single-spa'; //导入single-spa
/*
* runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
* */
const runScript = async (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
};

singleSpa.registerApplication( //注册微前端服务
    'singleVueAbout', 
    async () => {
        await runScript('http://127.0.0.1:3000/about/js/chunk-vendors.js');
        await runScript('http://127.0.0.1:3000/about/js/app.js');
        console.log("about")
        return window.singleVueAbout;
    },
    location => location.pathname.startsWith('/about') // 配置微前端模块前缀
);

singleSpa.registerApplication( //注册微前端服务
    'singleVueHome', 
    async () => {
        await runScript('http://127.0.0.1:3001/home/js/chunk-vendors.js');
        await runScript('http://127.0.0.1:3001/home/js/app.js');
        console.log("home")
        return window.singleVueHome;
    },
    location => location.pathname.startsWith('/home') // 配置微前端模块前缀
);

singleSpa.start(); // 启动
