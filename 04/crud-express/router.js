var fs = require("fs");
var Material = require("./views/material/material");
var express = require("express");

var router = express.Router();

// 舊的方法
// router.get('/', function(req, res) {
//     fs.readFile('./views/material/db.json', 'utf8', function(err, data) {
//         if (err) {
//             return res.status(500).send('Server error.')
//         }
//         //文件中的讀取到的數據一定是字符串
//         //所以這裡一定要手動轉成對象
//         console.log(JSON.parse(data).material)
//             // console.log(__dirname);
//         var material = JSON.parse(data).material
//         res.render('index.html', {
//             material: material
//         })
//     })
// })
router.get("/material", function(req, res) {
    Material.find(function(err, material) {
        if (err) {
            return res.status(500).send("File error");
        }
        res.render("./material/index.html", { material: material });
    });
});

router.get("/admin", function(req, res) {
    res.render("admin/index.html", {
        title: "後臺管理系統",
    });
});
// get = 渲染  post = 添加
// router.get('/material', function(req, res) {
//     res.render('material/index.html')
// })

//添加後渲染頁面
router.get("/material/new", function(req, res) {
    Material.find(function(err, material) {
        if (err) {
            return res.status(500).send("File error");
        }
        res.render("./material/new.html", { material: material });
    });
});

// 新增請求 -- 使用 post
router.post("/material/new", function(req, res) {
    //console.log(req.body)
    //新增流程
    // 1.獲取表單數據 -- 要掛載 body-parser
    // 2.處理
    //   將數據保存到db.json讓他持久化
    // 4.發送響應
    // 先讀取出來轉成對象
    // 然後往對象中 push 數據 --- 要放前面就使用 unshift
    // 然後把數據轉成字符串
    // 把字符串寫入文檔
    Material.save(req.body, function(err) {
        if (err) {
            return res.status(500).send("File error");
        }
        // res.render('./material/index.html', { material: material })
        res.redirect("/material");
    });
});

//編輯後 updateById 並且渲染頁面
router.post("/material/edit", function(req, res) {
    Material.updateById(req.body, function(err) {
            if (err) {
                return res.status(500).send("File error");
            }
            // res.render('./material/index.html', { material: material })
            res.redirect("/material");
        })
        // console.log(req.body)
})

//頁面編輯請求
router.get("/material/edit", function(req, res) {
    Material.findById(parseInt(req.query.id), function(err, material) {
        if (err) {
            res.send('server error.')
        }
        res.render('./material/edit.html', {
            material: material
        })
    })
})

//刪除原料資料

module.exports = router;