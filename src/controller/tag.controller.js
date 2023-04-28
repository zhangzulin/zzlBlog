const { createdTag, getTagDetail,getTagList,getTagName,delTag,editTag } = require('../service/tag.service')
const { tagAddError, userLoginError } = require('../constant/error.type')

const {JWT_SECRET } = require('../config/config.default')
const jwt = require('jsonwebtoken')
class TagController {
    async add(ctx, next){
        //1.获取数据
        const { name,color} = ctx.request.body
        //2.操作数据库
        try {
            
            const res = await getTagName({name})
            if(res){
                ctx.body = {
                    code:0,
                    message:'该标签已存在',
                    data:{
                        
                    }
                }
                return
            }
            const res1 = await createdTag({name,color})
            //3.返回结果
            ctx.body = {
                code:0,
                message:'添加成功',
                data:{
                    
                }
            }
        } catch (error) {
            console.info(err)
            ctx.app.emit('error',tagAddError,ctx)
        }
        
    }
    async del(ctx, next){
        const {id} = ctx.request.body
        try {
            const res = await delTag({id})
            ctx.body = {
                code: 0,
                message: '删除成功',
                data: res,
            }
        } catch (error) {
            console.err('error',ctx.emit('error',userLoginError,ctx))
        }
        
    }
    async edit(ctx, next){
         // 1. 解析pageNum和pageSize
        const { name, id} = ctx.request.body
        // 2. 调用数据处理的相关方法
        const res = await editTag({ id, name })
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '修改成功',
            data: res,
        }
    }
    async list(ctx,next){
         // 1. 解析pageNum和pageSize
         const { pageNo = 1, pageSize = 10, name=''} = ctx.request.body
         // 2. 调用数据处理的相关方法
         const res = await getTagList(pageNo, pageSize, name)
         // 3. 返回结果
         ctx.body = {
             code: 0,
             message: '获取标签列表成功',
             data: res,
         }
    }
    async detail(ctx,next){
        const { id } = ctx.request.body
        const res = await getTagDetail({id})
        if(res){
            ctx.body = {
                code: 0,
                message: '',
                data: res,
            }
        }else{
            ctx.body = {
                code: 4000,
                message: '请输入正确的id',
                data: res,
            }
        }
        
    }
}

module.exports = new TagController()
