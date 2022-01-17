let {User} = require('../models')

//添加
const userAdd = async(ctx,next) => {
  let {username = '',pwd = ''} = ctx.request.body
  await User.create({username,pwd})
  .then((result)=> {
    if(result){
      ctx.response.body = {
        code:200,
        msg: '添加成功',
        data: result
      }
    }else {
      ctx.response.body = {
        code:300,
        msg: '添加失败',
      }
    }
  })
  .catch((err) => {
    ctx.response.body = {
      code: 400,
      msg: '添加出现异常'
    }
    console.error(err)
  })
}
//修改
const userUpdate = async(ctx,next) => {
  let params = ctx.request.body
  await User.updateOne(
    {'_id': params._id},
    {
      'username':params.username,
      'pwd':params.pwd
    }
  )
  .then((result)=> {
    ctx.response.body = {
      result,
    }
  })
  .catch(err => {
    ctx.response.body = {
      code: 400,
      msg: '修改出现异常'
    }
    console.error(err);
  })
}
//删除
const userDel = async(ctx,next) => {
  let {id} = ctx.request.body._id
  await User.findOneAndDelete(id)
  .then(result => {
    ctx.response.body = {
      result
    }
  })
  .catch(err => {
    ctx.response.body = {
      code: 400,
      msg: '修改出现异常'
    }
    console.error(err);
  })
}
// 查询
const userFind = async(ctx,next) => {
  await User.find()
  .then((result)=> {
    ctx.response.body = {
      result: result
    }
  })
  .catch((err)=> {
    ctx.response.body = {
      code: 400,
      msg: '查询出现异常'
    }
    console.error(err);
  })
}
//查询单个
const userFindOne = async(ctx,next) => {
  let id = ctx.request.params
  await User.findOne(id)
  .then((result)=> {
    ctx.response.body = {
      result: result
    }
  })
  .catch((err)=> {
    ctx.response.body = {
      code: 400,
      msg: '查询单个出现异常'
    }
    console.error(err);
  })
}

module.exports = {
  userAdd,
  userUpdate,
  userDel,
  userFind,
  userFindOne
}