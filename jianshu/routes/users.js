const router = require('koa-router')()
const userCtl = require('../controllers/users')
const loginCtl = require('../controllers/login')

router.prefix('/users')

//添加
router.post('/add', userCtl.userAdd)

//修改个人资料
router.post('/update/personal', userCtl.userUpdatePersonal)

//删除
router.post('/del', userCtl.userDel)

//查询
router.get('/find', userCtl.userFind)

//查询单个用户
router.get('/find/:id', userCtl.userFindOne)

//登录
router.post('/login', loginCtl.userLogin)
//注册
router.post('/reg', loginCtl.userReg)
//验证
router.post('/verify', loginCtl.userVerity)
//修改密码
router.post('/updatePwd', loginCtl.userPwdUpdate)

module.exports = router
