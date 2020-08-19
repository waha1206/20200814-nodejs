// 會延遲的放前面
// 不會延遲的放後面

function fn(callback) {
    setTimeout(function() {
        var value = 100
        callback(value)
    }, 1000)
}



fn(function getValue(num) {
    console.log(num)
})