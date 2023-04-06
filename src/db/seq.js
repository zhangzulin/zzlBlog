const { Sequelize } = require('sequelize');

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = require('../config/config.default')

// // 方法 1: 传递一个连接 URI
// const sequelize = new Sequelize('sqlite::memory:') // Sqlite 示例
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Postgres 示例

// // 方法 2: 分别传递参数 (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// 方法 3: 分别传递参数 (其它数据库)
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});

// seq
//     .authenticate()
//     .then(()=>{
//         console.log('数据库链接成功')
//     })
//     .catch(err=>{
//         console.log('数据库链接失败',err)
//     })
module.exports = seq