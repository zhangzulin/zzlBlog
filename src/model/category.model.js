const { Sequelize, DataTypes } = require('sequelize');
const seq = require('../db/seq')

const category = seq.define('category', {
  // 在这里定义模型属性
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    commit:'目录名称，唯一',
  }
});

// `sequelize.define` 会返回模型
// console.log(category === sequelize.models.category); // true
//强制同步数据库（创建数据表）
// category.sync({force:true})
module.exports = category