let { User } = require("../models/users")
let loginUtil = require("./loginUtil/index")
const jwt = require('jsonwebtoken')

// 用户登录
const userLogin = async (ctx, next) => {
  await loginUtil.login (User,
    {
      username: ctx.request.body.username,
      pwd: ctx.request.body.pwd
    },ctx)
}

// 用户注册
const userReg = async (ctx, next) => {
  const exist = await loginUtil.findUsers(User,{username: ctx.request.body.username},ctx)
  if (!exist) await loginUtil.createUsers(User,ctx.request.body,ctx)
}

// 获取token
const userVerity = async (ctx, next) => {
  const token = ctx.header.authorization.replace('Bearer ','')
  let result = jwt.verify(token,'jianshu-server-jwt')
  await loginUtil.verify(User, {_id:result._id}, ctx)
}

// 修改 密码
const userPwdUpdate = async (ctx, next) => {
  await loginUtil.updatePwd(User, {...ctx.request.body}, ctx)
}


module.exports = {
  userLogin,
  userReg,
  userVerity,
  userPwdUpdate
}