// app application 應用程序
var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = [{
        name: '楊大大',
        message: '今天天氣好，陽光足',
        dateTime: '2020-8-16'
    },
    {
        name: '楊大大2',
        message: '今天天氣好，陽光足',
        dateTime: '2020-8-16'
    },
    {
        name: '楊大大3',
        message: '今天天氣好，陽光足',
        dateTime: '2020-8-16'
    },
    {
        name: '楊大大4',
        message: '今天天氣好，陽光足',
        dateTime: '2020-8-16'
    }
]

http.
createServer(function(req, res) {
    var parseObj = url.parse(req.url, true)
    var pathName = parseObj.pathname
    if (pathName === '/') {
        fs.readFile('./views/index.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            // res.setHeader('Content-Type', 'text/html; charset=utf-8')
            var htmlStr = template.render(data.toString(), {
                comments: comments
            })
            res.end(htmlStr)
        })
    } else if (pathName === '/post') {
        fs.readFile('./views/post.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })

    } else if (pathName.indexOf('/public') === 0) {
        console.log(pathName)
        fs.readFile('.' + pathName, function(err, data) {
            if (err) {
                console.log('404 Not Found.')
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (pathName === '/pinglun') {
        console.log('收到表單請求了', parseObj.query)
            // 下面這行會發送 JSON 去客戶端 -- 測試資料用的
            // res.end(JSON.stringify(poseObj.query))

        // 使用 url 模塊的 parse 方法把請求路徑中的查詢字符串解析成為一個對象 --- query
        // 所以接下來要做的有 3 點
        // 1. 獲取表單提交的數據 parseObj.query
        // 2. 將當前日期添加到數據對象中，然後儲存到數組中
        // 3. 讓用戶重定向跳轉到首頁 --- 因為數組已經變化了，所以客戶會看到新資料
        var comment = parseObj.query
        comment.dateTime = '2018-8-17'
        comments.unshift(comment)
            // 服務端已經把數據存好了，接下來是要讓用戶重新發送請求 / 葉面

        // 那個，如何通過服務端伺服器，讓客戶端重新定向呢？
        //  1. 設置狀態碼 302 臨時重新定向 301 為永久 --- 之後再說
        //     statusCode
        //  2. 在響應頭中通過 Location 告訴客戶端往哪裡重新定向
        //     setHeader 就是響應頭
        //  如果客戶端發現收到服務氣的響應狀態是 302 就會自訂去響應頭中找 Location
        //  然後，你就會看到客戶端自動跳轉了
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()

    } else {
        fs.readFile('./views/404.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found.')
            } else {
                res.end(data)
            }
        })
    }
}).
listen(3000, function() {
    console.log('server runninig ...')
})

// 整個流程，找時間，寫個案例，用下面的步驟
// 1. / 這個就是要給 index.html 用  parseObj.pahtName === '/'
// 2. 開放靜態資源資源 /public/ 這邊會需要  . + pathName  使用 fs 系統
//    當請求/public/xxxxx 的時候，讀取響應， public 目錄中的具體資源
//    有幾個會自己抓的要注意 href link img  大概就是 css js 圖片 這類的
// 3. /post post.html 當 a 連結 響應這個的時候，要抓到，然後 post
// 4. /pinglun
//    4.1 接收表單提交數據  name=xxxx  message=xxxx
//    4.1 儲存表單提交的數據 comments.unshift(comment)   時間的部分尚未做好
//    4.1 讓表單重新定向到  /
//        setHander('Location', '/')
//        statusCode = 302