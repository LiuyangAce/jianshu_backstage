//查询所有接口（分页）
const findAll = async (model, where, ctx) => {
  let { page, pageSize } = where.pagination

  //判断页码
  if (!page || isNaN(Number(page))) {
    page = 1
  } else {
    page = Number(page)
  }

  //每页条数
  // let pageSize = 10
  //计算总页数
  let count = 0
  await model
    .find()
    .count()
    .then((rel) => {
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
  } else if (page < 1) {
    page = 1
  }

  // 计算起始位置
  let start = (page - 1) * pageSize

  await model.find()
    .skip(start)
    .limit(pageSize)
    .then((rel) => {
      if (rel && rel.length > 0) {
        ctx.body = {
          code: 200,
          msg: "接口查询成功",
          result: rel,
          page,
          pageSize,
          count,
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "没有查询到接口",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "接口查询时候出现异常",
        err,
      }
    })
}

// 查询所有接口根据条件（分页）
const findAllByCondition = async (model, where, ctx) => {
  let { page, pageSize } = where.pagination

  //判断页码
  if (!page || isNaN(Number(page))) {
    page = 1
  } else {
    page = Number(page)
  }

  //每页条数
  // let pageSize = 10
  //计算总页数
  let count = 0
  await model.find(where.condition)
    .count()
    .then((rel) => {
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
  } else if (page < 1) {
    page = 1
  }

  // 计算起始位置
  let start = (page - 1) / pageSize

  await model.find(where.condition)
    .skip(start)
    .limit(pageSize)
    .then((rel) => {
      if (rel && rel.length > 0) {
        ctx.body = {
          code: 200,
          msg: "接口查询成功",
          result: rel,
          page,
          pageSize,
          count,
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "没有查询到接口"
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "接口查询时候出现异常",
        err,
      }
    })
}

// 新增接口
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

// 修改接口
const update = async (model, where, params, ctx) => {
  let oldState = null
  await model
    .findOne(where)
    .then((result) => {
      oldState = result.interfaceState
    })
    .catch((err) => {
      console.log(err);
    })
    if (oldState === "未完成" && params.interfaceState === "已完成") {
      params.endTime = new Date()
    }else if (oldState === "已完成" && params.interfaceState === "未完成") {
      params.endTime = ''
    }
  await model
    .updateOne(where, params)
    .then((result) => {
      ctx.response.body = {
        code: 200,
        msg: "接口修改成功",
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "接口修改出现异常",
        err,
      }
    })
}


const del = (model, where, ctx) => {
  return model
    .findOneAndDelete(where)
    .then((result) => {
      ctx.response.body = {
        code: 200,
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

const findModule = async (model,ctx) => {
  // let module = []
  // await model
  //   .distinct('interfaceType')
  //   .then((res) => {
  //     module = res
  //   })
  // let arr = []
  // module.forEach(element => {
  //   arr.push({'interfaceType':element})
  // });
  // let obj = {}

  // arr.forEach(element => {
  //   model.find(element).count()
  //   .then((res) => {
  //     obj[element.interfaceType] = res
  //     console.log(obj);
  //   })
  // }); 
  
  let userModule = null
  let xxModule = null
  let interfaceModule = null
  let defectModule = null

  await model
  .find({ interfaceType: "用户模块" })
  .count()
  .then((res) => {
    userModule = res
  })

  await model
  .find({ interfaceType: "xx模块" })
  .count()
  .then((res) => {
    xxModule = res
  })

  await model
  .find({ interfaceType: "接口模块" })
  .count()
  .then((res) => {
    interfaceModule = res
  })

  await model
  .find({ interfaceType: "接口模块" })
  .count()
  .then((res) => {
    defectModule = res
  })

  ctx.response.body = {
    code: 200,
    msg: '查询成功',
    data: {
      userModule,
      xxModule,
      interfaceModule,
      defectModule
    }
  }
}
module.exports = {
  del,
  add,
  findAll,
  findAllByCondition,
  update,

  findModule
}

