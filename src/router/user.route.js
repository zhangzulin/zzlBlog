const Router = require('koa-router');
// 创建koa-router的实例router
const {userValidator,verifyUser,ctryptPassword,verifyLogin} = require('../middleware/user.middleware')
const {register,login} = require('../controller/user.controller.js')
const router = new Router({ prefix: '/users' });
// GET /users/
router.post('/register',userValidator,verifyUser,ctryptPassword,register)
router.post('/login',userValidator,verifyLogin,login)

module.exports = router
