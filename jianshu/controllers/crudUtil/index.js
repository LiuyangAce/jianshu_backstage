/**
 * 用于添加数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @return {*}
 */
const add = (model, where, ctx) => {
  return model
    .create(where)
    .then((result) => {
      if (result) {
        ctx.response.body = {
          code: 200,
          msg: "添加成功",
          data: result,
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

/**
 * 用于更新/修改某条数据的公共方法
 * @param {*} model
 * @param {*} ctx
 * @return {*}
 */
const update = (model, where, params, ctx) => {
  return model
    .updateOne(where, params)
    .then((result) => {
      if(result.modifiedCount > 0){
        ctx.response.body = {
          code: 200,
          msg: '个人资料修改成功'
        }
      }else {
        ctx.response.body = {
          code: 300,
          msg: '个人资料修改失败'
        }
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "个人资料修改出现异常",
        err
      }
    })
}

/**
 * 用户删除的公共方法
 * @param {*} model
 * @param {*} ctx
 * @return {*}
 */
const del = (model, where, ctx) => {
  return model
    .findOneAndDelete(where)
    .then((result) => {
      ctx.response.body = {
        result,
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "修改出现异常",
      }
      console.error(err)
    })
}

/**
 * 用于查询所有数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @return {*}
 */
const find = (model, where, ctx) => {
  return model
    .find(where)
    .then((result) => {
      ctx.response.body = {
        result: result,
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "查询出现异常",
      }
      console.error(err)
    })
}

/**
 * 用户查询单个数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @return {*}
 */
const findOne = (model, where, ctx) => {
  return model
    .findOne(where)
    .then((result) => {
      ctx.response.body = {
        result: result,
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "查询单个出现异常",
      }
      console.error(err)
    })
}

module.exports = {
  find,
  add,
  update,
  del,
  findOne,
}
