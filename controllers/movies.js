const Movie = require('../models/movie');
const uploadFromBufer = require('../helpers/upload_from_buffer');

module.exports = {
    // ==============
    // Get products 
    // ==============
    find: async (req, res) => {
        // Get all products
        // only admin can switch between available/unavailable products
        // paginated
        const { page = 1, limit = 10 } = req.query;
        try {
            const movies = await Movie.findAndCountAll({
                limit,
                offset: limit * (page - 1)
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
    create: async (req, res) => {
        // The image can be send as base64 encoded, but it you leave it alone
        // a default image url will be saved
        const { title, description, rentalPrice, salePrice, availability, stock, image } = req.body;
        let imageUrl;
        try {
            if(!image) {
                imageUrl = null;
            } else {
                // Upload to cloudinary
                const imageFile = Buffer.from(image.split(',')[1], 'base64');
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
    update: async (req, res) => {
        // For updating image use PUT /movies/:id/image endpoint
        const { id } = req.params;
        const { title, description, rentalPrice, salePrice, availability, stock } = req.body;
        try {
            await Movie.update({
                title,
                description,
                rentalPrice,
                salePrice,
                availability,
                stock
            },{ where: { id } });
            const movie = await Movie.findByPk(id);
            if(!movie) {
                return res.status(404).json({
                    error: 'Movie not found'
                });
            }
            res.json(movie);
        }catch(err){
            res.status(500).json({
                error: err.message
            });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try{
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
};
