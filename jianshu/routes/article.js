let article = require('../controllers/article')
const router = require('koa-router')()

router.prefix('/article')

//添加文章
router.post('/add',article.add)
router.get('/findOne',article.findOne)
router.get('/findAll',article.findAll)
router.post('/update',article.update)
router.post('/del',article.del)

module.exports = router