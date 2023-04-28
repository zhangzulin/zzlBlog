const { Sequelize, DataTypes } = require('sequelize');
const seq = require('../db/seq')

const tag = seq.define('tag', {
  // 在这里定义模型属性
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    commit:'标签名称，唯一',
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:false,
    commit:'标签颜色',
  }
});

// `sequelize.define` 会返回模型
// console.log(tag === sequelize.models.tag); // true
//强制同步数据库（创建数据表）
// tag.sync({force:true})
module.exports = tag