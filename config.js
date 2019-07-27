const frameworkOptions = ['koa', 'express']
const databaseOptions = ['mysql', 'mongodb']

module.exports = {
  framework: frameworkOptions[0],
  database: databaseOptions[0]  // false 不使用数据库
}