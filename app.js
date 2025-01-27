const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.prod' 
    : process.env.NODE_ENV === 'test' ? '.env.test' : '.env' 
});
const sequelize = require('./config/database');
const router = require('./router');
const redis = require('./config/redis');

// Connect to the database
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully');
})
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

// Redis
redis.on('connect', function () {
    console.log('Connected to redis');
});
redis.on('error', (error) => {
    console.log('Redis not connected', error)
});

// Initialize http server
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(router);
const port = process.env.PORT || 3000;
const host = '0.0.0.0';
const server = app.listen(port, host, () => {
    console.log(`App listening on port ${port}`);
});
if (process.env.NODE_ENV != 'test') {
    // Gracefuly shutdown server
    if (process.platform === "win32") {
        var rl = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on("SIGINT", function () {
            process.emit("SIGINT");
        });
    }

    process.on('SIGINT', () => {
        console.info('SIGINT signal received.');
        console.log('Closing http server.');
        server.close(() => {
            console.log('Http server closed');
            sequelize.close().then(() => {
                console.log('Sequelize connection closed');
                redis.quit(function (err, reply) {
                    console.log(`Quit redis ${reply}`);
                    process.exit(0);
                });
            });
        });
    });
}


module.exports = app;