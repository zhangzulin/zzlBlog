const Router = require('koa-router');
// 创建koa-router的实例router
const {tagValidator,
    verifyTagId} = require('../middleware/tag.middleware')
const {auth} = require('../middleware/auth.middleware')
const {add,del,edit,list,detail} = require('../controller/tag.controller.js')
const router = new Router({ prefix: '/tag' });
// GET /tag/
router.post('/add',tagValidator,add)
router.post('/delete',verifyTagId,del)
router.post('/edit',tagValidator,verifyTagId,edit) 
router.get('/list',list)
router.post('/detail',detail) 


module.exports = router
