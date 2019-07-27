const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  avatar: { type: String, default: '' },
  age: { type: Number, default: 18 },
  createTime: { type: Number, default: null },
  updateTime: { type: Number, default: null }
}, {
  collections: 'user'
})

module.exports = mongoose.model('User', userSchema, 'user')