const expressConfig = require('./express.config.js')
const koaConfig = require('./koa.config.js')
const mongodbConfig = require('./mongodb.config.js')
const mysqlConfig = require('./mysql.config.js')
const config = require('../config')
let packageJson = require('./template.package.js')

function mergeOptions(target, ...args) {
  args.forEach(item => {
    Object.keys(item).forEach(key => {
      if (typeof target[key] === 'object') {
        mergeOptions(target[key], item[key])
      } else {
        target[key] = item[key]
      }
    })
  })
}

mergeOptions(packageJson, config.framework === 'koa' ? koaConfig : expressConfig, 
  config.database ? (config.database === 'mysql' ? mysqlConfig : mongodbConfig) : {})

module.exports = packageJson