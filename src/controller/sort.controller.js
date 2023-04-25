const { createdSort, getSortDetail,getSortList,getSortLabel,delSort,editSort } = require('../service/sort.service')
const { sortAddError, userLoginError } = require('../constant/error.type')

const {JWT_SECRET } = require('../config/config.default')
const jwt = require('jsonwebtoken')
class SortController {
    async add(ctx, next){
        //1.获取数据
        const { label} = ctx.request.body
        //2.操作数据库
        try {
            
            const res = await getSortLabel({label})
            if(res){
                ctx.body = {
                    code:0,
                    message:'该类目已存在',
                    data:{
                        
                    }
                }
                return
            }
            const res1 = await createdSort(label)
            //3.返回结果
            ctx.body = {
                code:0,
                message:'添加成功',
                data:{
                    
                }
            }
        } catch (error) {
            console.info(err)
            ctx.app.emit('error',sortAddError,ctx)
        }
        
    }
    async del(ctx, next){
        const {id} = ctx.request.body
        try {
            const res = await delSort({id})
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
        const { label, id} = ctx.request.body
        // 2. 调用数据处理的相关方法
        const res = await editSort({ id, label })
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '修改成功',
            data: res,
        }
    }
    async list(ctx,next){
         // 1. 解析pageNum和pageSize
         const { pageNo = 1, pageSize = 10, label=''} = ctx.request.body
         // 2. 调用数据处理的相关方法
         const res = await getSortList(pageNo, pageSize, label)
         // 3. 返回结果
         ctx.body = {
             code: 0,
             message: '获取类目列表成功',
             data: res,
         }
    }
    async detail(ctx,next){
        const { id } = ctx.request.body
        const res = await getSortDetail({id})
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

module.exports = new SortController()
