// Import the necessary modules here
import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (user) => {
  // Write your code here

  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.STORFLEET_SMPT_MAIL,
      pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.STORFLEET_MAIL,
    to: user.email,
    subject: "Welcome to SotreFleet",
    // use table because gmail not support some css property
    html: `
    <table style="width: 100%; background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
      <tr>
        <td>
          <img src="https://files.codingninjas.in/logo1-32230.png" alt="Storefleet logo" style="width: 150px; border-radius: 5px;" />
        </td>
      </tr>
      <tr>
        <td>
          <h1 style="color: rgb(13, 83, 129); font-size: 24px;">Welcome to Storefleet</h1>
        </td>
      </tr>
      <tr>
        <td>
          <p style="font-size: 16px; line-height: 1.5; color: #333;">Hello, <strong>${user.name}</strong></p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Thank you for registering with Storefleet. We're excited to have you as a new member of our community.
          </p>
          <a href="#" style="text-decoration: none; background-color: #0d5381; color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px; font-weight: bold;">
            Get Started
          </a>
        </td>
      </tr>
    </table>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error while sending email:", err);
  }
};
