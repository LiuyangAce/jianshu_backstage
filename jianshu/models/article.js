//导入mongoose
const mongoose = require('mongoose')

//系统用户模型对象
const articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  createTime: String,
  content: String,
  stemfrom: String,
  read: {
    default: 0,
    type: Number
  },
  star: {
    default: 0,
    type: Number
  },
  comment: {
    default: 0,
    type: Number
  },
  author: String
})
const Article = mongoose.model('article',articleSchema)

module.exports = {
  Article
}