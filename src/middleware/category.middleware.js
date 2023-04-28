const bcrypt = require('bcryptjs')
const {
    getCategoryDetail
} = require("../service/category.service")
const {
    categoryFormateError,
    categoryNoAlreadyExited,
} = require('../constant/error.type')
const { emit } = require('../app')
const categoryValidator = async (ctx, next) => {//输入的为空判断
    const {
        name
    } = ctx.request.body
    if (!name) {
        console.error('目录名称为空', {
            name
        })
        ctx.app.emit('error', categoryFormateError, ctx)
        return
    }
    await next()
}
const verifyCategoryId = async (ctx, next) => {//数据库为空判断
    const {
        id
    } = ctx.request.body
    try {
        const res = await getCategoryDetail({
            id
        })
        if (!res) {
            console.error('请输入正确的id', id)
            ctx.app.emit('error', categoryNoAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('获取目录信息错误', error)
        return ctx.app.emit('error', categoryNoAlreadyExited, ctx)
    }
    await next()
}

module.exports = {
    categoryValidator,
    verifyCategoryId,
   
}