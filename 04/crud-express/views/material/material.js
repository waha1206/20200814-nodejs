//封裝提取數據，只關心數據，其他的不關心
/**
 * 提取所有學生列表
 * return []
 */
var fs = require('fs')
var dbPath = './views/material/db.json'

exports.find = function(callback) {
    // 如果成功 err = null
    // 如果失敗 err = 對象
    // 如果成功 data = 數組
    // 如果失敗 data = undefined
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            console.log(err)
            return callback(err)
        }
        callback(null, JSON.parse(data).material)
    })
}


/**
 *添加保存學生資料
 */
exports.save = function(bodyString, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        // JSON.parser = 文字轉換成 物件
        // JSON.stringfly = 把物件轉成文字
        var material = JSON.parse(data).material // 轉成數組，最後那個 .material 是把JSON前面的 KEY，parse取出後面的值 value，array的數組
        bodyString.id = material[material.length - 1].id + 1
        console.log(material) // 這時候的 material 是一個數組
        material.push(bodyString)
            //把 push 新資料的 數組 前面加上 KEY 轉換成 字符串的格式，準備寫進檔案裏面
        var fileData = JSON.stringify({
            material: material
        })
        console.log(fileData)
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 更新學生資料
 *
 */
exports.updateById = function(materialBody, callback) {
    // 要注意 POST 拿到的 req.body 他會是字串！搞死人喔 要用 parseInt
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        //注意 這裡記得把 id 統一轉換成為數字類型
        materialBody.id = parseInt(materialBody.id)

        //找到資料庫裏面的該筆資料
        var materialObj = JSON.parse(data).material
            //res 會指向 該數組中的 比對到 id 的 那個 物件 (obj) --- 很重要
            //此時，更改 res 裡面的數值，會連帶影響到 materialObj 此 數組 --- 超重要
        var res = materialObj.find(function(item) {
            //materialBody.id 此資料是使用 post 裡面的 req.body 取得，是字串，沒轉成 int 的話就GG了
            return item.id === materialBody.id
        })
        for (var key in materialBody) {
            console.log(materialBody[key])
            console.log(res[key])
            res[key] = materialBody[key]
        }
        // console.log('---- res ----')
        // console.log(res)

        // console.log('---- materialBody ----')
        // console.log(materialBody)

        console.log('---- materialObj ----')
        console.log(materialObj)

        var fileData = JSON.stringify({
            material: materialObj
        })

        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            // 成功的話，就是沒錯，所以報錯對象是 null
            callback(null)
        })
    })
}

/**
 * 根據ID獲取商品對象
 */
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var materials = JSON.parse(data).material
        var res = materials.find(function(item) {
            return item.id == parseInt(id)
        })
        callback(null, res)
    })
}


/**
 * 刪除學生資料
 */
exports.deleteById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var materialObj = JSON.parse(data).material

        // findIndex 方法專門用來根據條件查找元素的下標
        var deleteId = materialObj.findIndex(function(item) {
                return item.id === parseInt(id)
            })
            // 從數組中刪除 參數1 的 下標 (透過 findIndex 找到 下標 0 1 2 3 4 順序會找到)
            // 參數2 從下標處要刪除幾個數組中的元素
        materialObj.splice(deleteId, 1)

        console.log('============================')
        console.log(id)
        console.log(deleteId)
            // console.log(materialObj)

        var fileData = JSON.stringify({
            material: materialObj
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}