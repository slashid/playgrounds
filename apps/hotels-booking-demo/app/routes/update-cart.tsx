import type { ActionArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH } from "~/domain/paths";
import { updateCartItems } from "~/domain/user/user";
import { getToken, handleActionError } from "~/services/session.server";
import { getRedirectToFromForm, parse } from "~/utils/utils";

export const config = { runtime: "edge" };

// TODO: move this file to /api folder
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const cartItems = formData.get("cartItems");
  const actionLog = formData.get("actionLog");
  const redirectTo = getRedirectToFromForm(formData);
  const token = await getToken(request);

  if (!cartItems || !actionLog) {
    return handleActionError(
      request,
      new Error("Sorry, we couldn't add the item to the cart.")
    );
  }

  try {
    await updateCartItems(token, parse(cartItems), parse(actionLog));

    // this is needed to redirect back to the original route when submitting using useSubmit which causes a redirect within this route loader
    if (redirectTo) return redirect(redirectTo);

    // when submitting using useFetcher we don't need to handle the redirect since it doesn't cause a redirect within this route loader
    return json({});
  } catch (thrownResponse: unknown) {
    if (thrownResponse instanceof Error) {
      return handleActionError(request, thrownResponse, redirectTo);
    }
    return thrownResponse;
  }
}

export async function loader() {
  return redirect(HOME_PATH);
}
