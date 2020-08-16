var http = require('http')
var server = http.createServer()

server.on('request', function(req, res) {

    // plain 普通文本
    // html 就是 html
    if (req.url === '/plain') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            //res.setHeader('Content-Type', 'charset=utf-8')
        res.end('hello 世界')
    } else if (req.url === '/html') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<p>Hello Html <a href="http://google.com">點我</a></p>')
    }

})

server.listen(3000, function() {
    console.log('server running ...')
})