// 移動出去成為 tpl.html
// var tplStr = `
// <!DOCTYPE html>
// <html lang="zh-TW">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
// <p>大家好，我叫：{{ name }}</p>
// <p>我今年 {{ age }} 歲</p>
// <h1>我來自 {{ province }}</h1>
// <p>我喜歡： {{ each hobbies }} {{ $value }} {{ /each }}</p>
// </body>
// </html>
// `

var http = require('http')
var template = require('art-template')
var fs = require('fs')

var server = http.createServer()
server.on('request', function(req, res) {
    fs.readFile('./tpl.html', function(err, data) {
        if (err) {
            return console.log('沒有發現檔案')
        }
        // 要特別注意 data 是二進制數據，所以一定要 toString() 轉換
        var ret = template.render(data.toString(), {
                name: 'leo',
                age: 18,
                province: '台北',
                hobbies: [
                    '寫程式',
                    '玩Game',
                    '吃美食'
                ],
                title: '個人信息'
            })
            //console.log(ret)
        res.end(ret)
    })


})

server.listen(80, function() {
    console.log('server is running ...')
})