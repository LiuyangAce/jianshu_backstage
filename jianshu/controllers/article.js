let {Article} = require('../models/article')

// 发布文章
const add = async ctx => {
  let article = ctx.request.body
  await Article.create(article).then(rel => {
    if(rel) {
      ctx.body = {
        code: 200,
        msg: '文章发布成功'
      }
    }else {
      ctx.body = {
        code: 300,
        msg: '文章发布失败'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: '文章发布时出现异常',
      err
    }
  })
}

// 查询单个文章
const findOne = async ctx => {
  let {id} = ctx.request.query
  let isRead = false
  await Article.findOne({id}).then(rel => {
    if(rel) {
      isRead = true
      ctx.response.body = {
        code: 200,
        msg: '文章查询成功',
        result: rel
      }
    }else {
      ctx.response.body = {
        code: 300,
        msg: '文章查询失败',
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: '文章查询时候出现异常',
      err
    }
  })
  if(isRead){
    await Article.updateOne({id},{$inc:{read:1}})
  }
}

//查询所有文章（分页）
const findAll = async ctx => {
  let {page,author} = ctx.request.query

  //判断页码
  if(!page || isNaN(Number(page))) {
    page = 1
  }else {
    page = Number(page)
  }

  //每页条数
  let pageSize = 10

  //计算总页数
  let count = 0
  await Article.find({author}).count().then(rel => {
    count = rel
  })
  let totalPage = 0
  if (count > 0) {
    // 向上取整
    totalPage = Math.ceil(count / pageSize)
  }

  // 判断当前页码的范围
  // 传入page大于最大页数 就把最大页数给page
  // 传入page小于1 就把1给page
  if (totalPage > 0 && page > totalPage) {
    page = totalPage
  }else if (page < 1) {
    page = 1
  }

  // 计算起始位置
  let start = (page - 1) /pageSize

  await Article.find({author}).skip(start).limit(pageSize).then(rel => {
    if(rel && rel.length > 0){
      ctx.body = {
        code: 200,
        msg: '文章查询成功',
        result: rel,
        page,
        pageSize,
        count
      }
    }else {
      ctx.body = {
        code: 300,
        msg: '没有查询到文章'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: '文章查询时候出现异常',
      err
    }
  })
}

//修改文章
const update = async ctx => {
  let article = ctx.request.body
  await Article.updateOne(
    {id: article.id},
    {
      title: article.title,
      stemform: article.stemform,
      content: article.content
    }
  ).then(rel => {
    if(rel.modifiedCount > 0) {
      ctx.response.body = {
        code: 200,
        msg: '文章更新成功'
      }
    }else {
      ctx.body = {
        code: 300,
        msg: '文章更新失败'
      }
    }
  }).catch(err => {
    ctx.response.body = {
      code: 500,
      msg: '文章更新异常',
      err
    }
  })
}

//删除文章
const del = async ctx => {
  let id = ctx.request.body
  console.log(111,ctx.request.body);
  await Article.deleteOne(id).then(rel => {
    if(rel) {
      ctx.response.body = {
        code: 200,
        msg: '文章删除成功'
      }
    }else {
      ctx.response.body = {
        code: 300,
        msg: '文章删除失败'
      }
    }
  }).catch (err => {
    ctx.response.body = {
      code: 500,
      msg: '文章删除时出现异常',
      err
    }
  })
}

module.exports = {
  add,
  findAll,
  findOne,
  update,
  del
}