import type { ActionArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH } from "~/domain/paths";
import { bucketCookie } from "~/domain/user/bucket";
import { updateCartItems, updateCurrentBooking } from "~/domain/user/user";
import { getToken, handleActionError } from "~/services/session.server";
import { getRedirectToFromForm, parse } from "~/utils/utils";

export const config = { runtime: "edge" };

// TODO: move this file to /api folder
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const currentBooking = formData.get("currentBooking");
  const token = await getToken(request);

  if (!currentBooking) {
    return handleActionError(
      request,
      new Error("Sorry, we couldn't add the item to the cart.")
    );
  }

  try {
    // await updateCurrentBooking(token, parse(currentBooking));

    // when submitting using useFetcher we don't need to handle the redirect since it doesn't cause a redirect within this route loader
    return redirect("/checkout/details", {
      headers: {
        "Set-Cookie": await bucketCookie.serialize({
          currentBooking: parse(currentBooking),
        }),
      },
    });
  } catch (thrownResponse: unknown) {
    if (thrownResponse instanceof Error) {
      return handleActionError(request, thrownResponse);
    }
    return thrownResponse;
  }
}

export async function loader() {
  return redirect(HOME_PATH);
}
