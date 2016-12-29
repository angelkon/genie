var exec = require('child_process').exec,
    child;

child = exec("df", function (error, stdout, stderr) {
    console.log('stdout: ');
    console.log(stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
