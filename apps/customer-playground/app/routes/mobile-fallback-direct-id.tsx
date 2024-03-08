import type { ActionArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { DIRECT_ID_PATH, HOME_PATH } from "~/domain/paths";
import {
  createPerson,
  findPersonByHandle,
  getDirectId,
} from "~/domain/user/api";
import { sendMobileFallbackDirectIdEmail } from "~/services/email/email.server";
import { handleActionError } from "~/services/session.server";

// TODO: move this file to /api folder
export async function action({ request }: ActionArgs) {
  const { origin } = new URL(request.url);
  const formData = await request.formData();
  const to = formData.get("to") as string;

  if (!to) {
    return handleActionError(
      request,
      new Error("Sorry, we couldn't send the email.")
    );
  }

  try {
    const person = (await findPersonByHandle(to)) || (await createPerson(to));
    const directID = await getDirectId(person.person_id);
    const directIDLink = `${origin}${DIRECT_ID_PATH}?challenges=${directID}&redirectTo=${HOME_PATH}`;

    await sendMobileFallbackDirectIdEmail(to, directIDLink);

    return json({ emailIsSent: true });
  } catch (error: unknown) {
    return handleActionError(request, error);
  }
}

export async function loader() {
  return redirect(HOME_PATH);
}
