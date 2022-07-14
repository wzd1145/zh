import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    meta: {
      title: '控制台'
    },
    component: () => import('../views/Home/index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '控制台'
        },
        component: () => import('../views/Home/LeftBar/chick/index.vue')
      },
      {
        path: '/sys/menus',
        name: 'menus',
        meta: {
          title: '菜单管理'
        },
        component: () => import('../views/Home/LeftBar/chick/menus.vue')
      },
      {
        path: '/sys/roles',
        name: 'roles',
        meta: {
          title: '角色管理'
        },
        component: () => import('../views/Home/LeftBar/chick/roles.vue')
      },
      {
        path: '/sys/users',
        name: 'users',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/Home/LeftBar/chick/users.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
