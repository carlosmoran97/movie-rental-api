const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
module.exports = redisClient;