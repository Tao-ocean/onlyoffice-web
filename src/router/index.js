import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Test',
    component: () => import('@/views/Test')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/preview',
    name: 'PreviewOffice',
    component: () => import('@/views/PreviewOffice')
  },
  {
    path: '/edit',
    name: 'Editor',
    component: () => import('@/views/Editor')
  },
  {
    path: '/another',
    name: 'Another',
    component: () => import('@/views/Another')
  }
]

const router = new VueRouter({
  routes
})

export default router
