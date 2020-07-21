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

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: Movies managment
 */
/**
 * @swagger
 * path:
 *  /movies:
 *    get:
 *      summary: Get a paginated list of products. Can be ordered by title or likes. You can search a movie by title. If you are an admin user you can filter movies by availability/unavailability.
 *      security:
 *        - bearerAuth: []
 *      tags: [Movies]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: The page number that you want to get
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *          description: The limit of movies in the page
 *        - in: query
 *          name: order_by
 *          schema:
 *            type: string
 *            enum: [title,-title,likes,-likes]
 *          description: The list of movies can be ordered by title or likes, ascendant or descendant
 *        - in: query
 *          name: availability
 *          schema:
 *            type: boolean
 *          description: true if you want the available movies, false if you want the unavailable movies. Empty if you want all the movies
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *          description: Title of a movie that you are looking for
 *      responses:
 *        "200":
 *          description: Return a page of movies
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PageOfMovies'
 *        "400":
 *          description: The token has experied or have been added to a deny list
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/api/v1/movies', authenticate(), movies.find);
/**
 * @swagger
 * path:
 *  /movies/{id}:
 *    get:
 *      summary: Get the detail of a movie
 *      tags: [Movies]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The movie ID
 *      responses:
 *        "200":
 *          description: The detail of a movie
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Movie'
 *        "404":
 *          description: Movie not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
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
  *         "400":
  *           description: Wrong email or password
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#/components/schemas/ErrorResponse'
  *         "404":
  *           description: User not found
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#/components/schemas/ErrorResponse'
  *         "500":
  *           description: Internal server error
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#/components/schemas/ErrorResponse'
  */
router.post('/api/v1/login', users.login);

/**
 * @swagger
 * path:
 *  /register:
 *    post:
 *      summary: Register a new user with 'User' role
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterRequestBody'
 *      responses:
 *        "200":
 *          description: The user was registered.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/api/v1/register', users.register);
/**
 * @swagger
 * path:
 *  /logout:
 *    post:
 *      summary: Logout a user by invalidating the token
 *      security:
 *        - bearerAuth: []
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: User was logged out
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SuccessResponse'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
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