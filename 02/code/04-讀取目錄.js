var fs = require('fs')

var wwwDir = 'D:/Dropbox/nodejs/20200815-home-nodejs/02/www';

fs.readdir(wwwDir, function(err, files) {
    if (err) {
        console.log('目錄不存在')
    } else {
        console.log(files)
    }
})