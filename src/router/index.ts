import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import WelcomeScreen from '../screens/WelcomeScreen.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeScreen,
  },
  {
    path: '/images',
    name: 'images',
    component: () =>
      import(/* webpackChunkName: "images" */ '../screens/ImageScreen.vue'),
  },
  {
    path: '/videos',
    name: 'videos',
    component: () =>
      import(/* webpackChunkName: "videos" */ '../screens/VideoScreen.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
