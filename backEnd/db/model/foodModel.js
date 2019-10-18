const mongoose = require('mongoose')

const foodModel = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: String, required: true},
  desc: {type: String, required: true},
  imgUrl: {type: String, required: true},
  typename: {type: String, required: true},
  typeid: {type: Number, required: true},
  score: {type: String, default: ''}
})

const food = mongoose.model('food', foodModel)

module.exports = food