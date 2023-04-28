const { createdCategory, getCategoryDetail,getCategoryList,getCategoryName,delCategory,editCategory } = require('../service/category.service')
const { categoryAddError, userLoginError } = require('../constant/error.type')

const {JWT_SECRET } = require('../config/config.default')
const jwt = require('jsonwebtoken')
class CategoryController {
    async add(ctx, next){
        //1.获取数据
        const { name} = ctx.request.body
        //2.操作数据库
        try {
            
            const res = await getCategoryName({name})
            if(res){
                ctx.body = {
                    code:0,
                    message:'该目录已存在',
                    data:{
                        
                    }
                }
                return
            }
            const res1 = await createdCategory(name)
            //3.返回结果
            ctx.body = {
                code:0,
                message:'添加成功',
                data:{
                    
                }
            }
        } catch (error) {
            console.info(err)
            ctx.app.emit('error',categoryAddError,ctx)
        }
        
    }
    async del(ctx, next){
        const {id} = ctx.request.body
        try {
            const res = await delCategory({id})
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
        const res = await editCategory({ id, name })
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
         const res = await getCategoryList(pageNo, pageSize, name)
         // 3. 返回结果
         ctx.body = {
             code: 0,
             message: '获取目录列表成功',
             data: res,
         }
    }
    async detail(ctx,next){
        const { id } = ctx.request.body
        const res = await getCategoryDetail({id})
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

module.exports = new CategoryController()
