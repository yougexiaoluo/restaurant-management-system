const tableSet = require('../db/model/tableIdCollectionModel')

// 查找并更新 -- 自增序号
getNextSequence = async (name) => {
  return await tableSet.findOneAndUpdate({
    _id: name
  }, {
    $inc: {
      value: 1
    }
  }, {
    new: true,
    upsert: true
  })
}

module.exports = {
  getNextSequence
}