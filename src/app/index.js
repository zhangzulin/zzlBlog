const Koa = require('koa');
const { koaBody } = require('koa-body');

const userRouter = require('../router/user.route')
const sortRouter = require('../router/sort.route')
const errHandle = require('./errHandle')

const app = new Koa();

app.use(koaBody())
app.use(userRouter.routes())
app.use(sortRouter.routes())

//错误处理
app.on('error',errHandle)
module.exports = app