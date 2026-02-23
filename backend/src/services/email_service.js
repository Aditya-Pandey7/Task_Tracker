import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";
configDotenv();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Task Tracker Pro" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
