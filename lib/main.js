const path = require('path');
const fs = require('fs');

module.exports = function (argv) {
    fs.readFile(path.format({
        dir: path.normalize(argv.path),
        base: 'package.json'
    }), function (err, data) {
        console.log('');

        if (err && err.code === 'ENOENT') {
            // no package.json in process.cwd()
            return console.error('  hey buddy, you gotta do this inside the npm directory!');
        };

        const packageJsonData = JSON.parse(data.toString());
        if (packageJsonData.bin) {
            // could be a command-line application
            console.log('   this npm could be a command-line application!');

            if (typeof packageJsonData.bin == 'string') {
                console.log(`   try ${packageJsonData.name} in the bash, it will execute the ${packageJsonData.bin}`);
            } else {
                Object.keys(packageJsonData.bin).forEach(command => {
                    console.log(`   try ${command} in the bash, it will execute the ${packageJsonData.bin[command]}`);
                })
            }
        } else if (packageJsonData.main) {
            // the primary entry point
            console.log(`   the primary entry point for this npm  is ${packageJsonData.main}!`);
        } else if (packageJsonData.browser) {
            // isn't available in Node.js modules
            console.log('   this npm is not available in Node.js modules!');
            console.log(`   the primary entry point for this npm  is ${packageJsonData.browser}!`);
        } else {
            // no entry point found
            console.warn('  no entry point found!');
        }
    });
}