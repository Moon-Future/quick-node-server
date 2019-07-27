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

module.exports = router