module.exports = function (app, fs) {

    app.get('/', function (req, res) {
        var sess = req.session;

        res.render('index', {
            title: "MY HOMEPAGE",
            length: 5,
            name: sess.name,
            username: sess.username
        });
    });
    
    var users = require('../apis/users');
    app.use('/users', users);
    
    var sessions = require('../apis/sessions');
    app.use('/sessions', sessions);
};