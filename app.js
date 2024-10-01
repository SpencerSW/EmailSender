const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const app = express();
const port = 1234;

console.log(process.env.MAILTRAP_USER)
console.log(process.env.MAILTRAP_PASS)

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

// Email sending route
app.post('/send-email', (req, res) => {
    const emailType = req.body.type;
    let mailOptions = {
        from: 'spencermclaughlinsw@gmail.com',
        to: 'spencermclaughlin9@gmail.com',
    };

    if (emailType === 'email1') {
        mailOptions.subject = 'Email 1';
        mailOptions.text = 'This is the content of email 1';
    } else if (emailType === 'email2') {
        mailOptions.subject = 'Email 2';
        mailOptions.text = 'This is the content of email 2';
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
