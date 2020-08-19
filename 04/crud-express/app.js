var fs = require('fs')
var router = require('./router')
var express = require('express')

var app = express()

//如果想要修改默認的 views 目錄可以使用  app.set('views', render函數的默認路徑，如 './public')

app.engine('html', require('express-art-template'));

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

// 要解析 post 必須要安裝 body-parser
//http://expressjs.com/en/resources/middleware/body-parser.html
// 一定要在 app.user(router) 掛載路由之前
//裝好之後，req.body 可以使用  body 的屬性會在安裝完 body-parser 後出現
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)

app.listen(3000, function() {
    console.log('server running ...')
})