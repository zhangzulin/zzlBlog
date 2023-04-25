const Router = require('koa-router');
// 创建koa-router的实例router
const {sortValidator,
    verifySortId} = require('../middleware/sort.middleware')
const {auth} = require('../middleware/auth.middleware')
const {add,del,edit,list,detail} = require('../controller/sort.controller.js')
const router = new Router({ prefix: '/sort' });
// GET /sort/
router.post('/add',sortValidator,add)
router.post('/delete',verifySortId,del)
router.post('/edit',sortValidator,verifySortId,edit) 
router.post('/list',list)
router.post('/detail',detail) 


module.exports = router
