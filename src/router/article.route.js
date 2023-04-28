const Router = require('koa-router');
// 创建koa-router的实例router
const {articleValidator,
    verifyArticleId} = require('../middleware/article.middleware')
const {auth} = require('../middleware/auth.middleware')
const {add,del,edit,list,detail} = require('../controller/article.controller.js')
const router = new Router({ prefix: '/article' });
// GET /article/
router.post('/add',articleValidator,add)
router.post('/delete',verifyArticleId,del)
router.post('/edit',articleValidator,verifyArticleId,edit) 
router.get('/list',list)
router.post('/detail',detail) 


module.exports = router
