<template>
  <div id="vue-home" class="app">
    <div id="nav">
      <router-link to="home-1">home-1</router-link> |
      <router-link to="home-2">home-2</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {};
  },
  computed: {
  },
  created() {},
  mounted() {
    console.log("home mounted")
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
