const express = require('express')
const router = express.Router()
const food = require('../db/model/foodModel')
const {getNextSequence} = require('../utils/tableSet')

// 菜品列表数据
router.get('/list', (req, res) => {

})

// 添加菜品
router.post('/add', (req, res) => {
  let {name, price, desc, imgUrl, typename, typeid} = req.body

  if (!name || !price || !desc || !imgUrl || !typename || !typeid) {
    res.send({code: -1, msg: '参数错误', success: false})
    return false
  }

  getNextSequence('food').then(data => {
    let obj = {
      id: data.value,
      name,
      price,
      desc,
      imgUrl,
      typename,
      typeid,
      _time: new Date().getTime()
    }
    // 添加数据
    food.insertMany(obj).then(() => {
      res.send({code: 1, msg: '添加成功', success: true})
    }).catch(err => {
      res.send({code: -1, msg: '添加失败', success: false, Error: err})
    })
  })
})

// 删除菜品
router.delete('/delete', (req, res) => {

})

// 编辑菜品
router.post('/edit', (req, res) => {

})

// 关键字搜索(模糊查询)
router.post('/search', (req, res) => {

})

module.exports = router