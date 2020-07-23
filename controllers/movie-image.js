const Movie = require('../models/movie');
const uploadFromBufer = require('../helpers/upload_from_buffer');
const updateImage = require('../helpers/update-image');
const { body, param, validationResult } = require('express-validator');
const errorsResponse = require('../helpers/errors-response');

// =====================
// Update a movie image
// =====================
module.exports = {
    update: async (req, res) => {
        const { id } = req.params;
        const { image }= req.body;
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({
                    error: errorsResponse(errors)
                });
            }
            let imageId;
            const movie = await Movie.findByPk(id);
            if(!movie) {
                return res.status(404).json({
                    error: 'Movie not found'
                });
            }
            const imageFile = Buffer.from(image.split(',')[1], 'base64');
            if(!movie.image) {
                // Image is empty, so we upload a new image
                const result = await uploadFromBufer(imageFile);
                imageUrl = result.url;
            } else {
                // Get the public ID of tje image
                // For example:
                // http://res.cloudinary.com/djeytlsy3/image/upload/v1595057216/obhhv0fzvaogp46hi05p.jpg -> obhhv0fzvaogp46hi05p
                const parts = movie.image.split('/');
                imageId = parts[parts.length - 1].split('.')[0];
                // Update the image
                const result = await updateImage(imageId, imageFile);
                imageUrl = result.url;
            }
            await Movie.update({
                image: imageUrl
            },{ where: { id } });
            res.json({
                imageUrl
            });
        }catch(err) {
            res.status(500).send({
                error: err.message
            });
        }
    },
    validate: (method) => {
        switch(method){
            case 'update_image': {
                return [
                    body('image', "Base64 encoded image is required").exists().isBase64(),
                    param('id', "Integer movie id is required").exists().isInt()
                ];
            }
        }
    },
};
