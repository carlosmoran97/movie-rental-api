const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

module.exports = (email, token) => {
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Verify your email',
        text: `email: ${email} token: ${token}`
    };
    return sgMail.send(msg);
};