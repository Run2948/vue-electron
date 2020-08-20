import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing-page',
    component: () => import('../components/LandingPage')
  }
]

const router = new VueRouter({
  routes
})

export default router
