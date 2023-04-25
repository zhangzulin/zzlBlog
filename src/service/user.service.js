const User = require('../model/user.model')
class UserService {
    async createdUser(user_name,password) {
        //插入数据库
        // User.create({
        //     user_name:user_name,
        //     password:password,
        // })
        const res = await User.create({user_name,password})
        return res.dataValues;
    }
    async getUserInfo({id,user_name,password,isAdmin}){
        var whereObj = {}
        id&Object.assign(whereObj,{id})
        user_name&Object.assign(whereObj,{user_name})
        password&Object.assign(whereObj,{password})
        isAdmin&Object.assign(whereObj,{isAdmin})
        const res = await User.findOne({
            where:{user_name:user_name}
        })
        return res ? res.dataValues : null
    }
    async getUserList(pageNo, pageSize, user_name){
        // 1. 解析pageNo和pageSize
        const offset = (pageNo - 1) * pageSize
        var whereObj = {}
        whereObj = user_name?{user_name:user_name}:{}
        console.log(whereObj)
        const { count, rows } = await User.findAndCountAll({
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
}
module.exports = new UserService()