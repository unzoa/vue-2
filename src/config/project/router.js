import Vue from 'vue'
import Router from 'vue-router'
import routersName from './routersName'

// 20200717 .push cannot read property 'catch' of undefined, annomate
// here is for high version vue-router
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location) && originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const Home = () => import('@/view/Home')

const Main = () => import('@/view/home/Main')

// 管理员用户

// 审计用户

// 遍历返回router可用childen数组
const mapRouters = (pages, userClass) => {
  return pages.map(i => {
    return {
      component: i[0],
      path: '/' + i[1],
      name: i[1],
      meta: {
        keepAlive: i[2],
        isBackground: i[3],
        title: routersName[i[1]],
        userClass: userClass,
        belong: i[4]
      }
    }
  })
}

// 规则：[路由文件，path, keeplive, isbackgroung, belong]
// 普通用户--------
const pages = mapRouters([
  [Main, 'Main', false, false, 'Main']
], 3)

const router = new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: '/Main',
      children: [...pages]
    },

    {
      path: '*',
      redirect: '/Main'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 用户验证等拦截

  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
