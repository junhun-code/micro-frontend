// single-spa-config.js
import * as singleSpa from 'single-spa'; //导入single-spa
import axios from 'axios';

const base = process.env.BASE_URL.slice(0,process.env.BASE_URL.length-1)
const env = process.env.VUE_APP_ENV;

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

/*
* getManifest：远程加载manifest.json 文件，解析需要加载的js
* */
const getManifest = (url, bundle) => new Promise(async (resolve) => {
    const { data } = await axios.get(url);
    const { entrypoints, publicPath } = data;
    const assets = entrypoints[bundle].assets;
    for (let i = 0; i < assets.length; i++) {
        await runScript(publicPath + assets[i]).then(() => {
            if (i === assets.length - 1) {
                resolve()
            }
        })
    }
});

singleSpa.registerApplication( //注册微前端服务
    'singleVueAbout',
    async () => {
        let singleVue = null;
        let manifestUrl = {
            dev: 'http://127.0.0.1:3000/about/manifest.json',
            test: 'http://sub-app-about.red-flower.cn/test/about/manifest.json'
        }
        await getManifest(manifestUrl[env], 'app').then(() => {
            singleVue = window.singleVueAbout;
        });
        return singleVue;
    },
    location => location.pathname.startsWith(`${base}/about`) // 配置微前端模块前缀
);

singleSpa.registerApplication( //注册微前端服务
    'singleVueHome',
    async () => {
        let singleVue = null;
        let manifestUrl = {
            dev: 'http://127.0.0.1:3001/home/manifest.json',
            test: 'http://sub-app-home.red-flower.cn/test/home/manifest.json'
        }
        await getManifest(manifestUrl[env], 'app').then(() => {
            singleVue = window.singleVueHome;
        });
        return singleVue;
    },
    location => location.pathname.startsWith(`${base}/home`) // 配置微前端模块前缀
);

singleSpa.start(); // 启动
