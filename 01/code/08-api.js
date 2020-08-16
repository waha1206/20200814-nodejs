var os = require('os')
var path = require('path')

console.log(os.cpus())
console.log(os.totalmem() / (1024 * 1024))

console.log(path.sep)