import type { ActionArgs } from "@vercel/remix";
import { redirect } from "@vercel/remix";
import { HOME_PATH, isLogin } from "~/domain/paths";
import { clearUserInSentry } from "~/services/sentry";
import { logOutFromSession } from "~/services/session.server";
import { getRedirectToFromForm } from "~/utils/utils";

export const config = { runtime: "edge" };

// TODO: move this file to /api folder
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const redirectTo = getRedirectToFromForm(formData);
  const safeRedirectTo = isLogin(redirectTo) ? "" : redirectTo;

  clearUserInSentry();
  return logOutFromSession(request, safeRedirectTo);
}

export async function loader() {
  return redirect(HOME_PATH);
}
