import { BackButton } from "../checkout/nav-buttons";
import PaymentPanel from "./payment-panel";
import DetailsPanel from "./details-panel";
import { footer, summary } from "./style.css";
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

export default function SummaryPage() {
  return (
    <div className={summary}>
      <DetailsPanel />
      <PaymentPanel />

      <div className={footer}>
        <BackButton />
      </div>
    </div>
  );
}
