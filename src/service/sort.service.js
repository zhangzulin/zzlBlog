const Sort = require('../model/sort.model')
class SortService {
    async createdSort(label) {
        //插入数据库
        // User.create({
        //     user_name:user_name,
        //     password:password,
        // })
        const res = await Sort.create({label})
        return res.dataValues;
    }
    async getSortDetail({id}){
     var whereObj = {}
        id&Object.assign(whereObj,{id})
        const res = await Sort.findOne({
            where:{id:id}
        })
        return res ? res.dataValues : null
    }
    async getSortLabel({label}){
     var whereObj = {}
     label&Object.assign(whereObj,{label})
        const res = await Sort.findOne({
            where:{label:label}
        })
        return res ? res.dataValues : null
    }
    async getSortList(pageNo, pageSize, label){
        // 1. 解析pageNo和pageSize
        const offset = (pageNo - 1) * pageSize
        var whereObj = {}
        whereObj = label?{label:label}:{}
        const { count, rows } = await Sort.findAndCountAll({
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
    async delSort({id}){
        const res = await Sort.destroy({
            where: {
                id: id
            }
        })
        return res > 0 ? true : false
    }
    async editSort({ id, label }){
        const whereOpt = {id}
        const newSort = {}
        id&Object.assign(newSort,{id})
        label&Object.assign(newSort,{label})
        const res = await Sort.update(newSort, {
            where: whereOpt
        })
        return res > 0 ? true : false
    }
}
module.exports = new SortService()