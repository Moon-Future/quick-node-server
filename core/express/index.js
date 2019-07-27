const express = require('express')
const app = express()
const session = require('express-session') // session管理
const cors = require('cors') // 解决跨域
const bodyParser = require('body-parser') // 解析POST请求数据
const cookieParser = require('cookie-parser') // 第三方cookie操作模块，方便操作客户端中的cookie值
const path = require('path')
const test1 = require('./api/test1.js')
const test2 = require('./api/test2.js')

// ---replace--- Mongodb 若使用Mongodb数据库
const connect = require('./database/init')
;(async () => {
  await connect()
})()
// ---replace--- Mongodb

app.use(session({
  secret: '8023',
  resave: false,
  saveUninitialized: true
}))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist'))) // 部署上线时读取静态文件
app.use('/api/test1', test1);
app.use('/api/test2', test2);

app.listen(3000)
console.log('success listen at port:3000......')
