import Vue from 'vue'

// imgs
import icon from '@/assets/img/webicon/rongpan-logo.png'

// 图片引入
Vue.prototype.$img = {
  ...Vue.prototype.$img,
  icon
}

// favicon
const webIcon = document.querySelector('#web-icon')
webIcon.href = icon
