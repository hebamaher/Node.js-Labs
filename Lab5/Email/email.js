
import nodemailer from "nodemailer";
import { template } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details
export async function sendEmail(email){
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "heba.maher.abdelrahman@gmail.com", // "test@gmail.com"
    pass: "xsmk efjg gzxq xgok", // test123, gmail --> application --> password 
  },
});

// Send an email using async/await
let emailToken = jwt.sign(email, "emailToken") // to prevent anyone from changing the email sent in the verify request url

  const info = await transporter.sendMail({
    from: '"From Note APP" <heba.maher.abdelrahman@gmail.com>',
    to: email,
    subject: "Welcome to Note App",
    // text: "Hello world?", // Plain-text version of the message
    html: template(emailToken), // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
}