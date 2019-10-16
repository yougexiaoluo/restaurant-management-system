const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, '连接数据库失败'))
db.once('open', () => console.log('连接数据成功'))