var http = require('http')
    // 1. 創建 Server
var server = http.createServer()

// 2. 監聽 Server 的 request 請求事件，設置請求處理函數

server.on('request', function(req, res) {
    var url = req.url
    console.log(url)
    if (url === '/') {
        res.end('hello world')
    } else {
        res.end('404 not found.')
    }
})

server.listen(3000, function() {
    console.log('server running...')
})