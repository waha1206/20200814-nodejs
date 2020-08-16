var url = require('url')

var log = url.parse('/pinglun?name=小羊羊&message=咩咩咪教的', true)

console.log(log)
console.log('pathname：' + log.pathname)

console.log('port：' + log.port)
console.log('search：' + log.search)
console.log(log.query)
console.log(log.query['name'])
console.log(log.query['message'])