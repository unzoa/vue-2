import Vue from 'vue'
import ElementUI from 'element-ui'
import './axios'

if (process.env.NODE_ENV !== 'production') { // 打包时候不引入，利用index.html下elementui
  require('element-ui/lib/theme-chalk/index.css')
}

Vue.use(ElementUI)
