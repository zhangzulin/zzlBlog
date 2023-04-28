const Tag = require('../model/tag.model')
class TagService {
    async createdTag({name,color}) {
        //插入数据库
        // User.create({
        //     user_name:user_name,
        //     password:password,
        // })
        const res = await Tag.create({name,color})
        return res.dataValues;
    }
    async getTagDetail({id}){
     var whereObj = {}
        id&Object.assign(whereObj,{id})
        const res = await Tag.findOne({
            where:{id:id}
        })
        return res ? res.dataValues : null
    }
    async getTagName({name}){
     var whereObj = {}
     name&Object.assign(whereObj,{name})
        const res = await Tag.findOne({
            where:{name:name}
        })
        return res ? res.dataValues : null
    }
    async getTagList(pageNo, pageSize, name){
        // 1. 解析pageNo和pageSize
        const offset = (pageNo - 1) * pageSize
        var whereObj = {}
        whereObj = name?{name:name}:{}
        const { count, rows } = await Tag.findAndCountAll({
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
    async delTag({id}){
        const res = await Tag.destroy({
            where: {
                id: id
            }
        })
        return res > 0 ? true : false
    }
    async editTag({ id, name }){
        const whereOpt = {id}
        const newTag = {}
        id&Object.assign(newTag,{id})
        name&Object.assign(newTag,{name})
        const res = await Tag.update(newTag, {
            where: whereOpt
        })
        return res > 0 ? true : false
    }
}
module.exports = new TagService()