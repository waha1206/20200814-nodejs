//瀏覽器中的javascript 是沒有文件操作的能力的
//但是 node 中的 javascript 具有文件操作能力

//fs 是 file-system 的簡寫, 就是文件系統的意思
//在node 中如果想要進行文件操作,就必須引入 fs 這個合新模塊
//在fs這個核心模塊中，就提供了所有的文件操作相關api
//例如 fs.readFile 就是用來讀取文件的

// 1. 使用 require 方法加載fs核心模塊

var fs = require('fs');

// 2. 讀取文件
// 第一個參數是路徑
// 第二個參數是回調函數
// error
// 		如果讀取失敗， errro 就是錯誤對象
//		如果讀取成功， error 就是 null
// date
//		如果讀取成功， date 就是讀取到的資料
//		如果讀取失敗， error 就是錯誤對象
//
// 成功
// 	date 數據
// 	error null
// 失敗
// 	date null
// 	error 錯誤對象

fs.readFile('../data/hello1.txt', function(error, date) {
    //<Buffer 68 65 6c 6c 6f>
    //文件中都是二進制數據 - 轉成16進制了
    if (error) {
        console.log(error)
        if (error["errno"] == -4058) {
            console.log("找不到檔案")
        }
        return
    }
    console.log(date);

    //通過toString轉換成文字
    console.log(date.toString())
})