var Client = require('ssh2').Client;
var conn = new Client();

var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    var sess;
    sess = req.session;

    var ssh = req.body;
    res.json(result);
    return;

    conn.on('ready', function () {
        console.log('Client :: ready');
        conn.shell(function (err, stream) {
            if (err) {
                throw err;
            }
            stream.on('close', function () {
                console.log('Stream :: close');
                conn.end();
            }).on('data', function (data) {
                console.log('STDOUT:\n' + data);
            }).stderr.on('data', function (data) {
                console.log('STDERR:\n' + data);
            });
            $.each(ssh.commands, function (idx, value) {
                stream.end(value + '\n');
            });
            stream.end('exit\n');
        });
    }).connect({
        host: ssh.hostname,
        port: ssh.port,
        username: ssh.username,
        password: ssh.password
    });
});

module.exports = router;
