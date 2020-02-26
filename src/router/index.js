import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import BaseLayout from '@/layout/BaseLayout.vue'
import Home from '@/views/Home.vue'
import config from '@/config/defaultSettings'
import UserLayout from '@/layout/UserLayout'
import { setDocumentTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/storage-types'
import { getStore } from '@/utils/storage'
import 'nprogress/nprogress.css'

Vue.use(Router)

const loginRoute = {
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "login" */ '@/views/user/Login.vue')
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: BaseLayout,
      meta: { requireAuth: true },
      redirect: {
        name: 'list'
      },
      children: [
        {
          path: 'list',
          name: 'list',
          component: Home,
          meta: { requireAuth: true },
          props: route => ({ path: route.query.path || '/' })
        },
        {
          path: 'about',
          name: 'about',
          meta: { requireAuth: true },
          component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
        }
      ]
    },
    {
      path: '/user',
      redirect: '/user/login',
      component: UserLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          meta: { title: '登录' },
          component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          meta: { title: '注册' },
          component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register.vue')
        },
        {
          path: 'register-result',
          name: 'registerResult',
          meta: { title: '注册结果' },
          component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult.vue')
        }
      ]
    },
    {
      path: '/test',
      component: () => import(/* webpackChunkName: "test" */ '@/views/test.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

function beforeEach(to, from, next) {
  NProgress.start()
  const { meta = {} } = to
  const { title, requireAuth } = meta
  title && setDocumentTitle(`${config.title} - ${title}`)
  if (requireAuth) {
    const token = getStore(ACCESS_TOKEN)
    if (token) {
      if (to.fullPath === loginRoute.path) {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      next({ name: loginRoute.name, query: { redirect: to.fullPath } })
    }
    NProgress.done()
  } else {
    NProgress.done()
    next()
  }
}
router.beforeEach(beforeEach)

export default router
