const express = require('express')
const router = express.Router()

// 注册
router.post('/register', (req, res) => {
  res.send('注册成功')
})

// 邮箱验证码
router.post('/email/code', (req, res) => {
  res.send('获取成功')
})

// 登录
router.post('/login', (req, res) => {
  res.send('登录成功')
})

module.exports = router