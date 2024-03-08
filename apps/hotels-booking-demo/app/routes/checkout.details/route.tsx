import { DetailsForm } from "./details-form";
import { redirect, type LoaderArgs, json } from "@vercel/remix";
import { HOME_PATH } from "~/domain/paths";
import { bucketCookie } from "~/domain/user/bucket";

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const bucket = await bucketCookie.parse(cookieHeader);
  if (!bucket?.currentBooking) {
    return redirect(HOME_PATH);
  }

  return json({});
}

export default function DetailsPage() {
  return <DetailsForm />;
}
