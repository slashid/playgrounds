import { redirect } from "@vercel/remix";
import { DETAILS_PATH } from "~/domain/paths";

export const config = { runtime: "edge" };

export async function loader() {
  return redirect(DETAILS_PATH);
}
