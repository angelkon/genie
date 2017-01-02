/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res) {
    fs.readFile(__dirname + "/../../data/user.json", 'utf8', function (err, data) {
        // console.log(data);
        res.end(data);
    });
});

router.get('/:username', function (req, res) {
    fs.readFile(__dirname + "/../../data/user.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        res.json(users[req.params.username]);
    });
});

router.post('/:username', function (req, res) {
    // session 정보를 확인하여 로그인 되어 있으며 권한이 존재하는 경우에 한해서 사용자를 추가한다.
    var sess = req.session;

    var result = {};
    var username = req.params.username;

    // CHECK REQ VALIDITY
    if (!req.body["password"] || !req.body["name"]) {
        result["success"] = 0;
        result["error"] = "invalid request";
        res.json(result);
        return;
    }

    // LOAD DATA & CHECK DUPLICATION
    fs.readFile(__dirname + "/../../data/user.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        if (users[username]) {
            // DUPLICATION FOUND
            result["success"] = 0;
            result["error"] = "duplicate";
            res.json(result);
            return;
        }

        // ADD TO DATA
        users[username] = req.body;

        // SAVE DATA
        fs.writeFile(__dirname + "/../../data/user.json",
                JSON.stringify(users, null, '\t'), "utf8", function (err, data) {
            result = {"success": 1};
            res.json(result);
        });
    });
});


router.put('/:username', function (req, res) {

    var result = {};
    var username = req.params.username;

    // CHECK REQ VALIDITY
    if (!req.body["password"] || !req.body["name"]) {
        result["success"] = 0;
        result["error"] = "invalid request";
        res.json(result);
        return;
    }

    // LOAD DATA
    fs.readFile(__dirname + "/../../data/user.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        // ADD/MODIFY DATA
        users[username] = req.body;

        // SAVE DATA
        fs.writeFile(__dirname + "/../../data/user.json",
                JSON.stringify(users, null, '\t'), "utf8", function (err, data) {
            result = {"success": 1};
            res.json(result);
        });
    });
});


router.delete('/:username', function (req, res) {
    var result = {};
    //LOAD DATA
    fs.readFile(__dirname + "/../../data/user.json", "utf8", function (err, data) {
        var users = JSON.parse(data);

        // IF NOT FOUND
        if (!users[req.params.username]) {
            result["success"] = 0;
            result["error"] = "not found";
            res.json(result);
            return;
        }

        // DELETE FROM DATA
        delete users[req.params.username];

        // SAVE FILE
        fs.writeFile(__dirname + "/../../data/user.json",
                JSON.stringify(users, null, '\t'), "utf8", function (err, data) {
            result["success"] = 1;
            res.json(result);
            return;
        });
    });
});

module.exports = router;
