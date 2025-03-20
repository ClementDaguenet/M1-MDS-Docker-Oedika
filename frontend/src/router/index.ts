import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CameraView from '../views/CameraView.vue'
import MapsView from '../views/MapsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/camera',
    name: 'camera',
    component: CameraView
  },
  {
    path: '/maps',
    name: 'maps',
    component: MapsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
