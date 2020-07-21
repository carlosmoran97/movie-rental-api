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
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./helpers/swagger-options');

const specs = swaggerJsdoc(swaggerOptions);
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, {
    explorer: true
}));

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

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User managment
 */

 /**
  * @swagger
  * path:
  *   /login:
  *     post:
  *       summary: Authenticate a user
  *       tags: [Users]
  *       requestBody:
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/LoginRequestBody'
  *       responses:
  *         "200":
  *           description: User details and a token
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#/components/schemas/LoginResponse'
  */
router.post('/api/v1/login', users.login);
router.post('/api/v1/register', users.register);
router.post('/api/v1/logout', users.logout);

// ===========
// Sale routes
// ===========
router.post('/api/v1/sales', authorize(Role.User), sales.create);

// ============
// Rent routes
// ============
router.post('/api/v1/rents', authorize(Role.User), rents.create);
router.put('/api/v1/rents/:id/return', authorize(Role.User), rents.returnMovie);
router.put('/api/v1/rents/:id/pay-monetary-penalty', authorize(Role.User), rents.payMonetaryPenalty);

// ===========
// Like routes
// ===========
router.post('/api/v1/likes', authorize(Role.User), likes.create);

module.exports = router;