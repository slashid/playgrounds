import type { ActionArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH } from "~/domain/paths";
import { updateOrders } from "~/domain/user/user";
import { getToken, handleActionError } from "~/services/session.server";
import { getRedirectToFromForm, parse } from "~/utils/utils";

export const config = { runtime: "edge" };

// TODO: move this file to /api folder
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const orders = formData.get("orders");
  const actionLog = formData.get("actionLog");
  const redirectTo = getRedirectToFromForm(formData);
  const token = await getToken(request);

  if (!orders || !actionLog) {
    return handleActionError(
      request,
      new Error("Sorry, we couldn't add the order.")
    );
  }

  try {
    await updateOrders(token, parse(orders), parse(actionLog));

    // this is needed to redirect to the next step after successfully submitting the new order
    if (redirectTo) return redirect(redirectTo);
    return json({});
  } catch (error: unknown) {
    return handleActionError(request, error, redirectTo);
  }
}

export async function loader() {
  return redirect(HOME_PATH);
}
