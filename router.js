const express = require('express');
const router = express.Router();
const movies = require('./controllers/movies');
const movieImage = require('./controllers/movie-image');
const users = require('./controllers/users');

// =============
// Movie routes
// =============
router.get('/api/v1/movies', movies.find);
router.get('/api/v1/movies/:id', movies.findById);
router.post('/api/v1/movies', movies.create);
router.put('/api/v1/movies/:id', movies.update);
router.delete('/api/v1/movies/:id', movies.delete);

// ============
// Movie image
// ============
router.put('/api/v1/movies/:id/image', movieImage.update);

// ============
// User routes
// ============
router.post('/api/v1/login', users.login);
router.post('/api/v1/register', users.register);

module.exports = router;