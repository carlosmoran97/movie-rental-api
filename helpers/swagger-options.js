const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Movie Rental API",
            version: "1.0.0",
            description: "RESTFul API to manage a small movie rental",
            contact: {
                name: "Carlos Morán",
                email: "carlosmoran.97cr@gmail.com"
            }
        },
        servers: [
            {
                url: "https://applaudo-movie-rental-v1.herokuapp.com/api/v1"
            },
            {
                url: "http://localhost:3000/api/v1"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        }
                    },
                    example: {
                        error: 'Error message'
                    }
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        }
                    },
                    example: {
                        message: 'Success'
                    }
                }
            }
        },
    },
    apis: [
        "./models/user.js",
        "./controllers/users.js",
        "./models/movie.js",
        "./controllers/movies.js",
        "./models/sale.js",
        "./controllers/sales.js",
        "./models/rent.js",
        "./controllers/rents.js",
        "./router.js"
    ]
};

module.exports = options;