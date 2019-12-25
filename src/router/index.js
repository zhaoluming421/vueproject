import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
const Home = () => import("../views/home/Home.vue")
const CateGory = () => import("../views/category/CateGory.vue")
const Cart = () => import("../views/cart/Cart.vue")
const Profile = () => import("../views/profile/Profile.vue")

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: CateGory
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    }
  ],
  mode: 'history'
})