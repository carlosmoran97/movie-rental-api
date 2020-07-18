const express = require('express');
const router = express.Router();
const movies = require('./controllers/movies');

router.get('/api/v1/movies', movies.find);
router.get('/api/v1/movies/:id', movies.findById);
router.post('/api/v1/movies', movies.create);
router.put('/api/v1/movies/:id', movies.update);
router.delete('/api/v1/movies/:id', movies.delete);

module.exports = router;