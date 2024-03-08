import type { ActionArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH } from "~/domain/paths";
import { bucketCookie } from "~/domain/user/bucket";
import {
  getUserAttributes,
  setUserAttributes,
  updateCartItems,
  updateCurrentBooking,
} from "~/domain/user/user";
import { getToken, handleActionError } from "~/services/session.server";
import { getRedirectToFromForm, parse } from "~/utils/utils";
import { flashToastMessage } from "~/services/session.server";

export const config = { runtime: "edge" };

// TODO: move this file to /api folder
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const createAccount = Boolean(formData.get("createAccount") === "true");
  const email = formData.get("email");
  const token = await getToken(request);

  try {
    if (token) {
      let attributes = await getUserAttributes(token, request);
      const pastBookings = attributes?.pastBookings ?? 0;

      await setUserAttributes(token, { pastBookings: pastBookings + 1 });
    }
    // await updateCurrentBooking(token, parse(currentBooking));

    let redirectUrl = "/";

    if (!token && email && createAccount) {
      redirectUrl = `/create-account/?email=${encodeURIComponent(
        email as string
      )}`;
    }

    const headers = [["Set-Cookie", await bucketCookie.serialize({})]];

    if (!createAccount) {
      const toast = await flashToastMessage(
        request,
        "Booking created successfully",
        "success"
      );

      headers.push(Object.entries(toast)[0]);
    }

    // when submitting using useFetcher we don't need to handle the redirect since it doesn't cause a redirect within this route loader
    return redirect(redirectUrl, {
      // @ts-ignore
      headers,
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
