<template>
  <div class="upload-container">
    <form ref="formContainer">
      <input
        ref="fileInput"
        type="file"
        hidden
        :webkitdirectory="webkitdirectory"
        :multiple="multiple"
        @change="change($event)">

      <slot />

    </form>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'upload-component',

  props: {
    url: String,
    size: Number,
    accept: String,

    webkitdirectory: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },

    filter: {
      type: Function,
      default: function (params) { return params }
    },

    fileKey: { default: 'file', type: String },

    data: {
      type: Object,
      default: function () {
        return {}
      }
    },

    autoUpload: { type: Boolean, default: false }
  },

  data () {
    return {
      filterSuccessList: [],
      count: -1
    }
  },

  methods: {
    click () {
      this.$refs.fileInput.click()
    },

    change (e) {
      let files = e.target.files

      let failFiles = [] // 不通过size和格式过滤的文件
      files = Array.from(files).filter(file => {
        let sizeBol = this.size ? file.size <= this.size : true
        let acceptBol = this.accept ? this.accept.includes(file.name.split('.').reverse()[0]) : true

        let failText = ''
        switch (true) {
          case !(sizeBol || acceptBol):
            failText = '文件过大且格式不正确。'
            break

          case !sizeBol: failText = '文件过大。'; break
          case !acceptBol: failText = '文件格式不正确。'; break
        }
        !(sizeBol && acceptBol) && failFiles.push([file.name, failText])

        return sizeBol && acceptBol
      })

      // console.log(failFiles, files)

      this.$emit('failFiles', failFiles)
      this.filterSuccessList = this.filter(files)
      this.count = this.filterSuccessList.length

      // 清空form
      this.$refs.formContainer.reset()

      // 或开始上传
      this.autoUpload && this.submit()
    },

    submit () {
      this.$emit('start', true)

      this.filterSuccessList.forEach((file, index) => {
        let fd = new FormData()
        fd.append(this.fileKey, file)

        Object.entries(this.data).forEach(val => {
          fd.append(val[0], val[1])
        })

        this.uploadAct(fd)
      })
    },

    uploadAct (formData) {
      let fileName = formData.get(this.fileKey).name

      let config = {
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)

          complete === 100 && this.count--
          this.count === 0 && this.$emit('end', true)

          this.$emit('progress', fileName, Number(complete)) // 通知父组件完成进度
        }
      }

      this.upload(this.url, formData, config)
        .then(res => {
          this.$emit('uploadFinnal', fileName, res) // 通知父组件完成
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
}
</script>
