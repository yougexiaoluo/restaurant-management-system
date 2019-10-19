const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

// 创建与表集合相关的数据模型
const tableSetModel = new mongoose.Schema({
  _id: {type: String, required: true},
  value: {type: Number, required: true, default: 1}
})

// 转换为数据模型
const tableSet = mongoose.model('table_set', tableSetModel)

module.exports = tableSet