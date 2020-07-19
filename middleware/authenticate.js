const jwt = require('express-jwt');
const secret = process.env.SECRET;

// ===========================================================================
// Authenticate attach user to request object, but doesn't care about the role
// ===========================================================================
function authenticate(){
    return jwt({ secret, algorithms: ['HS256'] });
}

module.exports = authenticate;