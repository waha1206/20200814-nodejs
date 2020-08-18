// 0.安裝
// 1.引包

var express = require('express')
var bodyParser = require('body-parser')



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

// 2.創建你的服務器應用程序
// 也就是原來的 http.createServer

var app = express()
    //公開指定目錄 第一個參數是 URL的，第二個參數是 相對路徑的
    //如果省略的話，就直接去相對路徑找
    //app.use('/public/', express.static('./public/'))
    //可以開啟多個靜態的目錄


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(function(req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })

app.use(express.static('./public2/'))
app.use(express.static('./public/'))
app.engine('html', require('express-art-template'))

//如果要設定 views 的目錄 可以這樣做
//app.set('views', 妳要設定的目錄 ./xxxxx)

// 當服務器收到 GET 請求 / 的時候，執行 回調處裡函數
app.get('/', function(req, res) {
    // res.send('hello express')
    res.render('index.html', {
        comments: comments
    })
})
app.get('/post', function(req, res) {
    // res.send('hello express')
    res.render('post.html')
})
app.post('/post', function(req, res) {
    // res.send('hello express')
    console.log('收到表單請求了')
    console.log(req.body)
    var comment = req.body
    comment.dateTime = '2017-11-5 10:58:51'
    comments.unshift(comment)
    res.redirect('/')
        // res.render('post.html', comments)
})


app.get('/admin', function(req, res) {
    // res.send('hello express')
    res.render('admin/index.html', {
        title: "管理系統"
    })
})
app.get('/about', function(req, res) {
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    console.log(req.query)

    res.send('關於我')
})
app.get('/hello', function(req, res) {
    res.send(`
	<!DOCTYPE html>
	<html lang="zh-TW">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
		<script src='js/common-dom.js'></script>
		<style>

		</style>
	</head>

	<body>
		<h1>HELLO LEO</h1>
		<script>
		</script>
	</body>

	</html>

	`)
})



// 相當於監聽 server.listen
app.listen(3000, function() {
    console.log('app is running at port 3000.')
})