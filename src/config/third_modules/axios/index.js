import Axios from 'axios'
import project from '@/config/project'
import utils from '@/lib/js/utils'
import { Message } from 'element-ui'
const { projectEnName, api, router } = project

Axios.interceptors.request.use( // 请求拦截器-------------
  config => {
    function TOKEN () {
      return localStorage[projectEnName + '_token']
    }

    if (config.method === 'post') {
      if (Object.prototype.toString.call(config.data) === '[object FormData]') {
        config.data.append('token', TOKEN())
        config.data.append('submit_user', localStorage.userName)
      } else {
        config.data.token = TOKEN()
        config.data.submit_user = localStorage.userName
      }
    } else if (config.method === 'get') {
      config.params = {
        ...config.params,
        token: TOKEN(),
        submit_user: localStorage.userName
      }
    }

    // 不设置动态请求路径
    config.url = api[config.url]

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use( // 响应拦截器---------------
  response => {
    let data
    if (response.data) {
      data = response.data
    } else {
      data = response
    }

    if (typeof data === 'string') { // 判断是流文件
      // 获取流文件的名称
      let streamFileName =
          response.headers['content-disposition']
            .split(';')[1].split('=')[1].replace(/"/g, '')
      localStorage.setItem('streamFileName', streamFileName)
    }

    // 401 跳转到login
    if (data.status === 401) {
      // 清理信息存储
      localStorage.setItem(projectEnName + '_token', '')
      localStorage.setItem('userName', 'undefined')

      utils.setCookie(projectEnName + '_token', '')
      utils.setCookie('token_refresh_exp', '')
      utils.setCookie('token_exp', '')

      router.push({path: '/Login'})
    }
    return data
  },
  () => {
    Message.error('服务连接失败...')
    // return Promise.reject(error)
  }
)
