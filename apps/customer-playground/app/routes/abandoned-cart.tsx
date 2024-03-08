import type { ActionArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { CART_PATH, DIRECT_ID_PATH, HOME_PATH } from "~/domain/paths";
import { getDirectId } from "~/domain/user/api";
import { getUser } from "~/domain/user/user";
import { sendAbandonedCartEmail } from "~/services/email/email.server";
import { handleActionError } from "~/services/session.server";

// TODO: move this file to /api folder
export async function action({ request }: ActionArgs) {
  const { origin } = new URL(request.url);
  const formData = await request.formData();
  const token = formData.get("token") as string;
  const to = formData.get("to") as string;

  if (!to || !token) {
    return handleActionError(
      request,
      new Error("Sorry, we couldn't send the email.")
    );
  }

  try {
    const user = getUser(token);
    const directID = await getDirectId(user.ID);
    const directIDLink = `${origin}${DIRECT_ID_PATH}?challenges=${directID}&redirectTo=${CART_PATH}`;

    await sendAbandonedCartEmail(to, directIDLink);

    return json({ emailIsSent: true });
  } catch (error: unknown) {
    return handleActionError(request, error);
  }
}

export async function loader() {
  return redirect(HOME_PATH);
}
