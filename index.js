module.exports = function () {
    const argv = require('yargs')
        .option('p', {
            alias: 'path',
            default: '.',
            describe: 'the path of directory for the analyzer',
            type: 'string'
        })
        .command('dir', 'do the directory structure analysis', function (yargs) {
            return yargs.option('p', {
                alias: 'path',
                default: '.'
            })
        }, function (argv) {
            require('./lib/dir')(argv);
        })
        .command('file', 'do the file analysis', function (yargs) {
            return yargs.option('p', {
                alias: 'path',
                default: '.'
            }).option('f', {
                alias: 'file',
                demandOption: 'true'
            })
        }, function (argv) {
            require('./lib/file')(argv);
        })
        .usage('Usage: analyze [commands] [options]')
        .help('h')
        .alias('h', 'help')
        .argv;

    // is there a better solution or not ?
    !argv._.length && require('./lib/main')(argv);
}