const sendMail = require('./send-mail');

module.exports = (email, token) => {
    return sendMail(email, 'Verify your email', `email: ${email} token: ${token}`);
};