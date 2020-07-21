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
router.get('/', swaggerUi.setup(specs));

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
 *      summary: Get a paginated list of products. Can be ordered by title or likes, search a movie by title. Admins can filter movies by availability. No auth required
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
 *          schema:
 *            type: integer
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




/**
 * @swagger
 * path:
 *  /movies:
 *    post:
 *      summary: (Admin only) Create a new movie. Image (base64 encoded) is optional
 *      security:
 *        - bearerAuth: []
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateMovieRequestBody'
 *      responses:
 *        "200":
 *          description: Movie was created. Return the movie details
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Movie'
 *        "400":
 *          description: Token is not valid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "401":
 *          description: User role is unauthorized
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
router.post('/api/v1/movies', authorize(Role.Admin), movies.create);




/**
 * @swagger
 * path:
 *  /movies/{id}:
 *    put:
 *      summary: (Admin only) Update an existing movie
 *      security:
 *        - bearerAuth: []
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateMovieRequestBody'
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: integer
 *          required: true
 *          description: The movie ID
 *      responses:
 *        "200":
 *          description: Movie was updated. Return the movie details
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Movie'
 *        "400":
 *          description: Token is not valid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "401":
 *          description: User role is unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
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
router.put('/api/v1/movies/:id', authorize(Role.Admin), movies.update);




/**
 * @swagger
 * path:
 *  /movies/{id}:
 *    delete:
 *      summary: (Admin only) Delete an existing movie
 *      security:
 *        - bearerAuth: []
 *      tags: [Movies]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The movie ID
 *      responses:
 *        "200":
 *          description: Movie was deleted
 *        "400":
 *          description: Token is not valid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "401":
 *          description: User role is unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
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
router.delete('/api/v1/movies/:id', authorize(Role.Admin), movies.delete);




/**
 * @swagger
 * tags:
 *  name: MovieImage
 *  description: Update image of movies
 */
/**
 * @swagger
 * path:
 *  /movies/{id}/image:
 *    put:
 *      summary: (Admin Only) Update the image of a movie
 *      tags: [MovieImage]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - image
 *              properties:
 *                image:
 *                  type: string
 *                  format: bytes
 *                  description: A base encoded image
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The movie ID
 *      responses:
 *        "200":
 *          description: The image was updated
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  imageUrl:
 *                    type: string
 *                    description: URL of the image
 *        "400":
 *          description: Invalid token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "401":
 *          description: User role unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
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



/**
 * @swagger
 * path:
 *  /users/{id}/change-role:
 *    put:
 *      summary: (Admin only) change the role of a user
 *      security:
 *        - bearerAuth: []
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The ID of the user that you want ou change the role
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - role
 *              properties:
 *                role:
 *                  type: string
 *                  enum: [User, Admin]
 *                  description: New role of the user
 *      responses:
 *        "200":
 *          description: The role was successfuly updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SuccessResponse'
 *        "400":
 *          description: The token is invalid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "401":
 *          description: The role of the user is unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "404":
 *          description: The user was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "422":
 *          description: User role is not valid
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
router.put('/api/v1/users/:id/change-role', authorize(Role.Admin), users.changeRole);





/**
 * @swagger
 * path:
 *  /users/verification:
 *    post:
 *      summary: Confirm email address
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - token
 *                - email
 *              properties:
 *                token:
 *                  type: string
 *                  description: Verification token
 *                email:
 *                  type: string
 *                  format: email
 *      responses:
 *        "200":
 *          description: User role is not valid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SuccessResponse'
 *        "202":
 *          description: User role is not valid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SuccessResponse'
 *        "403":
 *          description: Verification failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "404":
 *          description: Token expired
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/api/v1/users/verification', users.confirmEmail);





/**
 * @swagger
 * tags:
 *  name: Sales
 *  description: Sales managment
 */
/**
 * @swagger
 * path:
 *  /sales:
 *    post:
 *      summary: (User only) buy a movie or movies
 *      security:
 *        - bearerAuth: []
 *      tags: [Sales]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateSaleRequest'
 *      responses:
 *        "200":
 *          description: The sale was created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Sale'
 *        "400":
 *          description: Token is not valid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "401":
 *          description: Role is unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "404":
 *          description: Movie not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "422":
 *          description: |
 *            Add at last one movie line.
 * 
 *            Movie line incomplete data.
 * 
 *            Movie is not available.
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
router.post('/api/v1/sales', authorize(Role.User), sales.create);




/**
 * @swagger
 * tags:
 *  name: Rents
 *  description: Rents managment
 */
/**
 * @swagger
 * path:
 *  /rents:
 *    post:
 *      summary: (User only) rent a movie or movies
 *      security:
 *        - bearerAuth: []
 *      tags: [Rents]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateRentRequest'
 *      responses:
 *        "200":
 *          description: The rent was created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rent'
 *        "400":
 *          description: Token is not valid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "401":
 *          description: Role is unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "404":
 *          description: Movie not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "422":
 *          description: |
 *            Add at last one movie line.
 * 
 *            Movie line incomplete data.
 * 
 *            Movie is not available.
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
router.post('/api/v1/rents', authorize(Role.User), rents.create);




/**
 * @swagger
 * path:
 *  /rents/{id}/return:
 *    put:
 *      summary: (User only) return rented movies. If there is a delay calculates a monetary penalty
 *      security:
 *        - bearerAuth: []
 *      tags: [Rents]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The rent ID
 *      responses:
 *        "200":
 *          description: Movies was returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  state:
 *                    type: string
 *                    description: Rent state
 *                  monetaryPenalty:
 *                    type: number
 *        "400":
 *          description: Token is not valid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "401":
 *          description: Role is unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "404":
 *          description: Rent not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "422":
 *          description: |
 *            Can't return other user rented movies
 * 
 *            Movies already returned
 * 
 *            Movies returned but penalty still not payed
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
router.put('/api/v1/rents/:id/return', authorize(Role.User), rents.returnMovie);



/**
 * @swagger
 * path:
 *  /rents/{id}/pay-monetary-penalty:
 *    put:
 *      summary: (User only) Pay monetary penalty
 *      security:
 *        - bearerAuth: []
 *      tags: [Rents]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The rent ID
 *      responses:
 *        "200":
 *          description: Monetary penalty was payed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SuccessResponse'
 *        "400":
 *          description: Token is not valid
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "401":
 *          description: Role is unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "404":
 *          description: Rent not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *        "422":
 *          description: |
 *            You cant't pay other user monetary penalty
 * 
 *            There is no penalty or movies are not already returned
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
router.put('/api/v1/rents/:id/pay-monetary-penalty', authorize(Role.User), rents.payMonetaryPenalty);



/**
 * @swagger
 * tags:
 *  name: Likes
 *  description: Movie likes
 */
/**
 * @swagger
 * path:
 *  /likes:
 *    post:
 *      summary: (User only) Add movie like
 *      tags: [Likes]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - movieId
 *              properties:
 *                movieId:
 *                  type: integer
 *                  description: The ID of the movie
 *      responses:
 *        "200":
 *          description: Like was added
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
router.post('/api/v1/likes', authorize(Role.User), likes.create);

module.exports = router;