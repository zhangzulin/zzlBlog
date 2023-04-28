const Router = require('koa-router');
// 创建koa-router的实例router
const {categoryValidator,
    verifyCategoryId} = require('../middleware/category.middleware')
const {auth} = require('../middleware/auth.middleware')
const {add,del,edit,list,detail} = require('../controller/category.controller.js')
const router = new Router({ prefix: '/category' });
// GET /category/
router.post('/add',categoryValidator,add)
router.post('/delete',verifyCategoryId,del)
router.post('/edit',categoryValidator,verifyCategoryId,edit) 
router.get('/list',list)
router.post('/detail',detail) 


module.exports = router
