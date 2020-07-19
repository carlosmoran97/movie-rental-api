const jwt = require('express-jwt');
const secret = process.env.SECRET;

// ============================================================================
// Authenticate: attach user to request object, but doesn't care about the role
// can be anonymous, but if user provide token then authenticate.
// If you require user role then use authorize.
// ============================================================================
function authenticate(){
    return jwt({
        secret,
        algorithms: ['HS256'],
        credentialsRequired: false
    });
}

module.exports = authenticate;