const bcrypt = require('bcryptjs')
const {
    getUserInfo
} = require("../service/user.service")
const {
    userFormateError,
    userAlreadyExited,
    userDoesNotExist,
    userLoginError,
    invalidPassword
} = require('../constant/error.type')
const { emit } = require('../app')
const userValidator = async (ctx, next) => {//输入的为空判断
    const {
        user_name,
        password
    } = ctx.request.body
    if (!user_name || !password) {
        console.error('用户名或密码为', {
            user_name,
            password
        })
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}
const verifyUser = async (ctx, next) => {//数据库为空判断
    const {
        user_name,
        password
    } = ctx.request.body
    try {
        const res = await getUserInfo({
            user_name
        })
        if (res) {
            console.error('用户名已注册', user_name)
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('获取用户信息错误', error)
        return ctx.app.emit('error', userRegisterError, ctx)
    }
    await next()
}
const ctryptPassword = async(ctx, next) => {//密码加密
    const {
        password
    } = ctx.request.body
    console.log(password)
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash
    await next()
}
const verifyLogin = async(ctx, next) => { //登录密码是否正确判断
    const {
        user_name,password
    } = ctx.request.body
    console.log(password)
    try {
        // 1.账号
        const res = await getUserInfo({user_name})
        if(!res){
            console.error('用户未注册',{user_name})
            return ctx.app.emit('error', userDoesNotExist, ctx)
        }
        // 2.匹配密码
        if(!bcrypt.compareSync(password,res.password)){//密码错误
            return ctx.app.emit('error',invalidPassword,ctx)
        }
    } catch (error) {
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)
    }
    
    await next()
}
module.exports = {
    userValidator,
    verifyUser,
    ctryptPassword,
    verifyLogin
}