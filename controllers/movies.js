const Movie = require('../models/movie');
const uploadFromBufer = require('../helpers/upload_from_buffer');
const Role = require('../config/role');
const { Op } = require("sequelize");
const movieUpdatesLog = require('../helpers/movie-updates-log');
const { param, query, body, validationResult } = require('express-validator');
const errorsResponse = require('../helpers/errors-response');

module.exports = {
    // ==============
    // Get products 
    // ==============
    /**
     * @swagger
     * components:
     *  schemas:
     *    PageOfMovies:
     *      type: object
     *      properties:
     *        rows:
     *          type: array
     *          items:
     *            $ref: '#/components/schemas/Movie'
     *        count:
     *          type: integer
     *          description: The number of total movies
     *        pages:
     *          type: integer
     *          description: The number of total pages
     *        previousPage:
     *          type: integer
     *        nextPage:
     *          type: integer
     */
    find: async (req, res) => {
        // Get all products
        // Can be ordered by title or popularity (asc or desc)
        // only admin can switch between available/unavailable products
        // can search by title
        // paginated
        const { page = 1, limit = 10, order_by = 'title', availability, title = '' } = req.query;
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({
                    error: errorsResponse(errors)
                });
            }
            const movies = await Movie.findAndCountAll({
                limit,
                offset: limit * (page - 1),
                order: [orderMoviesBy(order_by)],
                where: {
                    availability: whereAvailability(availability, req.user),
                    title: {
                        [Op.iLike]: `%${title}%`
                    }
                },
            });
            // Paginating
            const { count, rows } = movies;
            const pages = Math.ceil(count / limit);
            const previousPage = page - 1 > 0 ? page - 1 : null;
            const nextPage = page + 1 <= pages ? page + 1 : null;
            res.json({
                rows,
                count,
                pages,
                previousPage,
                nextPage
            });
        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },
    // ==================
    // Get a movie by ID
    // ==================
    findById: async (req, res) => {
        const { id } = req.params;
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({
                    error: errorsResponse(errors)
                });
            }
            const movie = await Movie.findByPk(id);
            if(!movie) {
                return res.status(404).json({
                    error: 'Movie not found'
                });
            }
            res.json(movie);
        } catch(err) {
            res.status(500).json({
                error: err.message
            });
        }
    },
    // ===================
    // Create a new movie
    // ===================
    /**
     * @swagger
     * components:
     *  schemas:
     *    CreateMovieRequestBody:
     *      type: object
     *      required:
     *        - title
     *        - description
     *        - rentalPrice
     *        - salePrice
     *        - availability
     *        - stock
     *      properties:
     *        id:
     *          type: integer
     *        title:
     *          type: string
     *        description:
     *          type: string
     *        rentalPrice:
     *          type: number
     *        salePrice:
     *          type: number
     *        availability:
     *          type: boolean
     *          description: Movies that are available to be selled or rented
     *        stock:
     *          type: integer
     *          description: The physical inventory of a movie
     *        image:
     *          type: string
     *          format: bytes
     *          description: base64 encoded image of the movie
     *      example:
     *        title: "Avengers: Endgame"
     *        description: "Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos, el malvado que diezmó el planeta y el universo."
     *        rentalPrice: 6.99
     *        salePrice: 19.99
     *        availability: true
     *        stock: 25
     */
    create: async (req, res) => {
        // The image can be send as base64 encoded, but can be empty
        const { title, description, rentalPrice, salePrice, availability, stock, image } = req.body;
        let imageUrl;
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({
                    error: errorsResponse(errors)
                });
            }
            if(!image) {
                imageUrl = null;
            } else {
                // Upload to cloudinary
                // I decided to use base64 format instead of multipart/orm-data to keep the json standard in
                // every endpoint.
                const imageFile = Buffer.from(image, 'base64');
                const result = await uploadFromBufer(imageFile);
                imageUrl = result.url;
            }
            const movie = await Movie.create({
                title,
                description,
                rentalPrice,
                salePrice,
                availability,
                stock,
                image: imageUrl
            });
            res.json(movie);
        }catch(err) {
            res.status(500).json({
                error: err.message
            });
        }
    },
    // =========================
    // Update an existing movie
    // =========================
    /**
     * @swagger
     * components:
     *  schemas:
     *    UpdateMovieRequestBody:
     *      type: object
     *      required:
     *        - title
     *        - description
     *        - rentalPrice
     *        - salePrice
     *        - availability
     *        - stock
     *      properties:
     *        id:
     *          type: integer
     *        title:
     *          type: string
     *        description:
     *          type: string
     *        rentalPrice:
     *          type: number
     *        salePrice:
     *          type: number
     *        availability:
     *          type: boolean
     *          description: Movies that are available to be selled or rented
     *        stock:
     *          type: integer
     *          description: The physical inventory of a movie
     *      example:
     *        title: "Avengers: Endgame"
     *        description: "Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos, el malvado que diezmó el planeta y el universo."
     *        rentalPrice: 6.99
     *        salePrice: 19.99
     *        availability: true
     *        stock: 25
     */
    update: async (req, res) => {
        // For updating image use PUT /movies/:id/image endpoint
        const { id } = req.params;
        const { title, description, rentalPrice, salePrice, availability, stock } = req.body;
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({
                    error: errorsResponse(errors)
                });
            }
            const movie = await Movie.findByPk(id);
            if(!movie) {
                return res.status(404).json({
                    error: 'Movie not found'
                });
            }
            await Movie.update({
                title,
                description,
                rentalPrice,
                salePrice,
                availability,
                stock
            },{ where: { id } });
            // Save log
            movieUpdatesLog(title, rentalPrice, salePrice, movie);
            res.json(movie);
        }catch(err){
            res.status(500).json({
                error: err.message
            });
        }
    },
    // ===============
    // Delete a movie
    // ===============
    delete: async (req, res) => {
        const { id } = req.params;
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({
                    error: errorsResponse(errors)
                });
            }
            Movie.destroy({ where: { id } }).then((value)=>{
                if(value == 0) {
                    return res.status(404).send({
                        error: 'Movie not found'
                    });
                }
                res.sendStatus(200);
            });
            
        }catch(err){
            res.status(500).json({
                error: err.message
            });
        }
    },
    validate: (method) => {
        switch(method){
            case 'find': {
                return [
                    query('page', 'Page must be a positive integer').optional().isInt({ min: 1 }),
                    query('limit', 'Limit must be a positive integer').optional().isInt({ min: 1 }),
                    query('order_by', 'order_by must be title, -title, popularity or -popularity').optional().isIn(['title','-title','popularity','-popularity']),
                    query('availability', 'Availability must be boolean').optional().isBoolean(),
                    query('title', 'Title must be a string').optional().isString()
                ];
            }
            case 'findById': {
                return [
                    param('id', 'id must be a positive integer').exists().isInt({ min: 1 })
                ];
            }
            case 'create': {
                return [
                    body('title', 'Title is required and must be a string').exists().isString(),
                    body('description', 'Description is required and must be a string').exists().isString(),
                    body('rentalPrice', 'rentalPrice is required and must be a positive number').exists().isFloat({ gt: 0 }),
                    body('salePrice', 'salePrice is required and must be a positive number').exists().isFloat({ gt: 0 }),
                    body('availability', 'availability is required and must be boolean').exists().isBoolean(),
                    body('stock', 'stock is required and must be greater or equal than zero').exists().isInt({ min: 0 }),
                    body('image', 'image must be base64 encoded image').optional().isBase64()
                ];
            }
            case 'update': {
                return [
                    param('id', 'id must be a positive integer').exists().isInt({ min: 1 }),
                    body('title', 'Title must be a string').optional().isString(),
                    body('description', 'Description must be a string').optional().isString(),
                    body('rentalPrice', 'rentalPrice must be a positive number').optional().isFloat({ gt: 0 }),
                    body('salePrice', 'salePrice positive number').optional().isFloat({ gt: 0 }),
                    body('availability', 'availability must be boolean').optional().isBoolean(),
                    body('stock', 'stock greater or equal than zero').optional().isInt({ min: 0 }),               
                ];
            }
            case 'delete': {
                return [
                    param('id', 'id must be a positive integer').exists().isInt({ min: 1 }),
                ];
            }
        }
    },
};

function orderMoviesBy(order) {
    switch(order) {
        case '-title':
            return ['title', 'DESC'];
        case 'popularity':
            return ['likes', 'DESC'];
        case '-popularity':
            return['likes', 'ASC'];
        case 'title':
        default:
            return ['title', 'ASC'];
    }
}

function whereAvailability(availability, user) {
    // If user is no authenticated (or is normal user) return available movies only
    if(!user || user.role === Role.User) {
        return true;
    }else if(user.role === Role.Admin) {
        // If user doesn't provide availability then return available/unavailable movies
        if(availability === undefined) {
            return {
                [Op.any]: [true, false]
            };
        }
        return availability;
    } 
}