console.log('start...')

const fs = require('fs')
const path = require('path')
const package = require('./config/package.config.js')
const config = require('./config')
const targetPath = './server'
const sourcePath = './core'
let fileList = [config.framework === 'koa' ? 'koa' : 'express']
if (config.database) {
  fileList.push(config.database === 'mysql' ? 'mysql' : 'mongodb')
}
console.log(`框架: ${config.framework}, 数据库: ${config.database || '无'}`)

function clear(filePath) {
  let dirList = fs.readdirSync(filePath)
  dirList.forEach(function(item) {
    let file = path.resolve(filePath, item)
    let stats = fs.statSync(file)
    if (stats.isFile()) {
      fs.unlinkSync(file)
    } else if(stats.isDirectory() && item !== 'node_modules'){
      clear(file)
      fs.rmdirSync(file)
    }
  })
}

function copy(target, source) {
  let dirList = fs.readdirSync(source)
  dirList.forEach(function(item) {
    let sourceFile = path.resolve(source, item)
    let targetFile = path.resolve(target, item)
    let stats = fs.statSync(sourceFile)
    if (stats.isFile()) {
      let fileContent = fs.readFileSync(sourceFile, 'utf-8')
      if (fileContent.indexOf('---replace---') !== -1) {
        if (!config.database) {
          fileContent = fileContent.replace(/\/\/ ---replace--- Mongodb(.|\r\n)*---replace--- Mongodb/g, '')
          fileContent = fileContent.replace(/\/\/ ---replace--- Mysql(.|\r\n)*---replace--- Mysql/g, '')
        } else if (config.database === 'mysql') {
          fileContent = fileContent.replace(/\/\/ ---replace--- Mongodb(.|\r\n)*---replace--- Mongodb/g, '')
        } else {
          fileContent = fileContent.replace(/\/\/ ---replace--- Mysql(.|\r\n)*---replace--- Mysql/g, '')
        }
      }
      fs.writeFileSync(targetFile, fileContent, 'utf-8')
      // fs.createReadStream(sourceFile).pipe(fs.createWriteStream(targetFile))
    } else if(stats.isDirectory()){
      if (!fs.existsSync(targetFile)) {
        fs.mkdirSync(targetFile)
      }
      copy(targetFile, sourceFile)
    }
  })
}

if (!fs.existsSync(path.resolve(targetPath))) {
  fs.mkdirSync(path.resolve(targetPath))
}

clear(path.resolve(targetPath))
fileList.forEach(item => {
  copy(path.resolve(targetPath), path.resolve(`${sourcePath}/${item}`))
})

fs.writeFileSync(path.resolve('./server/package.json'), JSON.stringify(package, '', '\t'), 'utf-8')

console.log('end...')