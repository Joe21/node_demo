// =======================
// REQUIREMENTS
// =======================
var express = require('express');
var router = express.Router();
var books = require('../models/books.js');

// -----------------------
// INDEX
// -----------------------
router.get('/', function(req, res) {
	// Test Route
	// console.log('hello');
	// res.send('goodbye')

	var data = books;
	// console.log(data);
	// console.log(data.length);
	res.render('index.ejs', data);
});

// -----------------------
// NEW
// -----------------------
router.get('/new', function(req, res) {
	res.render('new.ejs');
});

// -----------------------
// SHOW
// -----------------------
router.get('/:id', function(req, res) {
	// Test Route and params
	// console.log('oh fo sho');
	console.log(req.params.id);
	console.log(typeof req.params.id);

	// For loop to mimic database: find by matching ID and bring it back
	for(var i=0; i < books.data.length; i++) {
		if(books.data[i].id === parseInt(req.params.id)) {
			res.render('show.ejs', books.data[i]);
		}
	}
});

// -----------------------
// EDIT
// -----------------------
router.get('/:id/edit', function(req, res) {
	// Hacky way to get my specific book via id
	for(var i=0;i< books.data.length;i++) {
		if(books.data[i].id == req.params.id) {
			// Now that I got my specific book, send it to the ejs view
			res.render('edit.ejs', books.data[i])
		}
	}
});

// -----------------------
// UPDATE
// -----------------------
router.put('/:id', function(req, res) {
	req.body.id = parseInt(req.params.id);
	for(var i=0; i < books.data.length; i++){
		if (books.data[i].id == req.params.id) {
			books.data[i] = req.body;
		}
	}

	res.redirect('/books');
});


// -----------------------
// CREATE
// -----------------------
router.post('/', function(req, res) {
	// Don't stress on this, it's just a hacky way to mimic how a database will keep track
	//    of id's even when you delete them. This way ID's ALWAYS remain unique and can never be assigned twice.
	var max = -Infinity;
	for(var i=0; i < books.data.length; i++) {
		if(books.data[i].id > max) {
			max = books.data[i].id
		}
	}

	// Here's where we get the newest ID and assign it to the body
	//    The body at this point contains the object that we want to add. 
	req.body.id = max + 1;

	console.log('new book about to be added...');
	// console.log(req.body);
	books.data.push(req.body);

	// console.log(books.data);
	res.redirect('/books');
});


module.exports = router;
