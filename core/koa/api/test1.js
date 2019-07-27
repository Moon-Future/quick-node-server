const Router = require('koa-router')
const router = new Router()

router.get('/getData', async(ctx) => {
  try {
    console.log('get请求参数', ctx.query)
    ctx.body = {code: 200}
  } catch(err) {
     throw new Error(err)
  }
})

router.post('/postData', async(ctx) => {
  try {
    console.log('post提交数据', ctx.request.body)
    ctx.body = {code: 200}
  } catch(err) {
     throw new Error(err)
  }
})

// ---replace--- Mongodb 若使用Mongodb数据库
const User = require('../database/schema/user')
router.post('/login', async (ctx) => {
  try {
    console.log('database', ctx.request.body)
    const data = ctx.request.body
    const email = data.email
    const password = data.password
    const result = await User.find({email: email})
    if (result.length === 0) {
      ctx.body = {code: 500, message: '用户不存在'}
    } else if(result[0].password !== password) {
      ctx.body = {code: 500, message: '密码错误'}
    } else {
      ctx.session.userInfo = {id: result[0]._id}
      ctx.body = {code: 200, message: '登陆成功'}
    }
  } catch(err) {
    throw new Error(err)
  }
})
// ---replace--- Mongodb

// ---replace--- Mysql 若使用Mysql数据库
const query = require('../database/init')
router.post('/login', async (ctx) => {
  try {
    console.log('database', ctx.request.body)
    const data = ctx.request.body
    const email = data.email
    const password = data.password
    const result = await query(`SELECT * FROM user WHERE email = ?`, [email])
    if (result.length === 0) {
      ctx.body = {code: 500, message: '用户不存在'}
    } else if(result[0].password !== password) {
      ctx.body = {code: 500, message: '密码错误'}
    } else {
      ctx.session.userInfo = {id: result[0]._id}
      ctx.body = {code: 200, message: '登陆成功'}
    }
  } catch(err) {
    throw new Error(err)
  }
})
// ---replace--- Mysql

module.exports = router