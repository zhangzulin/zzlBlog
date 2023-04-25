const {JWT_SECRET } = require('../config/config.default')
const { TokenExpiredError,JsonWebTokenError,TokenError}  = require('../constant/error.type')
const jwt = require('jsonwebtoken')

const auth = async (ctx,next)=>{
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ','')
    try {
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user
    } catch (err) {
        switch(err.name){
            case 'TokenExpiredError':
                console.log('过期',err)
                return ctx.app.emit('error',TokenExpiredError,ctx);
            case 'JsonWebTokenError':
                console.log('无效',err)
                return ctx.app.emit('error',JsonWebTokenError,ctx);
        }
    }
    await next();
}
module.exports={
    auth
} 