var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

router.get('/', function (req, res) {
    var result = {};
    exec("df", function (error, stdout, stderr) {
        result['success'] = 1;
        result['stdout'] = stdout;
        if (error !== null) {
            result['success'] = 0;
            result['error'] = error;
            result['stderr'] = stderr;
        }
        res.json(result);
    });
});

module.exports = router;