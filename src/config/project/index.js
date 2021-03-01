import './menu'
import './static'
import api from './api'
import router from './router'

const tokenName = 'roarpanda'
localStorage.setItem('tokenName', tokenName)
document.title = 'xxx项目名'
export default {
  api,
  router,
  tokenName,

  chartColor: ['#4fc4ed', '#4d9cdb', '#4ee2df', '#4ebbe4', '#6becc6'],
  brandCnName: document.title,
  projectName: document.title,
  projectCnName: document.title,
  projectEnName: 'roarpanda',
  companyCnName: '上海戎磐网络科技有限公司'
}
