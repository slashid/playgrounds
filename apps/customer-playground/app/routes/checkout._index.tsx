import { redirect } from "@vercel/remix";
import { SHIPPING_PATH } from "~/domain/paths";

export const config = { runtime: "edge" };

export async function loader() {
  return redirect(SHIPPING_PATH);
}
