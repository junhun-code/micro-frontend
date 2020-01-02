<template>
  <a-layout id="components-layout-demo-custom-trigger" @click="triggerSocketEmit">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="about">
            <a-icon type="user" />
            <span>about</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="home">
            <a-icon type="video-camera" />
            <span>home</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <div>
          <div id="single-vue" class="single-spa-vue">
            <div id="vue-about"></div>
          </div>
          <div id="single-vue" class="single-spa-vue">
            <div id="vue-home"></div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  import { navigateToUrl } from 'single-spa';
  export default {
    data() {
      return {
        collapsed: false,
      };
    },
    methods: {
      goToChildRoute(e) {
        // 官方指定跳转
        e.preventDefault();
        navigateToUrl(e);
      },
      triggerSocketEmit() {
        console.log("[vueSocket] emit about-event")
        if (window.globalBus) {
          const vueSocket = window.globalBus.getSocket('vueSocket');
          vueSocket.emit('about-event', 321);
          vueSocket.setState('text', '123');
        }
      }
    }
  };
</script>
<style>
  #components-layout-demo-custom-trigger {
    height: 100%;
  }
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
