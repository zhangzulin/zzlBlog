const { Sequelize, DataTypes } = require('sequelize');
const seq = require('../db/seq')

const article = seq.define('article', {
  // 在这里定义模型属性
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:false,
    commit:'标题',
  },
  categories: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:false,
    commit:'目录',
  },
  tagIds: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:false,
    commit:'标签',
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:false,
    commit:'内容',
  },
});

// `sequelize.define` 会返回模型
// console.log(article === sequelize.models.article); // true
//强制同步数据库（创建数据表）
// article.sync({force:true})
module.exports = article