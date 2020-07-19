const express = require('express');
const router = express.Router();
const authorize = require('./middleware/authorize');
const authenticate = require('./middleware/authenticate');
const Role = require('./config/role');
const movies = require('./controllers/movies');
const movieImage = require('./controllers/movie-image');
const users = require('./controllers/users');
const sales = require('./controllers/sales');
const rents = require('./controllers/rents');
const likes = require('./controllers/likes');

// =============
// Movie routes
// =============
router.get('/api/v1/movies', authenticate(), movies.find);
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

// ============
// Rent routes
// ============
router.post('/api/v1/rents', authorize(Role.User), rents.create);
router.put('/api/v1/rents', authorize(Role.User), rents.returnMovie);
router.put('/api/v1/rents', authorize(Role.User), rents.payMonetaryPenalty);

// ===========
// Like routes
// ===========
router.post('/api/v1/likes', authorize(Role.User), likes.create);

module.exports = router;