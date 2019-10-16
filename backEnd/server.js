const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db/connect')
const userRouter = require('./router/userRouter')

// 获取使用post请求传递的数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))    // 设置静态资源目录

// 路由
app.use('/user', userRouter)

app.listen(3000, () => {
  console.log('Server Start!')
})