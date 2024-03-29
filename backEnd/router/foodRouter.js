const express = require('express')
const router = express.Router()
const food = require('../db/model/foodModel')
const {getNextSequence} = require('../utils/tableSet')

// 菜品列表数据
router.get('/list', (req, res) => {
  findData()
    .then(data => {
      res.send({code: 1, data, msg: '请求成功', success: true})
    })
    .catch(err => {
      res.send({code: -1, msg: '请求失败', success: false, Error: err})
    })
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

/**
 * 批量删除
 *  Model.remove({ _id: { $in: ['aID', 'bID'] } })
 */

// 删除菜品
router.delete('/delete', (req, res) => {
  let {id} = req.query
  food.findOneAndRemove({id})
    .then(() => {
      findData()
        .then(data => {
          res.send({code: 1, data, msg: '请求成功', success: true})
        })
        .catch(err => {
          res.send({code: -1, msg: '获取失败', success: false, Error: err})
        })
    })
    .catch(err => {
      res.send({code: -1, msg: '删除失败', success: false, Error: err})
    })
})

// 编辑菜品
router.post('/edit', (req, res) => {

})

// 关键字搜索(模糊查询)
router.post('/search', (req, res) => {
  let {keyword} = req.body
  let reg = new RegExp(keyword)

  food.find({$or: [{name: {$regex: reg}}, {desc: {$regex: reg}}]})
    .then(data => {
      res.send({code: 1, data, msg: '请求成功', success: true})
    })
    .catch(err => {
      res.send({code: -1, msg: '请求失败', success: false, Error: err})
    })
})

// 分页
router.get('/getInfoByPage', (req, res) => {
  let pageSize = req.query.pageSize || 1
  let page = req.query.page || 1

  food.find()
    .limit(Number(pageSize))
    .skip((Number(page - 1) * pageSize))
    .then(data => {
      res.send({code: 1, data, msg: '请求成功', success: true})
    })
    .catch(err => {
      res.send({code: -1, msg: '请求失败', success: false, Error: err})
    })
})


// 查找数据
findData = () => {
  return new Promise((resolve, reject) => {
    food.find()
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

module.exports = router