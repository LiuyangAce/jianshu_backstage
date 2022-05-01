// 导入mongoose
const mongoose = require('mongoose')

// 缺陷管理模型对象
const defectSchema = new mongoose.Schema({
  creatorID: String,
  handlerID: String,
  creator: String,
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: ''
  },
  defectType: {
    type: String,
    default: 'low'
  }
})
// const Defect = mongoose.model('defects',defectSchema)
module.exports = {
  Defect
}