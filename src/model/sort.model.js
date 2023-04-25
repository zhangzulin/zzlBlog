const { Sequelize, DataTypes } = require('sequelize');
const seq = require('../db/seq')

const sort = seq.define('sort', {
  // 在这里定义模型属性
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    commit:'用户名，唯一',
  }
});

// `sequelize.define` 会返回模型
// console.log(sort === sequelize.models.sort); // true
//强制同步数据库（创建数据表）
// sort.sync({force:true})
module.exports = sort