// 共四個步驟
// 1.引入 http
var http = require("http")
    // 2.創建一個http server
var server = http.createServer()
    // 3.賦予request(接收請求)事件，回調函式發送回饋
    // 等待客戶端請求
    // 需要接收兩個參數
    // Request 請求對象，可以用來獲取客戶端的一些請求信息，例如請求路徑
    // Response 響應對象，可以用來給客戶端發送響應消息
server.on("request", function(request, response) {
        console.log("收到客戶端的請求了請求路徑是：" + request.url)
            // response 對象有一個方法： write 可以用來給客戶端封送響應數據
            // write 可以使用多次，但是最後一次一定要使用end來結束響應，不然客戶端會一值等待
        response.write("hello")
        response.write("  nodejs")
        response.write("\n")

        response.write("中文可以嗎？")
        response.end()
    })
    // 4.啟動server 設定端口號
server.listen(3000, function() {
    console.log("伺服器已經啟用成功了，可以通過 http://127.0.1:300/ 來訪問")
})