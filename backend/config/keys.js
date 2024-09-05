module.exports = {
  secretOrKey: process.env.JWT_SECRET || 'secret',
  emailService: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
