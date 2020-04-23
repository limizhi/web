import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // {
  //   path: '/teacher',
  //   name: 'teacher',
  //   component: Teacher
  // },
  {
    path: '/teacher',
    name: 'teacher',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Teacher.vue')
  },
  {
    path: '/course',
    name: 'course',
    component: () => import(/* webpackChunkName: "about" */ '../views/Course.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
  },
  {
    path: '/course_detail',
    name: 'course_detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/CourseDetail.vue')
  },
  {
    path: '/order_confirm',
    name: 'order_confirm',
    component: () => import(/* webpackChunkName: "about" */ '../views/OrderConfirm.vue')
  },
  {
    path: '/user_center',
    name: 'user_center',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserCenter.vue')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import(/* webpackChunkName: "about" */ '../views/Address.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
