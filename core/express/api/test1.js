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

// ---replace--- Mongodb 若使用Mongodb数据库
const User = require('../database/schema/user')
router.post('/login', async (req, res, next) => {
  try {
    console.log('database', req.body)
    const data = req.body
    const email = data.email
    const password = data.password
    const result = await User.find({email: email})
    if (result.length === 0) {
      res.json({code: 500, message: '用户不存在'})
    } else if(result[0].password !== password) {
      res.json({code: 500, message: '密码错误'})
    } else {
      req.session.userInfo = {id: result[0]._id}
      res.json({code: 200, message: '登陆成功'})
    }
  } catch(err) {
    throw new Error(err)
  }
})
// ---replace--- Mongodb

// ---replace--- Mysql 若使用Mysql数据库
const query = require('../database/init')
router.post('/login', async (req, res, next) => {
  try {
    console.log('database', req.body)
    const data = req.body
    const email = data.email
    const password = data.password
    const result = await query(`SELECT * FROM user WHERE email = ?`, [email])
    if (result.length === 0) {
      res.json({code: 500, message: '用户不存在'})
    } else if(result[0].password !== password) {
      res.json({code: 500, message: '密码错误'})
    } else {
      req.session.userInfo = {id: result[0]._id}
      res.json({code: 200, message: '登陆成功'})
    }
  } catch(err) {
    throw new Error(err)
  }
})
// ---replace--- Mysql

module.exports = router