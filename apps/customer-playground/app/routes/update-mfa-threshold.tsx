import type { ActionArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH } from "~/domain/paths";
import { updateMfaThreshold } from "~/domain/user/user";
import { getToken, handleActionError } from "~/services/session.server";
import { parse } from "~/utils/utils";

export const config = { runtime: "edge" };

// TODO: move this file to /api folder
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const mfaThreshold = formData.get("mfaThreshold");
  const actionLog = formData.get("actionLog");
  const token = await getToken(request);

  if (!mfaThreshold || !actionLog) {
    return handleActionError(
      request,
      new Error("Sorry, we couldn't update the MFA Threshold.")
    );
  }

  try {
    await updateMfaThreshold(token, parse(mfaThreshold), parse(actionLog));
    return json({});
  } catch (error: unknown) {
    return handleActionError(request, error);
  }
}

export async function loader() {
  return redirect(HOME_PATH);
}
