/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function (req, res) {
    var sess;
    sess = req.session;

    fs.readFile(__dirname + "/../../data/user.json", "utf8", function (err, data) {
        var users = JSON.parse(data);
        var username = req.body['username'];
        var password = req.body['password'];
        var result = {};
        if (!users[username]) {
            // username not found
            result["success"] = 0;
            result["error"] = "not found";
            res.json(result);
            return;
        }
        if (users[username]["password"] === password) {
            result["success"] = 1;
            sess.username = username;
            sess.name = users[username]["name"];
            res.json(result);
        } else {
            result["success"] = 0;
            result["error"] = "incorrect";
            res.json(result);
        }
    });
});

router.delete('/', function (req, res) {
    var sess = req.session;
    var result = {};
    if (sess.username) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                result["success"] = 1;
                res.json(result);
            }
        });
    } else {
        result["success"] = 1;
        result["message"] = "no auth user";
        res.json(result);
    }
});

module.exports = router;
