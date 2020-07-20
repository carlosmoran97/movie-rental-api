const RentLog = require('../models/rentlog');

// ================================================
// Log of all rents. Who bought, how many and when
// ================================================
module.exports = (user, count) => {
    RentLog.create({
        UserId: user.id,
        message: `${user.name} (with ID ${user.id}) rented ${count} movie(s) at ${new Date()}`
    });
};