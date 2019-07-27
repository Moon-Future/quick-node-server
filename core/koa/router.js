const Router = require('koa-router')
const test1 = require('./api/test1')
const test2 = require('./api/test2')
const router = new Router({
  prefix: '/api'
})

router.use('/test1', test1.routes())
router.use('/test2', test2.routes())

module.exports = router