var Client = require('ssh2').Client;

var conn = new Client();

var hostname = '';
var username = '';
var password = '';

if (process.argv.length === 5){
    hostname = process.argv[2];
    username = process.argv[3];
    password = process.argv[4];
} else {
    throw new Error("not enough arguments");
}


conn.on('ready', function () {
    console.log('Client :: ready');
    conn.shell(function (err, stream) {
        if (err)
            throw err;
        stream.on('close', function () {
            console.log('Stream :: close');
            conn.end();
        }).on('data', function (data) {
            console.log('STDOUT:\n' + data);
        }).stderr.on('data', function (data) {
            console.log('STDERR:\n' + data);
        });
        stream.end('sudo apt-get update -y && sudo apt-get upgrade -y\nexit\n');
    });
}).connect({
    host: hostname,
    port: 10022,
    username: username,
    password: password
});
 