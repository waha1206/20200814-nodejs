var fs = require('fs')
var express = require('express')

var router = express.Router()


router.get('/', function(req, res) {
    fs.readFile('./db.json', 'utf8', function(err, data) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        //文件中的讀取到的數據一定是字符串
        //所以這裡一定要手動轉成對象
        console.log(JSON.parse(data).material)
        console.log(__dirname);
        var material = JSON.parse(data).material
        res.render('index.html', {
            material: material
        })
    })

})

router.get('/admin', function(req, res) {
    res.render('admin/index.html', {
        title: '後臺管理系統'
    })
})

module.exports = router