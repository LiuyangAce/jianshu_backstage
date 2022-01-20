const jwt = require('jsonwebtoken')

const login = async (ctx, next) => {
  let user = {
    username: 'userTest',
    pwd: '213423423'
  }
  let token = jwt.sign({
    username: user.username
  },'jianshu-server-jwt',{
    expiresIn: 3600 * 24 * 7
  })
  ctx.response.body = token
}

module.exports = {
  login
}