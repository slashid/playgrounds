import { Organization } from "@slashid/slashid";
import { sendMail } from "./send-mail";
import { inviteEmailBody } from "./templates/invite";
import { env } from "../env";

const { ORIGIN } = env()

export async function sendInviteEmail({ to, from, org, directId }: {
  to: string,
  from: string,
  org: Organization,
  directId: string
}) {
  console.info(`Sending invite email to ${to} from ${from} for ${org.org_name}`)
  const htmlWithLink = inviteEmailBody
    .replaceAll(
      "{{ root_url }}",
      `${ORIGIN}/${org.id}?challenges=${directId}`
    )
    .replaceAll(
      "{{ from }}",
      from
    )
    .replaceAll(
      "{{ org_name }}",
      org.org_name
    );

  return sendMail(to, `[SlashID Notes] ${from} has invited you to join the ${org.org_name} organization`, htmlWithLink);
}
