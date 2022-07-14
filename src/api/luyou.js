import router from '../router/index'
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || ''
  const goPath = ['/login']
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      next()
    }
  } else {
    if (goPath.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
