let { User } = require("../models/users")
let loginUtil = require("./loginUtil/index")
const jwt = require('jsonwebtoken')

const userLogin = async (ctx, next) => {
  await loginUtil.login (User,
    {
      username: ctx.request.body.username,
      pwd: ctx.request.body.pwd
    },ctx)
}

const userReg = async (ctx, next) => {
  const exist = await loginUtil.findUsers(User,{username: ctx.request.body.username},ctx)
  if (!exist) await loginUtil.createUsers(User,ctx.request.body,ctx)
}

const userVerity = async (ctx, next) => {
  console.log(00000,ctx.header.authorization);
  const token = ctx.header.authorization.replace('Bearer ','')
  console.log(11111,token);
  let result = jwt.verify(token,'jianshu-server-jwt')
  console.log(222222,result);
  await loginUtil.verify(User, {username:result.username}, ctx)
}


module.exports = {
  userLogin,
  userReg,
  userVerity
}