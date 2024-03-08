import { env } from "../env";
import { sendMail } from "./send-mail";
import { mobileFallbackDirectIdEmailBody } from "./templates/mobile-fallback";

const { ORIGIN } = env()

export async function sendMobileFallbackEmail({ to, directId, orgId }: {
  to: string,
  directId: string,
  orgId: string
}) {
  const htmlWithLink = mobileFallbackDirectIdEmailBody.replace(
    "{{ shopping_url }}",
    `${ORIGIN}/${orgId}?challenges=${directId}`
  );

  return sendMail(
    to,
    "Please view SlashID Notes on a bigger screen",
    htmlWithLink
  );
}