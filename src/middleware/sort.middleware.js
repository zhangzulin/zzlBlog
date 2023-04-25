const bcrypt = require('bcryptjs')
const {
    getSortDetail
} = require("../service/sort.service")
const {
    sortFormateError,
    sortNoAlreadyExited,
} = require('../constant/error.type')
const { emit } = require('../app')
const sortValidator = async (ctx, next) => {//输入的为空判断
    const {
        label
    } = ctx.request.body
    if (!label) {
        console.error('类目名称为空', {
            label
        })
        ctx.app.emit('error', sortFormateError, ctx)
        return
    }
    await next()
}
const verifySortId = async (ctx, next) => {//数据库为空判断
    const {
        id
    } = ctx.request.body
    try {
        const res = await getSortDetail({
            id
        })
        if (!res) {
            console.error('请输入正确的id', id)
            ctx.app.emit('error', sortNoAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('获取类目信息错误', error)
        return ctx.app.emit('error', sortNoAlreadyExited, ctx)
    }
    await next()
}

module.exports = {
    sortValidator,
    verifySortId,
   
}