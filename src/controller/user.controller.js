const { createdUser, getUserInfo,getUserList,updateUserInfo } = require('../service/user.service')
const { userRegisterError, userLoginError } = require('../constant/error.type')

const {JWT_SECRET } = require('../config/config.default')
const jwt = require('jsonwebtoken')
class UserController {
    async register(ctx, next){
        //1.获取数据
        const { user_name, password} = ctx.request.body
        //2.操作数据库
        try {
            const res = await createdUser(user_name,password)
            //3.返回结果
            ctx.body = {
                code:0,
                message:'用户注册成功',
                data:{
                    id:res.id,
                    user_name:res.user_name
                }
            }
        } catch (error) {
            console.info(err)
            ctx.app.emit('error',userRegisterError,ctx)
        }
        
    }
    async login(ctx, next){
        const { user_name} = ctx.request.body

        try {
            const {password, ...res} = await getUserInfo({user_name})
            ctx.body = {
                code:0,
                message:'登录成功',
                data:{
                   token: jwt.sign(res,JWT_SECRET,{expiresIn:'1d'})
                }
            }
        } catch (error) {
            console.err('error',ctx.emit('error',userLoginError,ctx))
        }
        
    }
    async getUserList(ctx, next){
         // 1. 解析pageNum和pageSize
        const { pageNo = 1, pageSize = 10, user_name} = ctx.request.body
        // 2. 调用数据处理的相关方法
        const res = await getUserList(pageNo, pageSize, user_name)
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '获取用户列表成功',
            data: res,
        }
    }
    async updateUserInfo(ctx,next){
        const { id, user_name } = ctx.request.body
        
        const res = await updateUserInfo(id, user_name)
        ctx.body = {
            code: 0,
            message: '修改成功',
            data: res,
        }
    }
}

module.exports = new UserController()
