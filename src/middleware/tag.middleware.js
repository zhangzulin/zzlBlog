const bcrypt = require('bcryptjs')
const {
    getTagDetail
} = require("../service/tag.service")
const {
    tagFormateError,
    tagNoAlreadyExited,
} = require('../constant/error.type')
const { emit } = require('../app')
const tagValidator = async (ctx, next) => {//输入的为空判断
    const {
        name
    } = ctx.request.body
    if (!name) {
        console.error('目录名称为空', {
            name
        })
        ctx.app.emit('error', tagFormateError, ctx)
        return
    }
    await next()
}
const verifyTagId = async (ctx, next) => {//数据库为空判断
    const {
        id
    } = ctx.request.body
    try {
        const res = await getTagDetail({
            id
        })
        if (!res) {
            console.error('请输入正确的id', id)
            ctx.app.emit('error', tagNoAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('获取目录信息错误', error)
        return ctx.app.emit('error', tagNoAlreadyExited, ctx)
    }
    await next()
}

module.exports = {
    tagValidator,
    verifyTagId,
}