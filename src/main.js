const { APP_PORT } = require('./config/config.default')
// const cors = require('koa-cors')
// // 处理跨域，放到中间件的最前面
// app.use(cors());
const app = require('./app')

// 监听端口
app.listen(APP_PORT, () => {
    console.log(`服务器已启动，http://localhost:${APP_PORT}`);
})