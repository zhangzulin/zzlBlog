const Koa = require('koa');
const { koaBody } = require('koa-body');

const router = require('../router')
const errHandle = require('./errHandle')

const app = new Koa();

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

//错误处理
app.on('error',errHandle)
module.exports = app