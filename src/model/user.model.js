const { Sequelize, DataTypes } = require('sequelize');
const seq = require('../db/seq')

const User = seq.define('zzl_User', {
  // 在这里定义模型属性
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    commit:'用户名，唯一',
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull:false,//是否为空
    commit:'密码'
    
  },
  is_admin:{
    type: DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue: 0,
    commit:'是否为管理员，0：不是管理员（默认），1：管理员'
  }
});

// `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User); // true
//强制同步数据库（创建数据表）
// User.sync({force:true})
module.exports = User