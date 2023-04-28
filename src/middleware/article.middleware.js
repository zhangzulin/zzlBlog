const bcrypt = require('bcryptjs')
const {
    getArticleDetail
} = require("../service/article.service")
const {
    articleFormateError,
    articleNoAlreadyExited,
} = require('../constant/error.type')
const { emit } = require('../app')
const articleValidator = async (ctx, next) => {//输入的为空判断
    const {
        title,categories,tagIds,content
    } = ctx.request.body
    if (!title||!categories||!tagIds||!content) {
        console.error('参数为空', {
            title
        })
        ctx.app.emit('error', articleFormateError, ctx)
        return
    }
    await next()
}
const verifyArticleId = async (ctx, next) => {//数据库为空判断
    const {
        id
    } = ctx.request.body
    try {
        const res = await getArticleDetail({
            id
        })
        if (!res) {
            console.error('请输入正确的id', id)
            ctx.app.emit('error', articleNoAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('获取目录信息错误', error)
        return ctx.app.emit('error', articleNoAlreadyExited, ctx)
    }
    await next()
}

module.exports = {
    articleValidator,
    verifyArticleId,
   
}