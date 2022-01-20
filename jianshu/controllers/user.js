let { User } = require("../models")
let crud = require("./crudUtil/index")

//添加
const userAdd = async (ctx, next) => {
  let { username = "", pwd = "" } = ctx.request.body
  await crud.add(User, { username, pwd }, ctx)
}
//修改
const userUpdate = async (ctx, next) => {
  let params = ctx.request.body
  await crud.update(
    User,
    { _id: params._id },
    { username: params.username,pwd:params.pwd },
    ctx
  )
}
//删除
const userDel = async (ctx, next) => {
  let {_id} = ctx.request.body
  await crud.del(User, {_id}, ctx)
}
//查询
const userFind = async (ctx, next) => {
  await crud.find(User, null, ctx)
}
//查询单个
const userFindOne = async (ctx, next) => {
  await crud.findOne(User, {id:ctx.params}, ctx)
}
module.exports = {
  userAdd,
  userUpdate,
  userDel,
  userFind,
  userFindOne,
}
