import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Ant from 'ant-design-vue';
import { Bus } from '@runnan/obvious';
import 'ant-design-vue/dist/antd.css';
import './single-spa-config.js'

Vue.config.productionTip = false
Vue.use(Ant);

window.globalBus = new Bus({
  vueSocket: {
    js: ["http://127.0.0.1:3000/about/js/chunk-vendors.js", "http://127.0.0.1:3000/about/js/app.js"]
  }
});

window.globalBus.createSocket('vueSocket', [], (socket) => {
    // 一个状态必须在init之后才能被set
    if(socket && socket.getState('text') === undefined) {
      socket.initState('text', '');
    }
});

window.globalBus.startApp('vueSocket', 'text').then(() => {
  console.log('成功拉起vueSocket微服务');
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
});
