const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

module.exports = (email, subject, text) => {
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: subject,
        text
    };
    return sgMail.send(msg);
};