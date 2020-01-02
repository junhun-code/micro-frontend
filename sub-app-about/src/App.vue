<template>
  <div id="vue-about" class="app">
    <div id="nav">
      <router-link to="about-1">about-1</router-link> |
      <router-link to="about-2">about-2</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      text: ""
    };
  },
  computed: {
  },
  methods: {
    changeText(text) {
      console.log("[text]", text);
      this.text = text
    },
    listenEvent(value) {
      console.log("[vueSocket] subscribe about-event", value)
    }
  },
  created() {
    if (window.globalBus) {
        const vueSocket = window.globalBus.getSocket('vueSocket');

        // 监听状态
        vueSocket.watchState('text', this.changeText);

        // 监听事件
        vueSocket.on('about-event', this.listenEvent);
    }
  },
  mounted() {
    console.log("about mounted")
  },
  beforeDestroy() {
    if (window.globalBus) {
      const vueSocket = window.globalBus.getSocket('vueSocket');

      // 取消监听状态
      vueSocket.unwatchState('text', this.changeText);

      // 解绑回调函数
      vueSocket.off('about-event', this.listenEvent);
    }
  },
  filters: {}
};
</script>

<style>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
