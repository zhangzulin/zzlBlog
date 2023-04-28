const Article = require('../model/article.model')
class ArticleService {
    async createdArticle({title,categories,tagIds,content}) {
        //插入数据库
        // User.create({
        //     user_title:user_title,
        //     password:password,
        // })
        const res = await Article.create({title,categories,tagIds,content})
        return res.dataValues;
    }
    async getArticleDetail({id}){
     var whereObj = {}
        id&Object.assign(whereObj,{id})
        const res = await Article.findOne({
            where:{id:id}
        })
        return res ? res.dataValues : null
    }
    async getArticleTitle({title}){
     var whereObj = {}
     title&Object.assign(whereObj,{title})
        const res = await Article.findOne({
            where:{title:title}
        })
        return res ? res.dataValues : null
    }
    async getArticleList(pageNo, pageSize, title){
        // 1. 解析pageNo和pageSize
        const offset = (pageNo - 1) * pageSize
        var whereObj = {}
        whereObj = title?{title:title}:{}
        const { count, rows } = await Article.findAndCountAll({
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
    async updateUserInfo(id,user_title){
        const whereOpt = { id }
        const newUser = {}

        user_title && Object.assign(newUser, { user_title })
        const res = await User.update(newUser, { where: whereOpt })
        return res[0] > 0 ? true : false
    }
    async delArticle({id}){
        const res = await Article.destroy({
            where: {
                id: id
            }
        })
        return res > 0 ? true : false
    }
    async editArticle({ id, title }){
        const whereOpt = {id}
        const newArticle = {}
        id&Object.assign(newArticle,{id})
        title&Object.assign(newArticle,{title})
        const res = await Article.update(newArticle, {
            where: whereOpt
        })
        return res > 0 ? true : false
    }
}
module.exports = new ArticleService()