console.log("c star")
require('./a.js')
console.log("c end")

//導出 function
exports.add = function(x, y) {
        return x + y
    }
    //導出 ban = 99
var ban = 99
exports.ban = ban