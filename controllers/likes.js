const Like = require('../models/like');
const sequelize = require('../config/database');

module.exports = {
    create: async(req, res) => {
        const { movieId } = req.body;
        const userId = req.user.id;
        const t = await sequelize.transaction();
        try {
            const like = await Like.create({
                MovieId: movieId,
                UserId: userId
            }, { transaction: t });
            await t.commit();
            res.json({
                message: 'success'
            });
        }catch(err) {
            await t.rollback();
            res.status(500).json({
                error: err.message
            });
        }
    },
};