// 默認會有一個 return module.exports
// 有一個索引會指向 modules.exports
// 此索引是 exports


exports.add = '加號'

// 這個會直接去改 默認值
// module.exports = function() {
//     console.log('hi')
// }

// 如果直接改 exports 的話，只是改變他的指向
// module.exports 不會因此受到影響

// 這種改法，加載方收到的值還是 '加號'
exports = "hello"

//另一個

//原本 exports 變成字串了
//斷開跟module.exports 的關係


module.exports = {
    foo: 'bar'
}

exports = module.exports

exports.bar = 'aaa'

//最後輸出 { foo:bar, bar:'aaa}
//總之。看最後一次的 module.exports 指向哪裡
//因為，return的，最後就是 modules.exports