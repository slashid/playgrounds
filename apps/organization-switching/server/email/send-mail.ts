import nodemailer from "nodemailer";
import { env } from "../env";

export const sendMail = async (to: string, subject: string, html: string) => {
  const { EMAIL_USER, EMAIL_APP_PASSWORD } = env()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD
    },
  });

  return transporter.sendMail({
    from: `"Multitenancy Demo" <multitenancy-demo@slashid.dev>`,
    to,
    subject,
    html,
  });
}