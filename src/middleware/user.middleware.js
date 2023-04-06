const bcrypt = require('bcryptjs')
const {
    getUserInfo
} = require("../service/user.service")
const {
    userFormateError,
    userAlreadyExited,
    userDoesNotExist,
    userLoginError
} = require('../constant/error.type')
const { emit } = require('../app')
const userValidator = async (ctx, next) => {
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
const verifyUser = async (ctx, next) => {
    const {
        user_name,
        password
    } = ctx.request.body
    try {
        const res = await getUserInfo({
            user_name
        })
        if (!res) {
            console.error('用户名未注册', user_name)
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('获取用户信息错误', error)
        return ctx.app.emit('error', userRegisterError, ctx)
    }
    await next()
}
const ctryptPassword = async(ctx, next) => {
    const {
        password
    } = ctx.request.body
    console.log(password)
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash
    await next()
}
const verifyLogin = async(ctx, next) => {
    const {
        user_name,password
    } = ctx.request.body
    console.log(password)
    // 1.账号
    try {
        const res = await getUserInfo({user_name})
        if(!res){
            console.error('用户未注册',{user_name})
            return ctx.app.emit('error', userDoesNotExist, ctx)
        }
    } catch (error) {
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)
    }
    // 2.匹配密码
    
    await next()
}
module.exports = {
    userValidator,
    verifyUser,
    ctryptPassword,
    verifyLogin
}