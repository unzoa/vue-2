import Axios from 'axios'

export default {
  get (Interface, requestData = {}) {
    return new Promise(resolve => {
      Axios.get(Interface, {
        params: requestData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          resolve(res)
        }).catch(res => {
          resolve(res)
        })
    })
  },

  blob (Interface, requestData = {}) {
    let configOri = {
      params: requestData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      responseType: 'blob'
    }
    return new Promise(resolve => {
      Axios.get(Interface, configOri)
        .then(r => {
          resolve(window.URL.createObjectURL(new Blob([r])))
        }).catch(res => {
          resolve(res)
        })
    })
  },

  post (Interface, requestData = {}) {
    return new Promise(resolve => {
      Axios.post(Interface, requestData, {
        transformRequest: [function (requestData) { // 转换数据格式，有待测试传送文件的方式时候同样可行。
          let ret = ''
          for (let it in requestData) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(requestData[it]) + '&'
          }
          ret = ret.slice(0, ret.length - 1)
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          resolve(res)
        }).catch(res => {
          resolve(res)
        })
    })
  },

  upload (Interface, formData, config) {
    return new Promise(resolve => {
      Axios.post(Interface, formData, config)
        .then(res => {
          resolve(res)
        }).catch(res => {
          resolve(res)
        })
    })
  }
}
