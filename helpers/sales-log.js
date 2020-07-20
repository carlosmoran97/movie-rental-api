const SaleLog = require('../models/salelog');

// ================================================
// Log of all sales. Who bought, how many and when
// ================================================
module.exports = (user, count) => {
    SaleLog.create({
        UserId: user.id,
        message: `${user.name} (with ID ${user.id}) bought ${count} movie(s) at ${new Date()}`
    });
};