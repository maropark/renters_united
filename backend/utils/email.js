const nodemailer = require("nodemailer");

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use the email service you prefer
  auth: {
    user: "your_email@gmail.com",
    pass: "your_email_password",
  },
});

/**
 * Sends a verification email to the user
 * @param {Object} user - The user object containing email and name
 * @param {string} token - The email verification token
 */
const sendVerificationEmail = (user, token) => {
  const url = `http://localhost:3000/api/users/verify-email?token=${token}`;

  transporter.sendMail(
    {
      to: user.email,
      subject: "Verify your email",
      html: `<h4>Welcome, ${user.first_name}</h4><p>Please verify your email by clicking <a href="${url}">this link</a>.</p>`,
    },
    (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};

// Export the function for use in other modules
module.exports = {
  sendVerificationEmail,
};
