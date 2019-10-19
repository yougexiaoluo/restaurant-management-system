const mongoose = require('mongoose')

/**
 * 1. 需要添加用户token
 * 2. 头像路径
 * 3. 
 */

// 创建一个与集合相关联的Schema对象
const userModel = new mongoose.Schema({
  id: {type: Number, required: true},
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

// 将Schema对象转换为数据模型
const user = mongoose.model('user', userModel)

module.exports = user