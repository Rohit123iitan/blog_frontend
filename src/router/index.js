import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import( '../views/Login.vue'),
    children: [
      {
        path: '/login',
        component: () => import('../views/user_login.vue')
      },
      {
        path: '/user_reg',
        component: () => import('../views/user_registration.vue')
      },
    ]
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../components/Dashboard.vue')
  },
  {
    path: '/profile/:name',
    name: 'profile',
    // props:true,
    component: () => import('../components/Profile.vue')
  },
  {
    path: '/search',
    name: 'Searched_users',
    component: () => import('../components/Search_table.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../components/FAQs.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
