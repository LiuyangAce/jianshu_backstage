const jwt = require('jsonwebtoken')

// 用户登录
const login = (model, where, ctx) => {
  return model
  .findOne(where)
  .then((result) => {
    if (result) {
      // 通过_id和username生产token
      let token = jwt.sign({
        username: result.username,
        _id: result._id
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

// 验证用户
const verify = (model, where, ctx) => {
  return model
  .findOne(where)
  .then((result) => {
    if(result) {
      ctx.response.body = {
        code: 200,
        msg: "用户认证成功",
        result
      }
    }else {
      ctx.response.body = {
        code: 500,
        msg: "用户认证失败",
      }
    }
  })
  .catch((err) => {
    ctx.response.body = {
      code: 500,
      msg: "用户认证失败",
      err
    }
  })
}

// 修改密码
const updatePwd = (model, where, ctx) => {
  return model
  .updateOne({username: where.username},{pwd: where.pwd})
  .then((result) => {
    if(result.modifiedCount > 0){
      ctx.response.body = {
        code: 200,
        msg: "密码修改成功"
      }
    } else {
      ctx.response.body = {
        code: 300,
        msg: "密码修改失败"
      }
    }
  })
  .catch((err) => {
    ctx.response.body = {
      code: 500,
      msg: "修改密码时出现异常",
      err
    }
  })
}
module.exports = {
  login,
  findUsers,
  createUsers,
  verify,
  updatePwd
}