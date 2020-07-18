const Movie = require('../models/movie');
const uploadFromBufer = require('../helpers/upload_from_buffer');
const updateImage = require('../helpers/update-image');

module.exports = {
    update: async (req, res) => {
        const { id } = req.params;
        const { image }= req.body;
        try{
            let imageId;
            const movie = await Movie.findByPk(id);
            if(!movie) {
                return res.status(404).json({
                    error: 'Movie not found'
                });
            }
            const imageFile = Buffer.from(image.split(',')[1], 'base64');
            if(!movie.image) {
                const result = await uploadFromBufer(imageFile);
                imageUrl = result.url;
            } else {
                const parts = movie.image.split('/');
                imageId = parts[parts.length - 1].split('.')[0];
                const result = await updateImage(imageId, imageFile);
                imageUrl = result.url;
            }
            await Movie.update({
                image: imageUrl
            },{ where: { id } });
            res.json({
                publicId: imageUrl
            });
        }catch(err) {
            res.status(500).send({
                error: err.message
            });
        }
    },
};