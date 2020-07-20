const MovieUpdatesLog = require('../models/movieupdateslog');
// ========================================================================
// Save a log of the title, rentalPrice and sale price updates for a movie
// ========================================================================
module.exports = (title, rentalPrice, salePrice, movie) => {
    if (title || rentalPrice || salePrice) {
        if (movie) {
            MovieUpdatesLog.create({
                MovieId: movie.id,
                titleUpdate: title || movie.title,
                rentalPriceUpdate: rentalPrice || movie.rentalPrice,
                salePriceUpdate: salePrice || movie.salePrice,
                previousTitle: movie.title,
                previousSalePrice: movie.salePrice,
                previousRentalPrice: movie.rentalPrice
            });
        }
    }
};
