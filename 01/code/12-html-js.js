// 1.結合 fs 發送文件中的數據
// 2.Content-Type
// https://tool.oschina.net/commons
//	不同的資源對應的 Content-Type 是不一樣的
//  圖片不需要指定代碼
//	一般只為字符數據才指定編碼
//
//

var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function(req, res) {
    var url = req.url
    console.log(url)
    if (url === '/') {
        fs.readFile('./resource/index.html', function(err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end("您要的文件並不存在！")
            } else {
                console.log("文件讀取成功")
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                res.end(data)
            }
        })
    } else if (url === '/jpg') {
        fs.readFile('./resource/animate.jpg', function(err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end("您要的文件並不存在！")
            } else {
                console.log("文件讀取成功")
                res.setHeader('Content-Type', 'image/jpeg')
                res.end(data)
            }
        })
    }
})

server.listen(80, function() {
    console.log("server running ...")
})