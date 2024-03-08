import nodemailer from "nodemailer";
import { abandonedCartEmailBody } from "./templates/abandoned-cart-email-body.server";
import { mobileFallbackDirectIdEmailBody } from "./templates/mobile-fallback-directid-email-body.server";

export async function sendMail(to: string, subject: string, html: string) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  return transporter.sendMail({
    from: `"ecommerce demo" <${user}>`,
    to,
    subject,
    html,
  });
}

export async function sendAbandonedCartEmail(to: string, directIDLink: string) {
  const htmlWithLink = abandonedCartEmailBody.replace(
    "{{ shopping_url }}",
    directIDLink
  );

  return sendMail(to, "Your SlashID order is waiting!", htmlWithLink);
}

export async function sendMobileFallbackDirectIdEmail(
  to: string,
  directIDLink: string
) {
  const htmlWithLink = mobileFallbackDirectIdEmailBody.replace(
    "{{ shopping_url }}",
    directIDLink
  );

  return sendMail(
    to,
    "Please view the SlashID playground on a bigger screen",
    htmlWithLink
  );
}
