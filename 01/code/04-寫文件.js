var fs = require('fs');

//成功 error = null
//失敗 error = 失敗對象
fs.writeFile("../data/你好.txt", "大家好，給大家介紹一下，我是Node.js", function(error) {
    console.log("文件寫入成功");
    console.log(error);
})