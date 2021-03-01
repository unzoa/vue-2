# 上传组件

> 利用input type=“file”上传，依赖axios模块


## 需求
- 匿名插槽
- 文件个数
  * 单文件
  * 多文件
- 文件夹
- 过滤
- api
- 参数
- 自动上传


### props

```js
  url: String, // api
  autoUpload: Boolean, // 是否自动上传，默认false
  webkitdirectory: webkitdirectory, // 文件夹，默认false
  multiple: multiple, // 多文件，默认false
  size: Number, // 文件最大上传限制
  accept: String, // 文件上传格式，多个格式可以以任意形式拼接
  filter: Function, // 除了size和格式的更多父组件过滤，return过滤的文件列表
  fileKey: String //上传时文件的字段，默认为file
```

### $emit

```js
  failFiles: function(Array), // size和accept过滤不能通过的列表, 格式为 [[fileName, errorText], []]
  progress: function(fileName, progressValue), // 单个文件上传进度
  uploadFinnal: function(fileName, response), // 单个文件上传结束
  start: function(Boolean), // 开始执行上传任务
  end: function(Boolean) // 上传任务结束
```

### 事件

```js
  click: function, // 执行input type=“file”的点击
  submit: function, // 开始执行上传事件

  // 使用案例：
  this.$refs.inputRefName.click()
```


### 执行过程

- 触发input点击事件, 出现电脑文件管理器，选择文件后确定
- 触发input的change事件，得到上传的文件数组
- 过滤，得到目标数组
- 选择性执行上传，此时文件存在于浏览器内存中
  + 延时上传
    * 填写表单，提交
  + 直接上传


### 文件列表展示

- 失败列表
  + 过滤失败 failFiles
  + 上传失败 单个文件上传后 在uploadFinnal中 (fileName, response)

- 上传进度
  + 单个文件上传后 在uploadFinnal中 (fileName, response) 过滤成功和失败

### 故障排查

- 组件插槽内容 button标签点击事件 需要阻止冒泡 @click.prevent="submit"
