const path = require('path');
const fs = require('fs');
module.exports = function (argv) {
    fs.readFile(path.format({
        dir: process.cwd(),
        base: 'package.json'
    }), function (err, data) {
        if (err && err.code === 'ENOENT') {
            // no package.json in process.cwd()
            return console.error('hey buddy, you gotta do this inside the npm directory!');
        };

        console.log(data.toString());
    })
}