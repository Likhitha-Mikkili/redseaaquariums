// redsea/backend/utils/notification.js

const nodemailer = require('nodemailer');

// Function to send email notifications
const sendEmailNotification = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME, // Use environment variables to keep sensitive information secure
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmailNotification,
};
