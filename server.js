// ======================
// REQUIREMENTS
// ======================
var express = require('express');
var	app = express();
var	logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 3000;


// ======================
// MIDDLEWARE
// ======================
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// ======================
// CONTROLLERS
// ======================
var booksController = require('./controllers/books.js');
app.use('/books', booksController);


// ======================
// LISTEN
// ======================
app.listen(port);
console.log('=============================');
console.log('Server running off PORT: ' + port);
console.log('=============================');