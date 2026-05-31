import nodemailer, { createTransport } from "nodemailer";
import dotenv from "dotenv";
import {findByIdAndUpdate} from "../src/models/bookFunModel.js";
import { updateDonationOnMail } from "../src/models/donationModel.js";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async ({ id, to, subject, html }) => {
  
  try {

    await transporter.verify();

    console.log("SMTP Connected");

    const info = await transporter.sendMail({
      from: `"Book Fund" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Mail Sent:", info.messageId);
findByIdAndUpdate(id)
    return info;

  } catch (error) {

    console.log("Email Error:", error);
    throw error;
  }
};

//send mail

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }

})

const sendMail = async({id, to, subject, html}) => {
  console.log("smtpppp", process.env.SMTP_USER);
  
  try {
     const updated = await updateDonationOnMail(id);

    if (!updated) {
      throw new Error("DB update failed, email not sent");
    }
    const info = await transport.sendMail({
      from: `"Book Fund" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    })
    return info;
  } catch (error) {
    console.log(error);
    throw(error);
    
  }
}

export { sendEmail, sendMail };