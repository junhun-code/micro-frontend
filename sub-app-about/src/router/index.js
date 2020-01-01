import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about-1',
    name: 'about-1',
    component: () => import(/* webpackChunkName: "about-1" */ '../views/1.vue')
  },
  {
    path: '/about-2',
    name: 'about-2',
    component: () => import(/* webpackChunkName: "about-2" */ '../views/2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
