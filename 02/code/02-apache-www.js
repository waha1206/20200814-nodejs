var fs = require('fs')
var http = require('http')
var server = http.createServer()

var wwwDir = 'D:/Dropbox/nodejs/20200815-home-nodejs/02/www';

server.on('request', function(req, res) {
    // 取得 request.url
    var url = req.url;
    // 先假設傳回來的是 '/' 所以預設是 index.html
    var filePath = '/index.html'
        // 如果不是請求 index.html 服務
    if (url !== '/') {
        // 那麼，就重新設定要取得的服務
        filePath = url
    }

    // 去檢查客戶端要的檔案有沒有在？
    fs.readFile(wwwDir + filePath, function(err, data) {
        if (err) {
            // 不在，返回 404
            res.end('404 not found.')
                // 然後離開，只回應一次
            return
        }
        // 找到了，把資料返回給客戶端
        res.end(data)
    })

})

server.listen(80, function() {
    console.log('server running ...')
})