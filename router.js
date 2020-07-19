const express = require('express');
const router = express.Router();
const authorize = require('./middleware/authorize');
const Role = require('./config/role');
const movies = require('./controllers/movies');
const movieImage = require('./controllers/movie-image');
const users = require('./controllers/users');
const sales = require('./controllers/sales');

// =============
// Movie routes
// =============
router.get('/api/v1/movies', movies.find);
router.get('/api/v1/movies/:id', movies.findById);
router.post('/api/v1/movies', authorize(Role.Admin), movies.create);
router.put('/api/v1/movies/:id', authorize(Role.Admin), movies.update);
router.delete('/api/v1/movies/:id', authorize(Role.Admin), movies.delete);

// ============
// Movie image
// ============
router.put('/api/v1/movies/:id/image', authorize(Role.Admin), movieImage.update);

// ============
// User routes
// ============
router.post('/api/v1/login', users.login);
router.post('/api/v1/register', users.register);

// ===========
// Sale routes
// ===========
router.post('/api/v1/sales', authorize(Role.User), sales.create);

module.exports = router;