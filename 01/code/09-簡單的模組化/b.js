console.log("b star")
var res = require('./c.js')
console.log("b end")
console.log(res.add(20, 50))
console.log(res.ban)

var fs = require('fs')
const { stringify } = require('querystring')

fs.readFile('./c.js', function(error, data) {
    if (error) {
        console.log("讀取文件失敗")
    } else {
        console.log(data.toString())
    }
})