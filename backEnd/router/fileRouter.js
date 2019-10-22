const express = require('express')
const router = express.Router()
const multer = require('multer')

// 创建存储的位置以及名称
let storage = multer.diskStorage({
  // 保存的路径
  destination: (req, file, cb) => {
    cb(null, 'public/upload/')
  },
  // 保存的文件名
  filename: (req, file, cb) => {
    let ext = file.originalname.split('.')[1]
    time = new Date().getTime(),
    random = parseInt(Math.random() * 100000),
    filename = `${time}_${random}.${ext}`
    cb(null, filename)
  }
})

// 通知multer对象在哪里上传文件
let upload = multer({
  // limits:{
  //   // 限制文件大小500kb
  //   fileSize: 500 * 1024,
  //   // 限制文件数量
  //   files: 5
  // },
  // 过滤上传的文件格式
  fileFilter: function(req, file, cb){
    // 限制文件上传类型，仅可上传指定格式图片
    let ext = file.mimetype.split('/')[1]
    let types = ['jpg', 'jpeg', 'png', 'gif']
    types.indexOf(ext) != -1 ? cb(null, true) : cb(null, false)
  },
  storage
})

// 上传图片
router.post('/upload', upload.single('file'), (req, res, next) => {
  if (req.file == undefined) {
    res.send({code: -1, msg: '请选择格式为jpg,png,jpeg,gif的图片', success: false})
  } else {
    let {size} = req.file
    // 上传图片限制
    if (size > 512000) {
      return res.send({code: -2, msg: '请选择一张小于500kb的图片', success: false})
    } else {
      res.send({code: 1, msg: '上传成功', success: true})
    }
  }
})

module.exports = router