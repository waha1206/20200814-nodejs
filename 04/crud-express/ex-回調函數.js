function fn(x, y, callback) {
    setTimeout(function() {
        var num = x + y
        return callback(num)
    }, 1000)
}

//這種是使用命名函數
function callback(ret) {
    console.log(ret)
}

fn(10, 20, callback)

// 另外一種寫法，就是寫匿名函數
fn(10, 20, function(ret) {
    console.log(ret)
})