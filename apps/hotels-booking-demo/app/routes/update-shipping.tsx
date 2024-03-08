import type { ActionArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH } from "~/domain/paths";
import { updateShippingDetails } from "~/domain/user/user";
import {
  getToken,
  handleActionError,
  redirectWithToastMessage,
} from "~/services/session.server";
import { getRedirectToFromForm, parse } from "~/utils/utils";

export const config = { runtime: "edge" };

// TODO: move this file to /api folder
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const shippingDetails = formData.get("shippingDetails");
  const actionLog = formData.get("actionLog");
  const redirectTo = getRedirectToFromForm(formData);
  const token = await getToken(request);

  if (!shippingDetails || !actionLog) {
    return handleActionError(
      request,
      new Error("Sorry, we couldn't update the shipping details.")
    );
  }

  try {
    await updateShippingDetails(
      token,
      parse(shippingDetails),
      parse(actionLog)
    );

    // this is needed to redirect to the next checkout step after successfully submitting shipping details
    if (redirectTo) {
      return redirectWithToastMessage(
        request,
        redirectTo,
        "Shipping details saved!"
      );
    }
    return json({});
  } catch (error: unknown) {
    return handleActionError(request, error, redirectTo);
  }
}

export async function loader() {
  return redirect(HOME_PATH);
}
