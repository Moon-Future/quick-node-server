# 快速搭建node后端服务

    基于Koa2、Express、Mysql、Mongodb快速搭建Node后端服务，实现前后端通讯。

## 目的
为不同 vue 项目快速搭建 node 后端服务，去除重复性工作；为刚入门的同行提供一个清晰的 node 服务搭建流程与模板

## 框架、数据库组合
在配置文件 ./config.js 中可自由设置组合，框架二选一，数据库二选一，也可不选  
- [ ] koa
- [ ] express
- [ ] mysql
- [ ] mongodb
```js
const frameworkOptions = ['koa', 'express']
const databaseOptions = ['mysql', 'mongodb']

module.exports = {
  framework: frameworkOptions[0],
  database: databaseOptions[0]  // false 不使用数据库
}
```

## 生成server文件夹
选择好框架、数据库后，运行 node build.js 生成server文件夹、package.json及相关代码文件

## 安装包
进入server文件夹，安装依赖包
```js
cd server\
npm install
```

## 运行服务
```js
node index.js
```

## 测试
直接打开 example 文件夹下 index.html，可测试与后台是否成功通讯

## 总结
```js
配置文件 config.js
node build.js
cd server\
npm install
node index.js
```

## PS
1、生成server文件夹后，就可以将server文件夹拷贝到项目中使用  
2、数据库要事先建立好

## 若有帮助，求颗 Star
[Github-quick-node-server](https://github.com/Moon-Future/quick-node-server)