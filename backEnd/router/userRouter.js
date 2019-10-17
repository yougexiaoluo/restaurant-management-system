const express = require('express')
const router = express.Router()
const user = require('../db/model/userModel')
const nodemailer = require('nodemailer')

// 注册
router.post('/register', (req, res) => {
  let { name, email, pwd } = req.body

  if (!name || !email || !pwd) {
    res.send({code: -1, msg: '参数错误', success: false})
    return false
  }
  findUser({username: name}).then(data => {
    if (data == null) {
      user.insertMany({username: name, email, password: pwd})
      res.send({code: 1, msg: '注册成功', success: true})
    } else {
      res.send({code: -1, msg: '用户已存在', success: false})
    }
  }).catch(err => {
    res.send({code: -1, msg: '注册失败', success: false})
  })
})

// 邮箱验证码
router.post('/email/code', (req, res) => {
  let {email} = req.body
  if (!email) return res.send({code: -1, msg: '请输入邮箱号码', success: false})
  sendMailer(email)
    .then(data => {
      res.send({code: 1, msg: '验证码发送成功'})
    })
    .catch(err => {
      res.send({code: -1, msg: '验证码发送失败'})
    })
})

// 登录
router.post('/login', (req, res) => {
  let {name, pwd} = req.body
  if (!name && !pwd) {
    res.send({code: -1, msg: '参数错误', success: false})
  }

  getUser(name).then(data => {
    if (data != null) {
      res.send({code: 1, msg: '登录成功', success: true})
    } else {
      res.send({code: -1, msg: '该用户未注册', success: false})
    }
  }).catch(err => {
    res.send({code: -1, msg:'登录失败', success: false})
  })
}) 

// 查找用户
findUser = (data) => {
  return user.findOne(data)
}

// 获取用户
getUser = (data) => {
  // 邮箱
  if (/[@]/.test(data)){
    return findUser({email: data})
  } else { // 用户名
    return findUser({username: data})
  }
}

// 邮箱验证码
sendMailer = async (email) => {
  let random = parseInt(Math.random() * 100000)
  let transporter = nodemailer.createTransport({
    'host': 'smtp.qq.com',
    'port': 465,
    'secure': true,
    auth: {
        user: '1019134495@qq.com', // generated ethereal user
        pass: 'iktnpjwsftbqbdfg' // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
      from: '1019134495@qq.com',
      to: email, 
      subject: 'xxx餐厅管理系统验证码',
      html: `
        <h2>
          您的验证码是: <a href='#'>${random}</a>
        </h2>
      `
  })
  return info
}

module.exports = router
