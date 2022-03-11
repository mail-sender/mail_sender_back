const log = require('../config/logger');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config').key;
const JWT_OPTIONS = require('../config').option;
const nodemailer = require('nodemailer');


// mail > send
exports.sendMail = async function(req, res) {

    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const contents = req.body.contents;
    const cc = req.body.cc;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: sender.smtp_server,
        secure: false,
        port: sender.port,
        auth: {
            user: sender.email,
            pass: sender.password
        }
    })

    let info = transporter.sendMail({
        from: `${sender.name} <${sender.email}>`,
        to: `${receiver.name} <${receiver.email}>`,
        // cc: ,
        // bcc : ,
        subject: contents.title,
        text: contents.main_txt,
        // html: ,
        // attachments: []
    });

    res.json({ status: 'send_mail', message: "send_email_success" })
}
