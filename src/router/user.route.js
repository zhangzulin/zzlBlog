const Router = require('koa-router');
// 创建koa-router的实例router
const {userValidator,verifyUser,ctryptPassword,verifyLogin} = require('../middleware/user.middleware')
const {auth} = require('../middleware/auth.middleware')
const {register,login,getUserList,updateUserInfo} = require('../controller/user.controller.js')
const router = new Router({ prefix: '/users' });
// GET /users/
router.post('/register',userValidator,verifyUser,ctryptPassword,register)
router.post('/login',userValidator,verifyLogin,login)
router.post('/getUserList',getUserList) //获取用户列表
router.post('/updateUserInfo',updateUserInfo) //修改用户数据

router.patch('/updatePassword',auth,ctryptPassword,(ctx,next)=>{
    ctx.body = '修改密码成功'
})

module.exports = router
