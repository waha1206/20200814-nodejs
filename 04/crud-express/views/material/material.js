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
    fs.readFile(dbPath, function(err, data) {
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
exports.save = function() {

}

/**
 * 更新學生資料
 */
exports.update = function() {

}


/**
 * 刪除學生資料
 */
exports.delete = function() {

}