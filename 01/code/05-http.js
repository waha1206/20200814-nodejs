// 共四個步驟
// 1.引入 http
var http = require("http")
    // 2.創建一個http server
var server = http.createServer()
    // 3.賦予request(接收請求)事件，回調函式發送回饋
    // 等待客戶端請求
server.on("request", function() {
        console.log("收到客戶端的請求了")
    })
    // 4.啟動server 設定端口號
server.listen(3000, function() {
    console.log("伺服器已經啟用成功了，可以通過 http://127.0.1:300/ 來訪問")
})