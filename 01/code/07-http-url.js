var http = require("http")

var server = http.createServer();

server.on('request', function(req, res) {
    var url = req.url
    console.log("請求我的客戶端的IP:端口號是：", req.socket.remoteAddress, req.socket.remotePort)

    if (url === '/') {
        res.end("index page")
    } else if (url === '/login') {
        res.end("login page")
    } else if (url === '/product') {
        var products = [{
                name: "蘋果",
                price: 8888,
                sort: 1
            },
            {
                name: "華碩",
                price: 5421,
                sort: 2
            },
            {
                name: "ASUS",
                price: 1598,
                sort: 3
            }
        ]
        res.end(JSON.stringify(products))
    }

})

server.listen(80, function() {
    console.log("伺服器已經啟動 ...")
})