const redis = require('../config/redis');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1] || req.params.token;
    if (!token) {
        return res.status(401).send({
            status: 401,
            error: 'You need to Login',
        });
    }
    try {
        redis.lrange('token', 0, -1, function(err, data){
            if(err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            if(data.indexOf(token) > -1) {
                return res.status(400).json({
                    status: 400,
                    error: 'Invalid token'
                });
            }
            next();
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};