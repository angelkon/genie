module.exports = function (app) {
    // Get all books
    app.get('/api/books', function (req, res) {
        res.end();
    });

    // Get single book
    app.get('/api/books/:book_id', function (req, res) {
        res.end();
    });
    
    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', function (req, res) {
        res.end();
    });

    // CREATE BOOK
    app.post('/api/books', function (req, res) {
        res.end();
    });

    // UPDATE THE BOOK
    app.put('/api/books/:book_id', function (req, res) {
        res.end();
    });

    // DELETE BOOK
    app.delete('/api/books/:book_id', function (req, res) {
        res.end();
    });

};