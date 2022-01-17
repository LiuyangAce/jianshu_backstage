const router = require('koa-router')()
const userCtl = require('../controllers/user')

router.prefix('/users')

//添加
router.post('/add', userCtl.userAdd)

//修改
router.post('/update', userCtl.userUpdate)

//删除
router.post('/del', userCtl.userDel)

//查询
router.get('/find', userCtl.userFind)
//查询单个用户
router.get('/find/:id', userCtl.userFindOne)
module.exports = router
