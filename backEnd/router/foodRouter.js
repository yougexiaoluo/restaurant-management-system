const express = require('express')
const router = express.Router()
const food = require('../db/model/foodModel')

// 菜品列表数据
router.get('/list', (req, res) => {

})

// 添加菜品
router.post('/add', (req, res) => {
  let {name, price, desc, imgUrl, typename, typeid} = req.body
  // if (!name || !price || !desc || !imgUrl || typename || typeid) {
  //   res.send({code: -1, msg: '参数错误', success: false})
  //   return false
  // }
  let data = {
    name: '猛龙过江',
    price: '28',
    desc: '青菜汤,健康又营养',
    imgUrl: '/images/food.jpg',
    typename: '汤类',
    typeid: 1
  }
  food.insertMany(data).then(data => {
    res.send({code: 1, msg: '添加成功', success: true})
  }).catch(err => {
    res.send({code: -1, msg: '添加失败', success: false})
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