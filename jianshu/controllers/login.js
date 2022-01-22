let { User } = require("../models/users")
let loginUtil = require("./loginUtil/index")

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


module.exports = {
  userLogin,
  userReg
}