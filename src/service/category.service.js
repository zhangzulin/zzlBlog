const Category = require('../model/category.model')
class CategoryService {
    async createdCategory(name) {
        //插入数据库
        // User.create({
        //     user_name:user_name,
        //     password:password,
        // })
        const res = await Category.create({name})
        return res.dataValues;
    }
    async getCategoryDetail({id}){
     var whereObj = {}
        id&Object.assign(whereObj,{id})
        const res = await Category.findOne({
            where:{id:id}
        })
        return res ? res.dataValues : null
    }
    async getCategoryName({name}){
     var whereObj = {}
     name&Object.assign(whereObj,{name})
        const res = await Category.findOne({
            where:{name:name}
        })
        return res ? res.dataValues : null
    }
    async getCategoryList(pageNo, pageSize, name){
        // 1. 解析pageNo和pageSize
        const offset = (pageNo - 1) * pageSize
        var whereObj = {}
        whereObj = name?{name:name}:{}
        const { count, rows } = await Category.findAndCountAll({
            where: whereObj,
            offset: offset,
            limit: pageSize * 1,
        })
        return {
            pageNo,
            pageSize,
            total: count,
            rows: rows,
        }
    }
    async updateUserInfo(id,user_name){
        const whereOpt = { id }
        const newUser = {}

        user_name && Object.assign(newUser, { user_name })
        const res = await User.update(newUser, { where: whereOpt })
        return res[0] > 0 ? true : false
    }
    async delCategory({id}){
        const res = await Category.destroy({
            where: {
                id: id
            }
        })
        return res > 0 ? true : false
    }
    async editCategory({ id, name }){
        const whereOpt = {id}
        const newCategory = {}
        id&Object.assign(newCategory,{id})
        name&Object.assign(newCategory,{name})
        const res = await Category.update(newCategory, {
            where: whereOpt
        })
        return res > 0 ? true : false
    }
}
module.exports = new CategoryService()