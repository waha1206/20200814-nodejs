var fs = require('fs')
var http = require('http')
var template = require('art-template');
const { title } = require('process');
var server = http.createServer()

var wwwDir = 'D:/Dropbox/nodejs/20200815-home-nodejs/02/www';

server.on('request', function(req, res) {
    // 取得 request.url
    var url = req.url;
    console.log(url)
    fs.readFile('./template-apache.html', function(err, data) {
        if (err) {
            return res.end('404 Not Found. -- template-apache')
        }
        fs.readdir(wwwDir, function(err, files) {
            if (err) {
                // 不在，返回 404
                return res.end('404 not found.')
            }
            // 找到了，把資料返回給客戶端
            var htmlStr = template.render(data.toString(), {
                title: '哈哈',
                files: files
            })
            res.end(htmlStr)
        })
    })
})

server.listen(80, function() {
    console.log('server running ...')
})