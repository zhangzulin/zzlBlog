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
        id&Object.assign({whereObj,id})
        user_name&Object.assign({whereObj,user_name})
        password&Object.assign({whereObj,password})
        isAdmin&Object.assign({whereObj,isAdmin})
        const res = await User.findOne({
            where:{user_name:user_name}
        })
        return res ? res.dataValues : null
    }
}
module.exports = new UserService()