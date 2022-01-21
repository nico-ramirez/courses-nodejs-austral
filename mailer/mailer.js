const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'carroll.schimmel99@ethereal.email',
        pass: 'dhEzD8TgcfHMyQksQS'
    }
};

module.exports = nodemailer.createTransport(mailConfig);