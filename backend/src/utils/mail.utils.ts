// utils/mail.util.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",      // your SMTP server
      port: 587,                     // port
      secure: false,                 // true for 465, false for other ports
      auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
      },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
      await transporter.sendMail({
            from: `"Pinoy Bites" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
      });
};