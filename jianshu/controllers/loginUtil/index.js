const jwt = require('jsonwebtoken')

// 用户登录
const login = (model, where, ctx) => {
  return model
  .findOne(where)
  .then((result) => {
    if (result) {
      let token = jwt.sign({
        username: ctx.request.body.username
      },'jianshu-server-jwt',{
        expiresIn: 3600 * 24 * 7
      })
      ctx.response.body = {
        code: 200,
        msg: '登录成功',
        token
      }
    }else {
      ctx.response.body = {
        code: 300,
        msg: '登录失败,用户名或密码错误',
      }
    }
  })
  .catch((err) => {
    ctx.response.body = {
      code: 500,
      msg: '登录时出现异常',
      err
    }
  })
}

// 用户注册
// find
const findUsers = (model, where, ctx) => {
  return model
    .findOne(where)
    .then((result) => {
      return result ? 
      ctx.response.body = {
        code: 300,
        msg: "用户名已存在",
      }
      : false
    })
}
// create
const createUsers = (model, where, ctx) => {
  return model
  .create(where)
  .then((result) => {
    if (result) {
      ctx.response.body = {
        code: 200,
        msg: "添加成功",
      }
    } else {
      ctx.response.body = {
        code: 300,
        msg: "添加失败",
      }
    }
  })
  .catch((err) => {
    ctx.response.body = {
      code: 400,
      msg: "添加出现异常",
    }
    console.error(err)
  })
}

module.exports = {
  login,
  findUsers,
  createUsers
}