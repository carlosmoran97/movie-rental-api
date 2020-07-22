const sendMail = require('./send-mail');

module.exports = (email, token) => {
    return sendMail(email, 'Password recovery', `email: ${email} token: ${token}`);
};
