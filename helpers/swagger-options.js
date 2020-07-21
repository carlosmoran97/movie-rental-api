const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Movie Rental API",
            version: "1.0.0",
            description: "RESTFul API to manage a small movie rental",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/"
            },
            contact: {
                name: "Carlos Morán",
                url: "https://github.com/carlosmoran97",
                email: "carlosmoran.97cr@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1"
            },
            {
                url: "https://applaudo-movie-rental-v1.herokuapp.com/api/v1"
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
                errorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        }
                    },
                    example: {
                        message: 'Not found'
                    }
                }
            }
        },
    },
    apis: [
        "./models/user.js",
        "./controllers/users.js",
        "./router.js"
    ]
};

module.exports = options;