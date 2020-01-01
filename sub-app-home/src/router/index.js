import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home-1',
    name: 'home-1',
    component: () => import(/* webpackChunkName: "home-1" */ '../views/1.vue')
  },
  {
    path: '/home-2',
    name: 'home-2',
    component: () => import(/* webpackChunkName: "home-2" */ '../views/2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
