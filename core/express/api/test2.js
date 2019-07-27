const express = require('express')
const router = express.Router()

router.get('/getData', (req, res, next) => {
  try {
    console.log('get请求参数', req.query)
    res.json({code: 200}) // res.send('ok')
  } catch(err) {
     throw new Error(err)
  }
})

router.post('/postData', (req, res, next) => {
  try {
    console.log('post提交数据', req.body)
    res.json({code: 200}) // res.send('ok')
  } catch(err) {
     throw new Error(err)
  }
})

module.exports = router