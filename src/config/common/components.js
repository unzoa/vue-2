import Vue from 'vue'

// 组件列表

const components = [

]

components.forEach(i => {
  Vue.component(i.name, i)
})
